#!/bin/bash

# Revert all brand colors back to teal colors
FILES=$(find /Users/marquese/elira-landing -type f \( -name "*.tsx" -o -name "*.ts" \) ! -path "*/node_modules/*" ! -path "*/.next/*" ! -path "*/docs/*")

for file in $FILES; do
    # Revert brand colors to teal colors - use teal-700 as main color (close to #0F766E)
    sed -i '' 's/brand-50/teal-50/g' "$file"
    sed -i '' 's/brand-100/teal-100/g' "$file"
    sed -i '' 's/brand-200/teal-200/g' "$file"
    sed -i '' 's/brand-300/teal-300/g' "$file"
    sed -i '' 's/brand-400/teal-400/g' "$file"
    sed -i '' 's/brand-500/teal-500/g' "$file"
    sed -i '' 's/brand-600/teal-700/g' "$file"  # Use teal-700 instead of teal-600 for darker shade
    sed -i '' 's/brand-700/teal-800/g' "$file"
    sed -i '' 's/brand-800/teal-900/g' "$file"
    sed -i '' 's/brand-900/teal-950/g' "$file"
done

echo "✅ Reverted to standard Tailwind teal colors"