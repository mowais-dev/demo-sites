#!/usr/bin/env python3
"""
BG Remover Script - Video White/Red Background to Transparent WebM
Converts MP4/MOV videos with solid Red or White background into transparent WebM videos (VP8 with alpha channel yuva420p).
"""

import os
import sys
import subprocess
import cv2
import numpy as np

def convert_video_to_transparent_webm(input_path, output_path):
    """
    Converts video (with red or white background) to a pristine transparent WebM video.
    Features:
    - Automatic Red & White background chroma detection
    - Contour silhouette hole-filling to preserve 100% of 3D glass tooth details & reflections
    - Border erosion & chroma despill to eliminate background color halos
    - Encodes to VP8 WebM with yuva420p alpha channel
    """
    if not os.path.exists(input_path):
        print(f"Error: Input file '{input_path}' does not exist.")
        sys.exit(1)

    print(f"Opening input video: {input_path}")
    cap = cv2.VideoCapture(input_path)
    if not cap.isOpened():
        print(f"Error: Cannot open video file {input_path}")
        sys.exit(1)

    width  = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps    = cap.get(cv2.CAP_PROP_FPS)
    if fps <= 0:
        fps = 30.0

    print(f"Video specs: {width}x{height} @ {fps} FPS")

    # Start ffmpeg process for WebM with VP8 + yuva420p alpha channel
    ffmpeg_cmd = [
        "ffmpeg",
        "-y",
        "-f", "rawvideo",
        "-vcodec", "rawvideo",
        "-s", f"{width}x{height}",
        "-pix_fmt", "rgba",
        "-r", str(fps),
        "-i", "-", # stdin pipe
        "-c:v", "libvpx",
        "-pix_fmt", "yuva420p",
        "-auto-alt-ref", "0",
        "-b:v", "6M",
        output_path
    ]

    proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE)

    close_kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (15, 15))
    erode_kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    frame_count = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        b, g, r = cv2.split(frame)
        
        # Detect background color: check if red or white background
        is_red = (r > 130) & (g < 110) & (b < 110)
        is_white = (r > 245) & (g > 245) & (b > 245)
        
        is_bg = is_red | is_white
        non_bg = (~is_bg).astype(np.uint8) * 255

        # Morphological closing to seal boundary
        closed = cv2.morphologyEx(non_bg, cv2.MORPH_CLOSE, close_kernel)

        # Contour detection to extract 3D tooth silhouette
        contours, _ = cv2.findContours(closed, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        alpha_mask = np.zeros((height, width), dtype=np.uint8)
        if contours:
            largest_contour = max(contours, key=cv2.contourArea)
            # Fill silhouette solid
            cv2.drawContours(alpha_mask, [largest_contour], -1, 255, thickness=cv2.FILLED)

        # Erode border slightly to cut away outer color fringe
        alpha_eroded = cv2.erode(alpha_mask, erode_kernel, iterations=1)

        # Despill background color halo along edges
        r_clean = r.copy()
        spill_mask = (alpha_eroded > 0) & (r > g) & (r > b)
        r_clean[spill_mask] = np.maximum(g[spill_mask], b[spill_mask])

        # Anti-alias alpha channel
        alpha_smooth = cv2.GaussianBlur(alpha_eroded, (3, 3), 0)

        # Merge C-contiguous RGBA frame
        rgba = np.dstack([r_clean, g, b, alpha_smooth])
        rgba_bytes = np.ascontiguousarray(rgba, dtype=np.uint8).tobytes()

        # Write frame to FFmpeg pipe
        proc.stdin.write(rgba_bytes)
        frame_count += 1
        if frame_count % 30 == 0:
            print(f"Processed {frame_count} frames...")

    cap.release()
    proc.stdin.close()
    proc.wait()
    print(f"Successfully converted {frame_count} frames! Output saved to {output_path}")

if __name__ == "__main__":
    inp = "../video.mp4"
    out = "../hero.webm"
    if len(sys.argv) > 1:
        inp = sys.argv[1]
    if len(sys.argv) > 2:
        out = sys.argv[2]
    convert_video_to_transparent_webm(inp, out)
