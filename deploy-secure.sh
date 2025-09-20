#!/bin/bash

# Secure Deployment Script for Firebase
# This script ensures environment variables are properly set before deployment

echo "🚀 Starting secure deployment to Firebase..."

# Check if .env.production exists
if [ ! -f ".env.production" ]; then
    echo "❌ Error: .env.production file not found!"
    echo "Please create .env.production with your production API credentials:"
    echo "cp .env.production.example .env.production"
    echo "Then edit .env.production with your actual credentials"
    exit 1
fi

# Check if required environment variables are set
if ! grep -q "VITE_TMDB_API_KEY=" .env.production || ! grep -q "VITE_TMDB_ACCESS_TOKEN=" .env.production; then
    echo "❌ Error: Missing required environment variables in .env.production"
    echo "Please ensure VITE_TMDB_API_KEY and VITE_TMDB_ACCESS_TOKEN are set"
    exit 1
fi

echo "✅ Environment variables found"

# Build the project
echo "🔨 Building project for production..."
npm run build:firebase

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build completed successfully"

# Deploy to Firebase
echo "🚀 Deploying to Firebase..."
firebase deploy

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🌐 Your app is now live on Firebase Hosting"
else
    echo "❌ Deployment failed!"
    exit 1
fi
