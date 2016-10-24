#!/bin/sh

echo "\n$(tput setaf 2) Prepare production folder"
mkdir production

echo "\n$(tput setaf 2) Move Cordova's files to production dir"
mv config.xml hooks platforms plugins www production

echo "\n$(tput setaf 2) Remove js/ css/ and img/ folders created by cordova"
rm -rf production/platforms/ios/www/css
rm -rf production/platforms/ios/www/js
rm -rf production/platforms/ios/www/img
rm -rf production/www

echo "\n$(tput setaf 2) Replace cordova's index.html file"
cp development/static/index.html production/platforms/ios/www 

echo "\n$(tput setaf 2) Install node modules"
npm install
