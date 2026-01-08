# Business Cases Web Application

A modern web application for listening to business cases with audio playback, multi-language support, authentication, and admin dashboard.

## Features

- 🎧 **Audio Playback** with speed control (1x - 4x)
- 👤 **Voice Selection** - Choose between male and female voices
- 🌐 **Multi-language Support** - English and Russian interface
- 🎨 **Theme Switching** - Light and dark modes with smooth animations
- 🔐 **Authentication System** - Email/password login (Google and Telegram removed for simplicity)
- 👨‍💼 **Admin Dashboard** - Manage chapters, business cases, and users
- 💾 **PostgreSQL Database** - Via Supabase with Row Level Security
- 📱 **Responsive Design** - Works on all devices
- ✨ **Smooth Animations** - Powered by Framer Motion

---

## Admin Access

**Your account has been granted admin privileges:**

📧 **Email:** viceofficial@mail.ru  
🔑 **Password:** [Your password from signup]

After logging in, you'll see your **avatar** in the top right corner. Click it to access:
- **Admin Dashboard** - Manage all content
- **Logout** - Sign out of your account

---

## Quick Start Guide

### 1. Configure Supabase Authentication

**Important:** By default, Supabase requires email confirmation. To make registration work smoothly:

**Option A: Disable Email Confirmation (Recommended for Development)**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Authentication** → **Providers** → **Email**
4. Toggle **"Confirm email"** to **OFF**

**Option B: Set Up Email Provider (For Production)**
1. Go to **Authentication** → **Configuration** → **SMTP Settings**
2. Configure an email service (Gmail, SendGrid, etc.)

### 2. Database is Ready!

✅ All tables, policies, and data are already set up  
✅ 6 chapters with 16 business cases loaded  
✅ Your admin account is configured  

### 3. Add Audio Files

Create this folder structure and add your MP3 files:

