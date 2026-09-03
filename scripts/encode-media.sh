#!/usr/bin/env bash
#
# Re-encodes the source video for the web and extracts a poster frame for each.
#
# Originals arrive straight from the camera/edit: 4-23Mbps, one of them HEVC in
# a QuickTime container that Firefox will not play. This normalises everything
# to faststart H.264 in MP4 at a sane bitrate, which is what the site ships.
#
#   ./scripts/encode-media.sh
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# Camera originals are build inputs and live outside public/ — anything under
# public/ is copied verbatim into dist, and shipping 400MB of source footage
# alongside the encoded derivatives is exactly the bug this avoids.
MEDIA="$ROOT/media-src"
OUT="$ROOT/web/public/media/video"
mkdir -p "$OUT"

# name|source|poster timestamp|strip audio
# The hero loops muted and never exposes controls, so its audio track is dead weight.
JOBS=(
  "banner-video-h264|banner-video-h264.mp4|00:00:04|yes"
  "transfo|transfo.mp4|00:00:06|no"
  "food-beverage-replacement|food-beverage-replacement.mp4|00:00:03|no"
  "le-pin-sec-support|le-pin-sec-support.mp4|00:00:12|no"
  "safari|safari.mp4|00:00:05|no"
  "nausicaa|nausicaa.mov|00:00:08|no"
  "surfers-hell|surfers-hell.mov|00:00:03|no"
  "surfretreat-explain|surfretreat-explain.mov|00:00:06|no"
)

for job in "${JOBS[@]}"; do
  IFS='|' read -r name src ts mute <<<"$job"
  [ -f "$MEDIA/$src" ] || { echo "  skip $src (missing)"; continue; }

  audio=(-c:a aac -b:a 96k -ac 2)
  [ "$mute" = "yes" ] && audio=(-an)

  echo "  encode $name"
  ffmpeg -nostdin -v error -y -i "$MEDIA/$src" \
    -c:v libx264 -profile:v high -pix_fmt yuv420p \
    -crf 24 -preset medium -maxrate 3M -bufsize 6M \
    -vf "scale='min(1920,iw)':-2" \
    "${audio[@]}" \
    -movflags +faststart \
    "$OUT/$name.mp4"

  echo "  poster $name"
  ffmpeg -nostdin -v error -y -ss "$ts" -i "$MEDIA/$src" \
    -frames:v 1 -vf "scale='min(1600,iw)':-2" -q:v 4 \
    "$OUT/$name-poster.jpg"
done

echo
echo "originals: $(du -ch "$MEDIA"/*.mp4 "$MEDIA"/*.mov 2>/dev/null | tail -1 | cut -f1)"
echo "encoded: $(du -ch "$OUT"/*.mp4 2>/dev/null | tail -1 | cut -f1)"
echo "posters: $(du -ch "$OUT"/*-poster.jpg 2>/dev/null | tail -1 | cut -f1)"
