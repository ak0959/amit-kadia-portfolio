import { useState, useEffect, lazy, Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Users, Globe, Award, LucideIcon } from "lucide-react";

// Lazy load Three.js Canvas for faster initial page load
const HeroCanvas = lazy(() => import("./HeroCanvas"));

interface HeroStatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  accentColor: string;
  variant?: "light" | "dark";
  fullWidth?: boolean;
}

function HeroStatCard({ icon: Icon, value, label, accentColor, variant = "light", fullWidth = false }: HeroStatCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const isDark = variant === "dark";

  return (
    <motion.div
      tabIndex={0}
      initial={false}
      whileHover={
        shouldReduceMotion
          ? undefined
          : { y: -10, scale: 1.03 }
      }
      whileFocus={
        shouldReduceMotion
          ? undefined
          : { y: -8, scale: 1.025 }
      }
      transition={{
        type: "spring",
        stiffness: 360,
        damping: 22,
        mass: 0.7
      }}
      style={{
        borderTopColor: accentColor,
        borderTopWidth: "4px"
      }}
      className={`relative z-0 hover:z-20 focus-visible:z-20 p-6 rounded-2xl border transition-colors duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#3B2A60] focus-visible:ring-offset-2 group shadow-xl ${
        fullWidth ? "col-span-2 flex items-center gap-5" : "flex flex-col justify-between h-full"
      } ${
        isDark
          ? "bg-[#3B2A60] text-white border-[#3B2A60] hover:border-[#4A326E] hover:shadow-[0_22px_48px_rgba(46,33,75,0.42)] shadow-[#3B2A60]/20"
          : "bg-[#E2D8FA] border-[#3B2A60]/20 hover:border-[#3B2A60]/50 hover:shadow-[0_20px_45px_rgba(59,42,96,0.28)] shadow-[#3B2A60]/10"
      }`}
    >
      <div
        style={{
          backgroundColor: accentColor
        }}
        className={`rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 group-focus-visible:scale-110 transition-transform ${
          fullWidth ? "p-3.5 w-14 h-14 rounded-2xl flex-shrink-0" : "w-11 h-11 mb-3"
        }`}
      >
        <Icon className={`${fullWidth ? "w-7 h-7" : "w-5 h-5"} text-white`} />
      </div>

      <div>
        <p className={`font-bold font-sans ${fullWidth ? "text-2xl" : "text-3xl"} ${isDark ? "text-[#F3EEFC]" : "text-[#3B2A60]"}`}>
          {value}
        </p>
        <p className={`text-sm font-medium ${fullWidth ? "" : "mt-1"} ${isDark ? "text-[#DDD3F8]" : "text-[#4A326E]"}`}>
          {label}
        </p>
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  const [shouldLoadCanvas, setShouldLoadCanvas] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Defer heavy Three.js background canvas rendering until browser is idle
  useEffect(() => {
    if (shouldReduceMotion) return;

    let timerId: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;

    if ("requestIdleCallback" in window) {
      idleId = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
        () => setShouldLoadCanvas(true),
        { timeout: 2000 }
      );
    } else {
      timerId = setTimeout(() => setShouldLoadCanvas(true), 800);
    }

    return () => {
      if (idleId && "cancelIdleCallback" in window) {
        (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
      }
      if (timerId) clearTimeout(timerId);
    };
  }, [shouldReduceMotion]);

  return (
    <section className="relative pt-24 pb-8 md:pt-28 md:pb-12 overflow-hidden bg-[#C8B6F0]/30">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#D3C5F6] via-[#C8B6F0] to-[#DDD3F8] opacity-80">
        {shouldLoadCanvas && (
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-2 md:py-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[#3B2A60] leading-tight mb-5 tracking-tight whitespace-nowrap">
              Amit Kadia
            </h1>

            <p className="text-xl text-[#4A326E] mb-7 max-w-lg leading-relaxed font-normal">
              Strategic Program Manager & Service Delivery Leader with 20+ years of experience orchestrating complex digital transformation programs.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="rounded-full px-8 bg-[#3B2A60] hover:bg-[#2E214B] text-[#F3EEFC] font-medium shadow-lg hover:shadow-[#3B2A60]/25 transition-all"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contact Me <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-[#3B2A60]/30 bg-[#E2D8FA]/60 hover:bg-[#E2D8FA] text-[#3B2A60] font-medium hover:border-[#3B2A60]/60"
                asChild
              >
                <a 
                  href="/documents/resume/Amit%20Kadia%20-%20New.pdf" 
                  download="Amit-Kadia-Resume.pdf" 
                  target="_blank"
                >
                  <Download className="mr-2 w-4 h-4" /> Download CV
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-[#D3C5F6]/40 to-[#3B2A60]/20 rounded-full blur-3xl opacity-50" />
            
            {/* 2-Top + 1-Bottom Grid with solid semantic icon backgrounds and white icons */}
            <div className="grid grid-cols-2 gap-5 py-10 px-2">
              {/* Stat 1: 20+ Years */}
              <HeroStatCard
                icon={Users}
                value="20+ Years"
                label="Professional Experience"
                accentColor="#2563EB" // Deep Blue
                variant="light"
              />

              {/* Stat 2: 3 Global Markets */}
              <HeroStatCard
                icon={Globe}
                value="3 Global Markets"
                label="India, UAE & US"
                accentColor="#0F9D8A" // Teal
                variant="dark"
              />

              {/* Stat 3: 10+ Years Leadership (Bottom Full Width Card) */}
              <HeroStatCard
                icon={Award}
                value="10+ Years"
                label="Programme & Delivery Leadership"
                accentColor="#D97706" // Amber / Warm Gold
                variant="light"
                fullWidth
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
