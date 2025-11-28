#!/bin/bash

# Random Tweet - Installation & Setup Script
# This script installs dependencies, sets up environment, and launches the app

set -e

echo "🐦 Random Tweet - Setup Script"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Check Node.js version (requires >= 18)
NODE_VERSION=$(node -v | sed 's/v//' | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required."
    echo "   Current version: $(node -v)"
    echo "   Please upgrade Node.js: https://nodejs.org/"
    echo ""
    echo "   If using nvm, run: nvm install 18 && nvm use 18"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo "✅ npm $(npm -v) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo ""

# Setup .env file
if [ ! -f .env ]; then
    echo "🔧 Setting up environment configuration..."
    cp .env.example .env
    
    echo ""
    echo "Would you like to configure Twitter API credentials now? (y/n)"
    read -r configure_api
    
    if [ "$configure_api" = "y" ] || [ "$configure_api" = "Y" ]; then
        echo ""
        echo "Enter your Twitter API Key (or press Enter to skip):"
        read -s -r api_key
        echo ""
        if [ -n "$api_key" ]; then
            # Use awk for safe substitution (handles special chars)
            awk -v key="$api_key" '{gsub(/TWITTER_API_KEY=your_api_key_here/, "TWITTER_API_KEY=" key)}1' .env > .env.tmp && mv .env.tmp .env
            echo "✅ API Key configured"
        fi
        
        echo "Enter your Twitter API Secret (or press Enter to skip):"
        read -s -r api_secret
        echo ""
        if [ -n "$api_secret" ]; then
            # Use awk for safe substitution (handles special chars)
            awk -v secret="$api_secret" '{gsub(/TWITTER_API_SECRET=your_api_secret_here/, "TWITTER_API_SECRET=" secret)}1' .env > .env.tmp && mv .env.tmp .env
            echo "✅ API Secret configured"
        fi
        
        echo ""
        echo "✅ API credentials configured!"
    else
        echo "⚠️  Skipping API configuration. App will run in Demo Mode."
        echo "   You can edit .env later to add your Twitter API credentials."
    fi
else
    echo "✅ .env file already exists"
fi

echo ""
echo "🚀 Starting the application..."
echo ""
echo "   Backend server: http://localhost:3001"
echo "   Frontend:       http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start both servers
npm run dev:all
