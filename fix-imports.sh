#!/bin/bash

# Fix card imports
find app/admin -name "*.tsx" -o -name "*.ts" | xargs sed -i '' "s|from '@/components/ui/card'|from '@/components/ui/Card'|g"

# Fix button imports  
find app/admin -name "*.tsx" -o -name "*.ts" | xargs sed -i '' "s|from '@/components/ui/button'|from '@/components/ui/Button'|g"

# Fix other common imports
find app -name "*.tsx" -o -name "*.ts" | xargs sed -i '' "s|from '@/components/ui/card'|from '@/components/ui/Card'|g"
find app -name "*.tsx" -o -name "*.ts" | xargs sed -i '' "s|from '@/components/ui/button'|from '@/components/ui/Button'|g"
find components -name "*.tsx" -o -name "*.ts" | xargs sed -i '' "s|from '@/components/ui/card'|from '@/components/ui/Card'|g"
find components -name "*.tsx" -o -name "*.ts" | xargs sed -i '' "s|from '@/components/ui/button'|from '@/components/ui/Button'|g"

echo "Import fixes applied"
