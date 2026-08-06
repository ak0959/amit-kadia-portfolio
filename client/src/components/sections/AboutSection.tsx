import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ABOUT_CARDS } from "@/data/about";

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#DDD3F8] relative border-t border-[#3B2A60]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="About Me"
          title="Strategic Leadership"
          description="Leading complex programmes through governance, Agile delivery, transformation, and responsible AI-enabled improvement."
          centered
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {ABOUT_CARDS.map((item, i) => (
            <motion.div
              key={i}
              tabIndex={0}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                borderTopColor: item.accentColor,
                borderTopWidth: "4px"
              }}
              className="p-7 rounded-2xl bg-[#3B2A60] hover:bg-[#2E214B] hover:shadow-[0_14px_35px_rgba(59,42,96,0.35)] hover:-translate-y-1.5 transition-all duration-300 border border-[#3B2A60] flex flex-col justify-between group outline-none focus-visible:ring-2 focus-visible:ring-[#3B2A60] cursor-pointer"
            >
              <div>
                <div
                  style={{
                    backgroundColor: item.accentColor
                  }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-white shadow-md"
                >
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#F3EEFC] mb-3 leading-snug">{item.title}</h3>
                <p className="text-[15px] text-[#DDD3F8] leading-relaxed font-normal">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
