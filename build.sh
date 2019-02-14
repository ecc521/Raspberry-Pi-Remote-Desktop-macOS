#!/usr/bin/env bash

echo "Make sure you call this from the source directory"


BUILD_DIR="release-builds"

electron-packager . --overwrite --platform=darwin --arch=x64  --prune=true --out=$BUILD_DIR


#cd into the build directory, otherwise tar will misbehave
cd $BUILD_DIR
cd "Raspberry Pi Remote Desktop-darwin-x64"

tar cvf - "Raspberry Pi Remote Desktop.app" | xz -zkvv9c > "Raspberry Pi Remote Desktop.app.tar.xz"
