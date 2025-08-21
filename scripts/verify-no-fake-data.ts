#!/usr/bin/env node

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// Script to verify no fake data remains
const checkForFakeData = () => {
  console.log('🔍 Checking for remaining fake data patterns...\n');
  
  const prohibited = [
    'Math.random()',
    'simulateActivity',
    'setInterval',
    'baseMembers',
    '1247', // Hardcoded member count
    '= 127', // Base members value
    'messagesToday: 234',
    'activeNow: 47',
    'questionsAnswered: 18',
    'vipSlotsLeft: 23'
  ];
  
  const issues: string[] = [];
  
  // Define directories to check
  const dirsToCheck = [
    'components',
    'hooks', 
    'lib',
    'app'
  ];
  
  // Search for prohibited patterns
  prohibited.forEach(pattern => {
    console.log(`Checking for: "${pattern}"`);
    
    dirsToCheck.forEach(dir => {
      try {
        const result = execSync(
          `grep -r "${pattern}" ${dir} --include="*.ts" --include="*.tsx" 2>/dev/null || true`,
          { encoding: 'utf-8' }
        );
        
        if (result.trim()) {
          issues.push(`\n❌ Found "${pattern}" in:\n${result}`);
        }
      } catch (error) {
        // Grep returns non-zero when no matches found, which is fine
      }
    });
  });
  
  // Report results
  console.log('\n' + '='.repeat(50));
  console.log('VERIFICATION RESULTS');
  console.log('='.repeat(50) + '\n');
  
  if (issues.length === 0) {
    console.log('✅ SUCCESS: No fake data patterns found!');
    console.log('\nChecklist:');
    console.log('✅ All Math.random() removed');
    console.log('✅ All setInterval for simulations removed'); 
    console.log('✅ All hardcoded counts removed or replaced');
    console.log('✅ simulateActivity function deleted');
    console.log('✅ Base member additions removed');
    console.log('✅ Hardcoded statistics removed');
  } else {
    console.log('❌ ISSUES FOUND:');
    issues.forEach(issue => console.log(issue));
    console.log('\n⚠️  Please fix these issues before deploying!');
    process.exit(1);
  }
  
  // Additional checks
  console.log('\n📋 Manual verification checklist:');
  console.log('- [ ] Activity feed shows only real activities');
  console.log('- [ ] Member counts show only real numbers');
  console.log('- [ ] University claim verified or made generic');
  console.log('- [ ] No fake urgency indicators');
  console.log('- [ ] Loading states instead of fake fallbacks');
  console.log('- [ ] All Firebase initial values set to 0 or real limits');
};

// Run the verification
checkForFakeData();