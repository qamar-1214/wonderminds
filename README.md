# WonderMinds - Early Childhood Education Website

A modern, responsive website for WonderMinds early childhood education center built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Modern Design** - Beautiful violet-themed design with dark/light mode support
- 📱 **Responsive** - Fully responsive design that works on all devices
- ⚡ **Fast Performance** - Built with Next.js 15 and optimized for speed
- 🎭 **Animations** - Smooth animations powered by Framer Motion
- 📧 **Contact Forms** - Working contact and appointment forms with email integration
- 📅 **Calendly Integration** - Seamless appointment scheduling
- 🖼️ **Gallery** - Interactive image gallery with lightbox
- ♿ **Accessible** - Built with accessibility best practices
- 🔍 **SEO Optimized** - Proper meta tags and structured data

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom violet theme
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Email**: Nodemailer
- **Fonts**: Poppins (headings), Inter (body)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wonderminds
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your configuration:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
RECEIVER_EMAIL=info@wonderminds.edu
NEXT_PUBLIC_CALENDLY_LINK=https://calendly.com/wonderminds/consultation
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `EMAIL_HOST` | SMTP server host | Yes |
| `EMAIL_PORT` | SMTP server port | Yes |
| `EMAIL_USER` | Email username | Yes |
| `EMAIL_PASS` | Email password/app password | Yes |
| `RECEIVER_EMAIL` | Email to receive form submissions | Yes |
| `NEXT_PUBLIC_CALENDLY_LINK` | Calendly scheduling link | Yes |

## Email Setup

For Gmail:
1. Enable 2-factor authentication
2. Generate an "App Password" for `EMAIL_PASS`
3. Use your Gmail address for `EMAIL_USER`

## Project Structure

```
wonderminds/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── send-email/    # Contact form endpoint
│   │   └── send-appointment/ # Appointment form endpoint
│   ├── about/             # About page
│   ├── programs/          # Programs page
│   ├── gallery/           # Gallery page
│   ├── contact/           # Contact page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── Header.tsx        # Navigation header
│   ├── Footer.tsx        # Site footer
│   ├── Hero.tsx          # Hero section
│   ├── ContactForm.tsx   # Contact form
│   ├── AppointmentForm.tsx # Appointment form
│   ├── FloatingChat.tsx  # Floating chat widget
│   ├── ProgramCard.tsx   # Program card component
│   └── GalleryGrid.tsx   # Gallery component
├── lib/                  # Utility functions
├── public/               # Static assets
│   └── images/          # Image assets
├── .env.example         # Environment variables template
└── README.md           # This file
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Customization

### Colors
Update the violet theme in `tailwind.config.js` and `app/globals.css`

### Content
- Update text content in component files
- Replace placeholder images in `public/images/`
- Modify program details in page components

### Email Templates
Customize email templates in the API route files:
- `app/api/send-email/route.ts`
- `app/api/send-appointment/route.ts`

## Support

For questions or support, please contact the development team.

## License

This project is proprietary software for WonderMinds.
