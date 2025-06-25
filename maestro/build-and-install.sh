#!/bin/bash
set -e

# # Navigate to the project root (adjust if needed)
# cd "$(dirname "$0")/.."

# # Load .env file from project root
# set -o allexport
# source ".env"
# set +o allexport


# Build the app (adjust the command for your build system)
echo "Building the app..."
cd android && ./gradlew clean && ./gradlew assembleRelease && cd ..

# Install the app (adjust for your platform and app type)
# Example for Android with React Native:
APK_PATH="android/app/build/outputs/apk/release/app-release.apk"
if [ -f "$APK_PATH" ]; then
  echo "Installing APK: $APK_PATH"
  adb install -r "$APK_PATH"
else
  echo "APK not found. Please check the build output."
  exit 1
fi

echo "Build and installation complete."