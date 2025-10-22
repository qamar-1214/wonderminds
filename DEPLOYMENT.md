# WonderMinds Website - Deployment Guide

This guide is designed for non-technical users to understand how to deploy and manage the WonderMinds website.

## 🚀 Quick Start

The website is ready to deploy! Here's what you need to do:

### 1. Set Up Your Email (Required)

**Why this is needed:** The contact and appointment forms on your website need to send emails to you when parents fill them out.

**Steps:**
1. **Choose an email provider** (Gmail is recommended for beginners)
2. **Enable 2-factor authentication** on your email account
3. **Generate an "App Password"** (this is different from your regular password)
4. **Get your email settings** from your provider

**For Gmail:**
- Go to your Google Account settings
- Security → 2-Step Verification → App passwords
- Generate a new app password for "Mail"
- Use this password (not your regular Gmail password)

### 2. Set Up Calendly (Required)

**Why this is needed:** When parents book appointments, they'll be redirected to your Calendly scheduling page.

**Steps:**
1. Go to [calendly.com](https://calendly.com) and create a free account
2. Set up your availability and services
3. Copy your Calendly link (it looks like: `https://calendly.com/yourname/consultation`)

### 3. Deploy to Vercel (Recommended)

**Why Vercel:** It's the easiest platform for Next.js websites and offers free hosting.

**Steps:**
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click "New Project" and connect your GitHub repository
3. Add your environment variables (see below)
4. Click "Deploy"

## 📧 Environment Variables Setup

These are the settings your website needs to work properly. You'll add these in Vercel:

### Required Settings

| Setting Name | What to Enter | Example |
|--------------|---------------|---------|
| `EMAIL_HOST` | Your email provider's server | `smtp.gmail.com` |
| `EMAIL_PORT` | Port number | `587` |
| `EMAIL_USER` | Your email address | `yourname@gmail.com` |
| `EMAIL_PASS` | Your app password (not regular password) | `abcd efgh ijkl mnop` |
| `RECEIVER_EMAIL` | Where form submissions go | `info@wonderminds.edu` |
| `NEXT_PUBLIC_CALENDLY_LINK` | Your Calendly link | `https://calendly.com/yourname/consultation` |

### How to Add in Vercel:
1. In your Vercel project dashboard
2. Go to "Settings" → "Environment Variables"
3. Add each setting one by one
4. Make sure to select "Production" for all of them

## 🖼️ Adding Your Images

**Current Status:** The website has placeholder images that need to be replaced.

**What you need to do:**
1. Take or gather photos of your facility
2. Replace the placeholder images in the `public/images/` folder
3. Follow the naming convention in `public/images/README.md`

**Required Photos:**
- **Hero section:** Children learning/playing
- **Programs:** Photos for each age group (infant, toddler, preschool, etc.)
- **Gallery:** Classroom, playground, art studio, library, etc.
- **Team:** Professional photos of staff members
- **About:** General facility photos

## 📝 Updating Content

### Text Content
- **Homepage:** Update the hero text, program descriptions, and about section
- **About Page:** Add your mission, vision, and team information
- **Programs Page:** Update program details, schedules, and pricing
- **Contact Page:** Update address, phone numbers, and hours

### Contact Information
Update these throughout the website:
- School address
- Phone numbers
- Email addresses
- Operating hours
- Social media links

## 🔧 Making Changes

### For Small Text Changes:
1. Go to your GitHub repository
2. Find the file you want to edit
3. Click "Edit" (pencil icon)
4. Make your changes
5. Commit the changes
6. Vercel will automatically update your website

### For Image Changes:
1. Upload new images to the `public/images/` folder
2. Make sure they have the same filename as the old ones
3. Commit the changes

## 📊 Monitoring Your Website

### Check if Everything Works:
1. **Visit your live website**
2. **Test the contact form** - fill it out and submit
3. **Test the appointment form** - fill it out and submit
4. **Check your email** - you should receive the form submissions
5. **Test the Calendly link** - make sure it opens correctly

### Common Issues:
- **Forms not working:** Check your email settings in Vercel
- **Images not showing:** Make sure image files are uploaded correctly
- **Calendly not working:** Check your Calendly link in Vercel settings

## 🆘 Getting Help

### If You Need Technical Help:
1. **Check the main README.md** for technical details
2. **Contact your developer** for complex changes
3. **Vercel Support** for deployment issues

### If You Need Content Help:
1. **Review the placeholder content** in each page
2. **Update with your actual information**
3. **Use the same structure** but replace the text

## 📈 After Launch

### Regular Maintenance:
- **Update photos** quarterly
- **Review content** for accuracy
- **Check forms** monthly to ensure they're working
- **Update team information** when staff changes

### Analytics (Optional):
- Set up Google Analytics to track website visitors
- Monitor form submissions and appointment bookings
- Use insights to improve your website

## 🎉 Success!

Once everything is set up:
- Your website will be live at your custom domain
- Parents can contact you through the website
- Appointments will be scheduled through Calendly
- You'll receive email notifications for all inquiries

**Remember:** The website is designed to work out of the box, but you'll need to add your own content and images to make it truly yours!
