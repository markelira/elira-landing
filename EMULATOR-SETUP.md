# Firebase Emulator Setup

## Quick Start

### 1. Start Development Environment
```bash
npm run dev
```

This starts both Next.js and Firebase emulators concurrently.

### 2. Seed Emulator Database
**IMPORTANT:** Run this after starting emulators for the first time or after clearing data:

```bash
npm run seed:emulator
```

This creates:
- ✅ AI Copywriting course with 3 modules and 11 lessons
- ✅ Test user: `mark@elira.hu` / `password123`
- ✅ Active enrollment for the test user

### 3. Access the Application
- **Frontend**: http://localhost:3000
- **Course Player**: http://localhost:3000/courses/ai-copywriting-course/learn
- **Emulator UI**: http://127.0.0.1:4000

### 4. Login
```
Email:    mark@elira.hu
Password: password123
```

---

## Data Persistence

### Automatic Export/Import
The emulators are configured to:
- **Import** data from `./firestore-export` on startup (if exists)
- **Export** data to `./firestore-export` on graceful shutdown (Ctrl+C)

### When to Re-seed

Re-run `npm run seed:emulator` when:
- ❌ Course not found errors appear
- ❌ User cannot access the course
- ❌ Emulators were force-killed (not gracefully shut down)
- ❌ You cleared the `firestore-export` directory

### Manual Export (Optional)
To manually export current emulator data:
```bash
# While emulators are running
firebase emulators:export ./firestore-export
```

---

## Emulator Ports

- **Firestore**: 127.0.0.1:8080
- **Auth**: 127.0.0.1:9099
- **Functions**: 127.0.0.1:5001
- **Storage**: 127.0.0.1:9199
- **Emulator UI**: 127.0.0.1:4000

---

## Troubleshooting

### "Course not found" Error
**Solution**: Run `npm run seed:emulator`

### "Access denied" / Paywall Shows
**Causes**:
1. Not logged in
2. User doesn't have enrollment

**Solution**:
1. Login with `mark@elira.hu` / `password123`
2. If still blocked, run `npm run seed:emulator` to recreate enrollment

### Emulators Won't Start
**Solution**: Kill existing processes
```bash
pkill -f "firebase emulators"
npm run dev
```

---

## Production Data (Optional)

To test with real production data:

### Export from Production
```bash
firebase firestore:export ./production-export --project elira-landing-ce927
firebase auth:export ./production-users.json --project elira-landing-ce927
```

### Import to Emulator
```bash
# Copy exported data to firestore-export directory
cp -r ./production-export/* ./firestore-export/

# Import auth users (while emulators running)
firebase auth:import ./production-users.json --project elira-landing-ce927
```

**⚠️ Warning**: Never commit production data to git!
