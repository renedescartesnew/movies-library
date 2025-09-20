#!/bin/bash

# CineVault Firebase Deployment Script
echo "🎬 CineVault Firebase Deployment Script"
echo "========================================"

# Check if Node.js version is sufficient
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Error: Node.js version 16+ required. Current version: $(node -v)"
    echo "Please upgrade Node.js first:"
    echo "  nvm install 18 && nvm use 18"
    echo "  or download from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "📦 Installing Firebase CLI..."
    npm install -g firebase-tools
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install Firebase CLI"
        exit 1
    fi
fi

echo "✅ Firebase CLI version: $(firebase --version)"

# Check if user is logged in
if ! firebase projects:list &> /dev/null; then
    echo "🔐 Please login to Firebase..."
    firebase login
    if [ $? -ne 0 ]; then
        echo "❌ Firebase login failed"
        exit 1
    fi
fi

echo "✅ Firebase authentication successful"

# Install dependencies
echo "📦 Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Build the application
echo "🔨 Building application..."
npm run build:firebase
if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed successfully"

# Deploy to Firebase
echo "🚀 Deploying to Firebase..."
firebase deploy
if [ $? -ne 0 ]; then
    echo "❌ Deployment failed"
    exit 1
fi

echo "🎉 Deployment completed successfully!"
echo "🌐 Your app is now live on Firebase Hosting!"
echo "📱 Check the Firebase Console for your hosting URL"
