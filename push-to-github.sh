#!/bin/bash

echo "GitHub Push Helper"
echo "=================="
echo ""
echo "You have two options to push to GitHub:"
echo ""
echo "Option 1: Personal Access Token (Recommended)"
echo "---------------------------------------------"
echo "1. Go to https://github.com/settings/tokens"
echo "2. Generate a new token with 'repo' scope"
echo "3. Run: git push https://YOUR_USERNAME:YOUR_TOKEN@github.com/markelira/elira-landing.git main"
echo ""
echo "Option 2: GitHub CLI"
echo "--------------------"
echo "1. Install GitHub CLI: brew install gh"
echo "2. Authenticate: gh auth login"
echo "3. Run: git push origin main"
echo ""
echo "Current repository status:"
git status --short
echo ""
echo "Ready to push these commits:"
git log --oneline -n 5