\`\`\`
public/audio/
├── male/
│   ├── globalisation/
│   │   ├── trucklabs.mp3
│   │   ├── zohos.mp3
│   │   └── airbnb.mp3
│   ├── political-legal/
│   │   ├── middle-east-conflicts.mp3
│   │   └── china-ip-rights.mp3
│   ├── economic-systems/
│   │   ├── transforming-kingdom.mp3
│   │   └── government-interventions.mp3
│   ├── socio-cultural/
│   │   ├── disney-world-tour.mp3
│   │   └── hofstede-dimensions.mp3
│   ├── csr-ethics/
│   │   ├── kaspersky-csr.mp3
│   │   └── offshore-clinical-trials.mp3
│   └── trade-investment/
│       ├── trump-tariffs.mp3
│       └── fdi-oli-framework.mp3
└── female/
    └── [Same structure as male/]
\`\`\`

### 4. Start Using the App

1. **Regular Users:** Sign up → Verify email (if enabled) → Browse and listen to cases
2. **Admin:** Log in with your account → Click avatar → Access "Admin Dashboard" → Manage content

---

## Authentication System

### How It Works

The app uses **email/password authentication** with Supabase. When you log in:

1. Your session is stored in browser cookies (`sb-access-token` and `sb-refresh-token`)
2. The UI automatically updates - login buttons disappear, your avatar appears
3. If you're an admin, you'll see "Admin Dashboard" in the dropdown menu
4. Sessions persist across page refreshes

### User Interface Changes

**Before Login:**
- "Sign In" and "Sign Up" buttons visible in header

**After Login:**
- Login buttons disappear
- Avatar with your initials appears
- Click avatar to see dropdown menu with:
  - Your name and email
  - Admin Dashboard (admins only)
  - Logout button

---

## Using the Admin Dashboard

### Accessing Admin Panel

1. Log in with admin account (viceofficial@mail.ru)
2. Click your **avatar** in top right corner
3. Click **"Admin Dashboard"** in dropdown menu
4. You'll see tabs for managing:
   - Chapters
   - Business Cases

### Adding a New Chapter

1. Go to **Chapters** tab
2. Click **"Add Chapter"**
3. Fill in:
   - **Title (English)** - e.g., "Digital Transformation"
   - **Title (Russian)** - e.g., "Цифровая трансформация"
   - **Slug** - URL-friendly name, e.g., "digital-transformation"
   - **Description (EN & RU)** - Brief chapter summary
   - **Order** - Number for sorting (7, 8, 9, etc.)
4. Click **Create**

### Adding a New Business Case

1. Make sure audio files are uploaded to `/public/audio/`
2. Go to **Business Cases** tab
3. Click **"Add Business Case"**
4. Fill in:
   - **Title** - e.g., "Netflix's Global Strategy"
   - **Description (EN)** - Short English description
   - **Description (RU)** - Short Russian description
   - **Transcript (EN)** - Full English text of the case
   - **Transcript (RU)** - Full Russian text
   - **Chapter** - Select from dropdown
   - **Audio URL (Male)** - `/audio/male/chapter-slug/case-name.mp3`
   - **Audio URL (Female)** - `/audio/female/chapter-slug/case-name.mp3`
   - **Order** - Number within chapter (1, 2, 3, etc.)
5. Click **Create**

### Editing Content

- Click **Edit** button on any chapter or case
- Update the fields
- Click **Update** to save changes

### Deleting Content

- Click **Delete** button
- Confirm deletion
- ⚠️ **Warning:** Deleting a chapter removes all its cases!

---

## Existing Chapters & Cases

The database comes pre-loaded with:

### Chapter 1: Globalisation
- TruckLabs
- Zoho
- Airbnb

### Chapter 2: Political & Legal Environment
- How Middle East Conflicts Shape the Future of International Business
- China's Strategic Evolution in Intellectual Property Rights Protection

### Chapter 3: Economic Systems
- Transforming the Kingdom
- Government Interventions in Financial and Economic Spheres

### Chapter 4: Informal Institutions & Socio-Cultural Environment
- Disney's World Tour
- Applying Hofstede's Dimensions to Global Market Strategies: H&M and HSBC

### Chapter 5: CSR & Ethics
- Beyond Cybersecurity: Inside Kaspersky's CSR Journey
- Offshore Clinical Trials: Balancing Cost Savings and Ethical Concerns

### Chapter 6: International Trade & Investment
- The Turbulent Journey of Trade: How Trump's Tariffs Reshaped Global Commerce
- FDI: Application of the OLI Framework

---

## Troubleshooting

### Can't Log In - "Invalid credentials"

**Solutions:**
1. **Email not confirmed:** Check your email for verification link (if email confirmation is enabled)
2. **Wrong password:** Try password reset or sign up again with a new email
3. **Email confirmation enabled:** Disable it in Supabase (see Quick Start Guide)

### Login Buttons Don't Disappear After Login

**Solutions:**
1. **Wait a moment:** The UI updates automatically after successful login
2. **Refresh page:** Press Ctrl/Cmd + R
3. **Check console:** Open browser DevTools and look for errors
4. **Clear cookies:** Try logging out and back in

### Don't See Admin Dashboard

**Solutions:**
1. Make sure you're logged in with **viceofficial@mail.ru**
2. Click your **avatar** in top right corner to see dropdown menu
3. "Admin Dashboard" option should be visible if you're an admin
4. Check your role in Supabase: go to Table Editor → user_profiles → verify role is 'admin'
5. Try logging out and back in

### Audio Files Not Playing

**Solutions:**
- Check file exists at the path specified in database
- Verify path format: `/audio/male/chapter-slug/case-name.mp3`
- Use MP3 format for best compatibility
- Check file names match exactly (case-sensitive)

### Changes Don't Appear

**Solutions:**
- Refresh the page (Ctrl/Cmd + R)
- Check browser console for errors
- Verify data saved correctly in Supabase Table Editor

---

## Technologies

- **Next.js 16** with App Router
- **React 19** with Server Components
- **TypeScript** for type safety
- **Supabase** (@supabase/supabase-js) for database and auth
- **Framer Motion** for animations
- **Tailwind CSS v4** for styling
- **shadcn/ui** components

---

## Technical Details

### Authentication Implementation

The app uses a custom authentication setup with **@supabase/supabase-js** (without SSR package) for full React 19 compatibility:

- **Client-side:** Browser client with localStorage persistence
- **Server-side:** Cookies-based session management (sb-access-token, sb-refresh-token)
- **Middleware:** Custom proxy.ts checks authentication and admin roles
- **Real-time updates:** onAuthStateChange listener updates UI immediately

### Security

- **Row Level Security (RLS)** enabled on all tables
- Public read access for chapters and business cases
- Admin-only write access for content management
- Users can only view/edit their own progress
- Session tokens stored in secure cookies

---

## Support

For issues or questions:
1. Check the Troubleshooting section
2. Review [Supabase Documentation](https://supabase.com/docs)
3. Check [Next.js Documentation](https://nextjs.org/docs)

---

Made with ❤️ for business education
