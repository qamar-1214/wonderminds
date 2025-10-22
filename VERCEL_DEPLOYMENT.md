# WonderMinds - Vercel Deployment Guide

## 🚀 Complete Deployment Steps

### **Step 1: Prepare Your Project**

1. **Ensure your project builds successfully:**

   ```bash
   cd wonderminds
   npm run build
   ```

2. **Create environment variables file:**
   Create `.env.local` with the following variables:

   ```env
   # Email Configuration (Required for Contact Form & Appointment Booking)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   RECEIVER_EMAIL=your-receiver-email@gmail.com

   # Calendly Integration (Optional)
   NEXT_PUBLIC_CALENDLY_LINK=https://calendly.com/your-username

   # Next.js Configuration
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=your-secret-key-here
   ```

### **Step 2: Push to GitHub**

1. **Initialize Git repository (if not already done):**

   ```bash
   git init
   git add .
   git commit -m "Initial commit - WonderMinds website"
   ```

2. **Create GitHub repository:**

   - Go to [GitHub.com](https://github.com)
   - Click "New repository"
   - Name it "wonderminds" or "wonderminds-website"
   - Make it public or private (your choice)
   - Don't initialize with README (since you already have files)

3. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/yourusername/wonderminds.git
   git branch -M main
   git push -u origin main
   ```

### **Step 3: Deploy to Vercel**

#### **Method 1: Vercel Dashboard (Recommended)**

1. **Go to Vercel:**

   - Visit [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub account

2. **Import Project:**

   - Click "New Project"
   - Import your GitHub repository
   - Select "wonderminds" repository

3. **Configure Project:**

   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)

4. **Add Environment Variables:**

   - Click "Environment Variables" tab
   - Add each variable from your `.env.local`:
     - `EMAIL_HOST` = `smtp.gmail.com`
     - `EMAIL_PORT` = `587`
     - `EMAIL_USER` = `your-email@gmail.com`
     - `EMAIL_PASS` = `your-gmail-app-password`
     - `RECEIVER_EMAIL` = `your-receiver-email@gmail.com`
     - `NEXT_PUBLIC_CALENDLY_LINK` = `https://calendly.com/your-username`

5. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete (2-3 minutes)

#### **Method 2: Vercel CLI**

1. **Install Vercel CLI:**

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**

   ```bash
   vercel login
   ```

3. **Deploy:**

   ```bash
   cd wonderminds
   vercel
   ```

4. **Follow prompts:**
   - Link to existing project? No
   - Project name: wonderminds
   - Directory: ./
   - Override settings? No

### **Step 4: Configure Email Settings**

1. **Gmail App Password Setup:**

   - Go to Google Account settings
   - Enable 2-Factor Authentication
   - Generate App Password for "Mail"
   - Use this password in `EMAIL_PASS`

2. **Test Email Functionality:**
   - Visit your deployed site
   - Test contact form
   - Test appointment booking

### **Step 5: Custom Domain (Optional)**

1. **Add Domain in Vercel:**

   - Go to Project Settings
   - Click "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update Environment Variables:**
   - Update `NEXTAUTH_URL` with your custom domain

### **Step 6: Post-Deployment Checklist**

✅ **Verify Deployment:**

- [ ] Site loads correctly
- [ ] All pages work (Home, About, Services, Programs, Gallery, Contact)
- [ ] Mobile responsiveness works
- [ ] Contact form sends emails
- [ ] Appointment booking works
- [ ] Images load properly
- [ ] Navigation works on all devices

✅ **Performance Check:**

- [ ] Page load speeds are good
- [ ] Images are optimized
- [ ] No console errors

✅ **SEO & Analytics:**

- [ ] Add Google Analytics (optional)
- [ ] Verify meta tags
- [ ] Test social media sharing

### **Step 7: Maintenance**

1. **Automatic Deployments:**

   - Every push to main branch triggers automatic deployment
   - Preview deployments for pull requests

2. **Environment Variables:**

   - Update in Vercel dashboard when needed
   - Redeploy after changes

3. **Monitoring:**
   - Check Vercel dashboard for deployment status
   - Monitor function logs for API issues

## 🔧 Troubleshooting

### **Common Issues:**

1. **Build Failures:**

   - Check for TypeScript errors
   - Verify all imports are correct
   - Ensure all dependencies are in package.json

2. **Email Not Working:**

   - Verify Gmail App Password
   - Check environment variables in Vercel
   - Test with different email providers

3. **Images Not Loading:**

   - Check image paths in public folder
   - Verify next.config.ts image domains

4. **API Routes Not Working:**
   - Check Vercel function logs
   - Verify environment variables
   - Test API endpoints directly

## 📞 Support

If you encounter issues:

1. Check Vercel deployment logs
2. Verify environment variables
3. Test locally with `npm run build`
4. Check GitHub repository for any issues

## 🎉 Success!

Once deployed, your WonderMinds website will be live at:
`https://wonderminds.vercel.app` (or your custom domain)

Your website is now accessible worldwide! 🌍
