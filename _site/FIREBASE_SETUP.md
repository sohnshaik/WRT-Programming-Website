# Firebase Setup Guide

The auth + score storage runs on Firebase (free tier is more than enough for a team of ~15 students).

## Step 1: Create a Firebase Project

1. Go to https://console.firebase.google.com
2. Click **Add project** → name it `wrt-programming` (or whatever)
3. Disable Google Analytics (you don't need it)
4. Click **Create project**

## Step 2: Enable Authentication

1. In the Firebase console, click **Authentication** → **Get started**
2. Under **Sign-in method**, enable **Email/Password**
3. Click Save

## Step 3: Create a Firestore Database

1. Click **Firestore Database** → **Create database**
2. Start in **test mode** (you'll add rules later)
3. Pick a location (us-east1 is fine)

## Step 4: Set Firestore Security Rules

In Firestore → Rules, paste this:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own document
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
    // Teachers and admins can read all users
    match /users/{uid} {
      allow read: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['teacher', 'admin'];
    }
    // Scores: students write their own, teachers read all
    match /scores/{uid}/weeks/{weekId} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
      allow read: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['teacher', 'admin'];
    }
  }
}
```

## Step 5: Get Your Config

1. In Firebase console, click the **gear icon** → **Project settings**
2. Scroll to **Your apps** → click the **</>** (web) icon
3. Register the app as `wrt-course`
4. Copy the firebaseConfig object — it looks like:
```js
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456",
  appId: "1:123456:web:abcdef"
};
```

## Step 6: Paste Config into 3 Files

Replace the `REPLACE_ME` placeholders in:
1. `login.md` (the `firebaseConfig` object)
2. `assets/js/auth.js` (the `firebaseConfig` object)
3. `dashboard-teacher.md` (the `firebaseConfig` object)

## Step 7: Set Access Codes

In `login.md`, find the `ACCESS_CODES` object and replace with real codes:
```js
const ACCESS_CODES = {
  'ROBOTICS2974':    'student',   // hand this out to all students
  'LEADS2974':       'teacher',   // only give to programming leads
  'SOHAN_ADMIN_CODE': 'admin',    // keep this one secret
};
```

**Don't commit the admin code to a public repo!!** Use a private repo or GitHub Secrets.

## Step 8: Push and Test

```bash
git add .
git commit -m "add Firebase auth"
git push origin main
```

Go to `wrtprogramming.com/login/` → create a student account with the student code → sign in → you should see your name in the topbar.

---

That's it!! If something breaks, check the browser console for Firebase errors and compare your config keys.
