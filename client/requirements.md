## Packages
framer-motion | Smooth animations for UI elements (alternative to anime.js for React-friendly usage)
@react-three/fiber | React renderer for Three.js
@react-three/drei | Helpers for Three.js
three | 3D library
emailjs-com | Sending emails from the contact form
lucide-react | Icons (already in stack but confirming usage)
clsx | Utility for constructing className strings
tailwind-merge | Utility for merging Tailwind classes

## Notes
Tailwind Config - extend fontFamily:
fontFamily: {
  sans: ["Inter", "sans-serif"],
  display: ["Playfair Display", "serif"],
}
Contact form submits to both EmailJS (client-side) and POST /api/messages (backend backup).
Hero section uses a subtle 3D background.
