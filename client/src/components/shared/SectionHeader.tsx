import { motion } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  centered?: boolean;
  darkTheme?: boolean;
}

export function SectionHeader({ label, title, description, centered = false, darkTheme = false }: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`${darkTheme ? 'text-[#D3C5F6]' : 'text-[#3B2A60]'} font-bold tracking-widest uppercase text-sm mb-2 block`}
      >
        {label}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`text-3xl md:text-5xl font-display font-bold ${darkTheme ? 'text-[#F3EEFC]' : 'text-[#3B2A60]'} mb-4`}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`text-base sm:text-lg ${darkTheme ? 'text-[#E2D8FA]' : 'text-[#4A326E]'} font-normal max-w-none md:max-w-4xl lg:max-w-5xl mx-auto whitespace-normal md:whitespace-nowrap overflow-hidden text-ellipsis`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
