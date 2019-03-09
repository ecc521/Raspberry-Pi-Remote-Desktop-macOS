#!/usr/bin/env bash

echo "Make sure you call this from the source directory"


BUILD_DIR="release-builds"

electron-packager . --overwrite --platform=darwin --arch=x64  --prune=true --out=$BUILD_DIR --icon=icons.icns


#cd into the build directory, otherwise tar will misbehave
cd $BUILD_DIR
cd "Raspberry Pi Remote Desktop-darwin-x64"


#This shouldn't be run automatically. People may simply want to download the source code and build the app themselves
#Therefore, we should ask before creating the .xz file 


read -n 1 -p "Should compressed archives (zip, tar.xz) be created? (y/n): " BUILD_ARCHIVE


if [ "$BUILD_ARCHIVE" == "y" ]
then
#-y is so symbolic links are not followed (they cause a gigantic application and zip file)
zip -r -9 -y "Raspberry Pi Remote Desktop.app.zip" "Raspberry Pi Remote Desktop.app" &
tar c "Raspberry Pi Remote Desktop.app" | xz -zkvv9c > "Raspberry Pi Remote Desktop.app.tar.xz"
fi

