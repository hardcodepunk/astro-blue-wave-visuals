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

# Tiles in the work grid play a preview on hover. Serving them the full file
# means a pointer drifting across the grid opens multi-megabyte streams, so
# each one also gets a short, small, silent loop.
PREVIEW_SECONDS=3

# name|source|poster timestamp|strip audio|needs hover preview
# The hero loops muted and never exposes controls, so its audio track is dead weight.
JOBS=(
  "banner-video-h264|banner-video-h264.mp4|00:00:04|yes|no"
  "transfo|transfo.mp4|00:00:06|no|yes"
  "food-beverage-replacement|food-beverage-replacement.mp4|00:00:03|no|yes"
  "le-pin-sec-support|le-pin-sec-support.mp4|00:00:12|no|yes"
  "safari|safari.mp4|00:00:05|no|no"
  "nausicaa|nausicaa.mov|00:00:08|no|yes"
  "surfers-hell|surfers-hell.mov|00:00:03|no|yes"
  "surfretreat-explain|surfretreat-explain.mov|00:00:06|no|no"
)

# Duration in whole seconds, or empty if the file is unreadable.
duration() {
  ffprobe -v error -show_entries format=duration -of csv=p=0 "$1" 2>/dev/null | cut -d. -f1
}

# An output counts as done only if it decodes and matches the source length —
# a half-written file from an interrupted run must not be mistaken for a good
# one just because it exists.
is_complete() {
  local out=$1 want=$2 got
  got=$(duration "$out") || return 1
  [ -n "$got" ] || return 1
  [ $(( want > got ? want - got : got - want )) -le 2 ]
}

for job in "${JOBS[@]}"; do
  IFS='|' read -r name src ts mute wants_preview <<<"$job"
  [ -f "$MEDIA/$src" ] || { echo "  skip $src (missing)"; continue; }

  src_len=$(duration "$MEDIA/$src")

  audio=(-c:a aac -b:a 96k -ac 2)
  [ "$mute" = "yes" ] && audio=(-an)

  if is_complete "$OUT/$name.mp4" "$src_len"; then
    echo "  have   $name"
  else
    echo "  encode $name"
    # Write to a temp name and move into place, so an interrupted run leaves
    # no partial file behind for the next run to trust.
    ffmpeg -nostdin -v error -y -i "$MEDIA/$src" \
    -c:v libx264 -profile:v high -pix_fmt yuv420p \
    -crf 24 -preset medium -maxrate 3M -bufsize 6M \
    -vf "scale='min(1920,iw)':-2" \
    "${audio[@]}" \
      -movflags +faststart \
      "$OUT/$name.tmp.mp4" && mv "$OUT/$name.tmp.mp4" "$OUT/$name.mp4"
  fi

  if [ ! -s "$OUT/$name-poster.jpg" ]; then
  echo "  poster $name"
  ffmpeg -nostdin -v error -y -ss "$ts" -i "$MEDIA/$src" \
    -frames:v 1 -vf "scale='min(1600,iw)':-2" -q:v 4 \
    "$OUT/$name-poster.jpg"
  fi

  # Only the work-grid tiles preview on hover; the hero and the surftrips
  # players are never hovered, so they need no clip.
  if [ "$wants_preview" = "yes" ] && [ ! -s "$OUT/$name-preview.mp4" ]; then
  echo "  preview $name"
  ffmpeg -nostdin -v error -y -ss "$ts" -t "$PREVIEW_SECONDS" -i "$MEDIA/$src" \
    -c:v libx264 -profile:v main -pix_fmt yuv420p \
    -crf 30 -preset medium -vf "scale='min(640,iw)':-2" \
    -an -movflags +faststart \
    "$OUT/$name-preview.tmp.mp4" && mv "$OUT/$name-preview.tmp.mp4" "$OUT/$name-preview.mp4"
  fi
done

echo
echo "originals: $(du -ch "$MEDIA"/*.mp4 "$MEDIA"/*.mov 2>/dev/null | tail -1 | cut -f1)"
echo "encoded: $(du -ch "$OUT"/*.mp4 2>/dev/null | tail -1 | cut -f1)"
echo "posters: $(du -ch "$OUT"/*-poster.jpg 2>/dev/null | tail -1 | cut -f1)"
echo "previews: $(du -ch "$OUT"/*-preview.mp4 2>/dev/null | tail -1 | cut -f1)"
