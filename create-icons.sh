#!/bin/bash

# Script to create all necessary icons for the macOS application
# This script requires macOS and the following tools:
# - iconutil (macOS built-in)
# - sips (macOS built-in) 

# Check if we're on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
  echo "This script must be run on macOS"
  exit 1
fi

# Create directories if they don't exist
mkdir -p build/icons
mkdir -p build/icons.iconset

# Base image (should be at least 1024x1024)
# Using the baobab image as our app icon
SOURCE_IMAGE="public/images/baobab.png"

# Check if source image exists
if [ ! -f "$SOURCE_IMAGE" ]; then
  echo "Source image not found: $SOURCE_IMAGE"
  echo "Please create a high resolution app icon first"
  exit 1
fi

# Generate different icon sizes for iconset
echo "Generating iconset..."

# Icon sizes needed for macOS
ICON_SIZES=("16" "32" "64" "128" "256" "512" "1024")

for size in "${ICON_SIZES[@]}"; do
  # Standard resolution
  sips -z $size $size "$SOURCE_IMAGE" --out "build/icons.iconset/icon_${size}x${size}.png"
  
  # High resolution (@2x)
  if [ "$size" != "1024" ]; then
    double_size=$((size * 2))
    sips -z $double_size $double_size "$SOURCE_IMAGE" --out "build/icons.iconset/icon_${size}x${size}@2x.png"
  fi
done

# Convert iconset to icns
echo "Converting iconset to icns format..."
iconutil -c icns "build/icons.iconset" -o "build/icons/icon.icns"

# Clean up
echo "Cleaning up temporary files..."
rm -rf "build/icons.iconset"

echo "Icon generation complete. ICNS file created at: build/icons/icon.icns"
