#!/bin/sh

echo "🚀 Installing dependencies"
npm install
echo "🚀 Generating the build"
npm run build
echo "🚀 starting the application"
npm run start:dev
