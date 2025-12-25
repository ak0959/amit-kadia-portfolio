import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ExperienceProps {
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string[];
  index: number;
}

export function ExperienceCard({ role, company, period, location, description, index }: ExperienceProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 md:pl-0 border-l-2 border-border md:border-0"
    >
      <div className="md:grid md:grid-cols-5 md:gap-8 items-start group">
        
        {/* Date Column (Left on Desktop) */}
        <div className="md:col-span-1 md:text-right pt-1 hidden md:block">
          <span className="text-base font-semibold text-accent uppercase tracking-wider">
            {period}
            {location && (
              <span className="text-muted-foreground ml-2 flex items-center gap-1 inline">
                <MapPin className="w-3 h-3" />
                {location}
              </span>
            )}
          </span>
        </div>

        {/* Timeline Dot (Desktop only) */}
        <div className="hidden md:flex md:col-span-1 justify-center relative">
          <div className="h-full w-px bg-border absolute top-0 bottom-0 left-1/2 -translate-x-1/2" />
          <div className="w-4 h-4 rounded-full bg-background border-2 border-primary z-10 mt-1.5 group-hover:bg-primary group-hover:scale-125 transition-all duration-300" />
        </div>

        {/* Content Column */}
        <div className="md:col-span-3 pb-12">
          {/* Mobile Date Header */}
          <div className="md:hidden flex items-center gap-2 mb-2 text-base text-accent font-semibold uppercase">
            <Calendar className="w-4 h-4" />
            {period}
            {location && ` • ${location}`}
          </div>

          <div className="glass-card p-6 rounded-2xl border border-border/50 hover:shadow-lg hover:border-accent/30 transition-all duration-300">
            <h3 className="text-xl font-bold text-primary">{role}</h3>
            <h4 className="text-lg text-primary font-medium mb-4">{company}</h4>
            
            <ul className="space-y-2">
              {description.map((item, i) => (
                <li key={i} className="text-muted-foreground text-sm leading-relaxed flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
