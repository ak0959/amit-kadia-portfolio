# Portfolio Builder

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern design with smooth animations
- 📱 Fully responsive layout
- 🎯 Interactive 3D hero section
- 📧 Contact form with EmailJS integration
- 🏆 Certifications carousel
- 💼 Professional experience timeline
- 🎨 Skills showcase
- 🌙 Clean, professional UI

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **3D Graphics**: Three.js, React Three Fiber
- **Forms**: React Hook Form, Zod validation
- **Email**: EmailJS
- **Icons**: Lucide React
- **UI Components**: Radix UI

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Deployment to Vercel

### Prerequisites

1. Create a [Vercel account](https://vercel.com)
2. Install Vercel CLI: `npm i -g vercel`

### Deploy Steps

1. **Clone and setup the project**:
   ```bash
   git clone <your-repo>
   cd portfolio-builder
   npm install
   ```

2. **Configure EmailJS** (for contact form):
   - Create an account at [EmailJS](https://www.emailjs.com/)
   - Get your Service ID, Template ID, and Public Key
   - In Vercel dashboard, go to your project settings
   - Add these environment variables:
     - `VITE_EMAILJS_SERVICE_ID`
     - `VITE_EMAILJS_TEMPLATE_ID`
     - `VITE_EMAILJS_PUBLIC_KEY`

3. **Deploy to Vercel**:
   ```bash
   vercel
   ```
   Follow the prompts to link your project and deploy. Vercel will automatically detect the Vite configuration in the `client/` directory.

4. **Alternative: Deploy via GitHub**:
   - Push your code to GitHub
   - Connect your GitHub repo to Vercel
   - Vercel will automatically detect and deploy from the `client/` directory

### Project Structure for Deployment

The project is structured for easy deployment:
- `client/` - Contains the React app with its own `package.json`
- `client/public/` - Static assets including certifications and CV
- Vercel auto-detects the Vite configuration and builds from `client/`

## Customization

### Adding Certifications

1. Add certificate images to `client/public/certifications/`
2. Update the `CERTIFICATIONS_DATA` array in `client/src/pages/Home.tsx`

### Modifying Content

- Update personal information in `client/src/pages/Home.tsx`
- Modify experience data in the `EXPERIENCE_DATA` array
- Update skills in the `SKILLS_DATA` array

### Styling

- Colors and themes can be modified in `tailwind.config.ts`
- Component styles are in their respective `.tsx` files

## License

MIT License - feel free to use this template for your portfolio!