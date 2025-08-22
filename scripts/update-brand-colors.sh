#!/bin/bash

# Update all teal color references to brand colors
# teal-400 -> brand-400
# teal-500 -> brand-500  
# teal-600 -> brand-600 (main brand color #0F766E)
# teal-700 -> brand-700
# teal-800 -> brand-800
# teal-900 -> brand-900

# Also update cyan references to lighter brand shades for consistency

FILES=$(find /Users/marquese/elira-landing -type f \( -name "*.tsx" -o -name "*.ts" \) ! -path "*/node_modules/*" ! -path "*/.next/*" ! -path "*/docs/*")

for file in $FILES; do
    # Update teal colors to brand colors
    sed -i '' 's/teal-50/brand-50/g' "$file"
    sed -i '' 's/teal-100/brand-100/g' "$file"
    sed -i '' 's/teal-200/brand-200/g' "$file"
    sed -i '' 's/teal-300/brand-300/g' "$file"
    sed -i '' 's/teal-400/brand-400/g' "$file"
    sed -i '' 's/teal-500/brand-500/g' "$file"
    sed -i '' 's/teal-600/brand-600/g' "$file"
    sed -i '' 's/teal-700/brand-700/g' "$file"
    sed -i '' 's/teal-800/brand-800/g' "$file"
    sed -i '' 's/teal-900/brand-900/g' "$file"
    
    # Update from-teal and to-teal for gradients
    sed -i '' 's/from-teal-50/from-brand-50/g' "$file"
    sed -i '' 's/from-teal-100/from-brand-100/g' "$file"
    sed -i '' 's/from-teal-400/from-brand-400/g' "$file"
    sed -i '' 's/from-teal-500/from-brand-500/g' "$file"
    sed -i '' 's/from-teal-600/from-brand-600/g' "$file"
    sed -i '' 's/from-teal-700/from-brand-700/g' "$file"
    
    sed -i '' 's/to-teal-50/to-brand-50/g' "$file"
    sed -i '' 's/to-teal-100/to-brand-100/g' "$file"
    sed -i '' 's/to-teal-400/to-brand-400/g' "$file"
    sed -i '' 's/to-teal-500/to-brand-500/g' "$file"
    sed -i '' 's/to-teal-600/to-brand-600/g' "$file"
    sed -i '' 's/to-teal-700/to-brand-700/g' "$file"
    
    # Update hover states
    sed -i '' 's/hover:text-teal-400/hover:text-brand-400/g' "$file"
    sed -i '' 's/hover:text-teal-500/hover:text-brand-500/g' "$file"
    sed -i '' 's/hover:text-teal-600/hover:text-brand-600/g' "$file"
    sed -i '' 's/hover:text-teal-700/hover:text-brand-700/g' "$file"
    sed -i '' 's/hover:bg-teal-50/hover:bg-brand-50/g' "$file"
    sed -i '' 's/hover:bg-teal-100/hover:bg-brand-100/g' "$file"
    sed -i '' 's/hover:bg-teal-500/hover:bg-brand-500/g' "$file"
    sed -i '' 's/hover:bg-teal-600/hover:bg-brand-600/g' "$file"
    sed -i '' 's/hover:bg-teal-700/hover:bg-brand-700/g' "$file"
    sed -i '' 's/hover:from-teal-600/hover:from-brand-600/g' "$file"
    sed -i '' 's/hover:from-teal-700/hover:from-brand-700/g' "$file"
    sed -i '' 's/hover:to-teal-700/hover:to-brand-700/g' "$file"
    sed -i '' 's/hover:to-teal-800/hover:to-brand-800/g' "$file"
    
    # Update text colors
    sed -i '' 's/text-teal-50/text-brand-50/g' "$file"
    sed -i '' 's/text-teal-100/text-brand-100/g' "$file"
    sed -i '' 's/text-teal-400/text-brand-400/g' "$file"
    sed -i '' 's/text-teal-500/text-brand-500/g' "$file"
    sed -i '' 's/text-teal-600/text-brand-600/g' "$file"
    sed -i '' 's/text-teal-700/text-brand-700/g' "$file"
    sed -i '' 's/text-teal-800/text-brand-800/g' "$file"
    sed -i '' 's/text-teal-900/text-brand-900/g' "$file"
    
    # Update background colors
    sed -i '' 's/bg-teal-50/bg-brand-50/g' "$file"
    sed -i '' 's/bg-teal-100/bg-brand-100/g' "$file"
    sed -i '' 's/bg-teal-400/bg-brand-400/g' "$file"
    sed -i '' 's/bg-teal-500/bg-brand-500/g' "$file"
    sed -i '' 's/bg-teal-600/bg-brand-600/g' "$file"
    sed -i '' 's/bg-teal-700/bg-brand-700/g' "$file"
    sed -i '' 's/bg-teal-800/bg-brand-800/g' "$file"
    sed -i '' 's/bg-teal-900/bg-brand-900/g' "$file"
    
    # Update border colors
    sed -i '' 's/border-teal-100/border-brand-100/g' "$file"
    sed -i '' 's/border-teal-200/border-brand-200/g' "$file"
    sed -i '' 's/border-teal-300/border-brand-300/g' "$file"
    sed -i '' 's/border-teal-400/border-brand-400/g' "$file"
    sed -i '' 's/border-teal-500/border-brand-500/g' "$file"
    sed -i '' 's/border-teal-600/border-brand-600/g' "$file"
    
    # Update shadow colors
    sed -i '' 's/shadow-teal-500/shadow-brand-500/g' "$file"
    sed -i '' 's/shadow-teal-600/shadow-brand-600/g' "$file"
    
    # Update ring colors
    sed -i '' 's/ring-teal-500/ring-brand-500/g' "$file"
    sed -i '' 's/ring-teal-600/ring-brand-600/g' "$file"
    
    # Update divide colors
    sed -i '' 's/divide-teal-100/divide-brand-100/g' "$file"
    
    # Update via colors for gradients
    sed -i '' 's/via-teal-500/via-brand-500/g' "$file"
    sed -i '' 's/via-teal-600/via-brand-600/g' "$file"
done

echo "✅ Brand colors updated successfully!"
echo "Main brand color is now #0F766E (brand-600)"