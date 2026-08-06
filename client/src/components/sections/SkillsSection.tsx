import { motion } from "framer-motion";
import { ShieldCheck, Workflow, Sparkles, Cpu } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SKILLS_DATA } from "@/data/skills";

const categoryIcons = [ShieldCheck, Workflow, Sparkles, Cpu];
const categoryAccents = ["#5B4DB1", "#D97706", "#2563EB", "#0F9D8A"]; // Indigo, Orange, Blue, Teal

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-[#3B2A60] text-[#F3EEFC] relative overflow-hidden border-t border-[#3B2A60]/30 shadow-inner">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80')] opacity-5 bg-cover bg-center" />
      <div className="absolute inset-0 bg-[#3B2A60]/95" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          label="Capabilities"
          title="Leadership, Delivery & Digital Capabilities"
          description="Strategic governance, Agile delivery methods, organizational transformation, and modern delivery tools."
          centered
          darkTheme={true}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {SKILLS_DATA.map((skillGroup, i) => {
            const Icon = categoryIcons[i % categoryIcons.length];
            const accentColor = categoryAccents[i % categoryAccents.length];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#E2D8FA] hover:bg-[#F3EEFC] border border-[#3B2A60]/20 rounded-2xl p-6 hover:shadow-[0_14px_35px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div
                    style={{ backgroundColor: accentColor }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-white shadow-md group-hover:scale-105 transition-transform"
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#3B2A60] mb-2 leading-snug">{skillGroup.category}</h3>
                  <p className="text-[13px] text-[#4A326E] mb-6 font-normal leading-relaxed">{skillGroup.description}</p>
                </div>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, j) => (
                    <span
                      key={j}
                      className="px-2.5 py-1 rounded-lg bg-[#DDD3F8] border border-[#3B2A60]/25 text-[#3B2A60] text-xs font-semibold hover:border-[#3B2A60]/50 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
