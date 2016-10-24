#!/bin/sh

echo "Prepare production folder"
mkdir production

echo "Move Cordova's files to production dir"
mv config.xml hooks platforms plugins www production

echo "Remove js/ css/ and img/ folders created by cordova"
rm -rf production/platforms/ios/www/css
rm -rf production/platforms/ios/www/js
rm -rf production/platforms/ios/www/img

echo "Replace cordova's index.html file"
mv development/static/index.html production/platforms/ios/www 

echo "Install node modules"
npm install
