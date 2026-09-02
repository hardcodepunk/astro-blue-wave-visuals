#!/usr/bin/env bash
#
# Restores web/public/media from the original site.
#
# The video files are ~400MB and two of them are over GitHub's 100MB per-file
# limit, so they are gitignored rather than committed. Run this after a fresh
# clone to pull them back down. Images are in the repo already; this script
# re-fetches them too and is safe to re-run — existing files are skipped.
#
#   ./scripts/fetch-media.sh
#
set -euo pipefail

ORIGIN="https://bluewavevisuals.com"
DEST="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/web/public/media"

mkdir -p "$DEST"

ASSETS=(
  "/__l5e/assets-v1/048817ff-4742-4fed-b821-a7a95fcffc93/analog-upload-4.jpg"
  "/__l5e/assets-v1/0cf16390-2fb7-463a-9524-f3dffa90f897/surfsafari-sunset.jpg"
  "/__l5e/assets-v1/0d2a774b-2a0c-4c6b-8dc4-1b4bb6f16f97/transfo.mp4"
  "/__l5e/assets-v1/18e5a6d6-ded7-4ea4-8331-bb5bbdfe095c/food5.jpg"
  "/__l5e/assets-v1/194c56c1-f292-432d-b9ad-d6e50e40e711/000096960026.jpg"
  "/__l5e/assets-v1/1982d501-3a97-4b7e-9bda-f9ac819321ca/le-pin-sec-support.mp4"
  "/__l5e/assets-v1/211974bc-a46b-4b3b-9aff-38816035d6d0/thumbnail-surfers-hell.jpg"
  "/__l5e/assets-v1/48e8a75a-e2c2-4f23-b5f1-e95ae7dd4c68/000096960013.jpg"
  "/__l5e/assets-v1/4a03dc51-682d-4118-8ee8-e1e8ba204bdc/analogue-2.jpg"
  "/__l5e/assets-v1/4c6368c7-4283-4cc7-9983-ef5d837a2cda/ewoud-camera.jpg"
  "/__l5e/assets-v1/4cfb2181-0950-47aa-af9f-d37839485b52/surftrips-hero.jpg"
  "/__l5e/assets-v1/4dc40ea8-735d-41df-906d-567e108d5dab/winter-2.jpg"
  "/__l5e/assets-v1/500455f7-b78a-472b-87c0-fb6bc17589fa/photographer-ocean.jpeg"
  "/__l5e/assets-v1/5060a760-b5c5-4551-a73e-daecbe11af8b/safari-roadtrip.jpeg"
  "/__l5e/assets-v1/5f240324-012d-493b-8d77-2f5532362d38/surfer-barrel.jpeg"
  "/__l5e/assets-v1/63163bea-5990-4d37-8c6c-fc32c0df6e60/portraits-1.jpg"
  "/__l5e/assets-v1/633592f6-27ec-47f5-b560-84f2c4e15475/analog-upload-3.jpg"
  "/__l5e/assets-v1/67c5a184-4077-4c3a-b600-4fe6fd71b542/winter-1.jpg"
  "/__l5e/assets-v1/73705baf-8625-45f6-90a8-1c5af7f5c27e/breathwork-training.jpeg"
  "/__l5e/assets-v1/7761ca27-3dff-48ae-a9de-5886bb168140/thumbnail-nausicaa.jpg"
  "/__l5e/assets-v1/7b45f345-a814-467d-ab33-5395b0533ca4/surfretreat-explain.mov"
  "/__l5e/assets-v1/865e5664-90b8-46b0-baba-ffe7b4b0a2f9/analog-upload-6.jpg"
  "/__l5e/assets-v1/8d11aee4-35e2-4dcb-a23a-cf932d4d7064/nausicaa.mov"
  "/__l5e/assets-v1/9071a6d0-4a30-481a-bd0a-f854cae034e3/portraits-2.jpg"
  "/__l5e/assets-v1/96d3aa87-f114-4b2a-8f2e-7255b8e45331/safari.mp4"
  "/__l5e/assets-v1/a09ad0cf-4862-43c1-9292-9c66aec587bb/surfers-hell.mov"
  "/__l5e/assets-v1/ad3457fa-dc8c-47b9-81fa-b9dd65430783/winter-3.jpg"
  "/__l5e/assets-v1/ad6e8d1d-7bc8-421a-b9c2-87418e87f855/analog-upload-1.jpg"
  "/__l5e/assets-v1/b119ce03-ca61-44ef-8939-0d3132e30eae/room-example.jpeg"
  "/__l5e/assets-v1/b3e1d5c8-9f1e-4241-8fa7-bbca1e2622e6/000096960007.jpg"
  "/__l5e/assets-v1/b831cdf0-65c5-4631-916e-1d128a3f312f/food3.jpg"
  "/__l5e/assets-v1/b9428668-603f-4e71-9c60-df007adaae73/000096960006.jpg"
  "/__l5e/assets-v1/bd297f84-6871-4ae2-8fc5-97ce47949ea4/analog-upload-8.jpg"
  "/__l5e/assets-v1/c255c6ea-34fa-427b-9456-7d1736399047/analog-upload-5.jpg"
  "/__l5e/assets-v1/c329ee46-3a83-417e-a2bb-25debf0e99b8/food-beverage-replacement.mp4"
  "/__l5e/assets-v1/c3d8124d-7633-42c1-8da8-76cb7f4c4039/portraits-3.jpg"
  "/__l5e/assets-v1/d646ad59-98ac-4632-b119-820941901122/analog-upload-2.jpg"
  "/__l5e/assets-v1/defa7c0a-148d-4ca9-88b1-4667399f0544/000096960016.jpg"
  "/__l5e/assets-v1/e12b4630-4709-4990-babe-426b532d158c/analogue-1.jpg"
  "/__l5e/assets-v1/e4c36abb-4e9f-4e0b-bf81-8c7fd033d05d/food2.jpg"
  "/__l5e/assets-v1/e5428b18-6cd8-4899-ad59-0a7044eee6e3/000096960030.jpg"
  "/__l5e/assets-v1/edbaec94-238f-47a5-bb55-6d10711755cf/food4.jpg"
  "/__l5e/assets-v1/efc2442f-865f-4632-95dd-e2e28098d66e/food1.jpg"
  "/__l5e/assets-v1/f37a8570-5c38-4cb6-af9a-f97671af2ee4/analog-upload-7.jpg"
  "/__l5e/assets-v1/f88d0944-54d1-413f-9af2-bb3e8a9ffa65/villa-house.jpeg"
  "/__l5e/assets-v1/fdd91445-8c19-4099-8170-070dad46de46/banner-video-h264.mp4"
  "/assets/surfretreat-card-new-aQr_VhD7.jpg"
)

for path in "${ASSETS[@]}"; do
  name="$(basename "$path")"
  # The one bundled asset carries a build hash in its filename.
  case "$name" in
    surfretreat-card-new-*.jpg) name="surfretreat-card-new.jpg" ;;
  esac

  if [ -s "$DEST/$name" ]; then
    echo "  skip  $name"
    continue
  fi

  echo "  get   $name"
  curl -fsSL --retry 3 --max-time 600 "$ORIGIN$path" -o "$DEST/$name"
done

echo
echo "Done — $(ls -1 "$DEST" | wc -l | tr -d ' ') files in web/public/media"
