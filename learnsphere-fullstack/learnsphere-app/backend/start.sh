#!/bin/bash
cd "$(dirname "$0")"
echo "Starting LearnSphere..."
echo ""
echo "Once you see \"LearnSphere server running\", open this in your browser:"
echo "  http://localhost:3000"
echo ""
echo "Keep this window open while you use the site."
echo "Press Ctrl+C to stop the server."
echo ""
node server.js
