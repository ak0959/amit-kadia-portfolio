import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, CheckCircle2, ChevronRight, Building2 } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { EXPERIENCE_DATA } from "@/data/experience";
import { Button } from "@/components/ui/button";

export function ExperienceSection() {
  const [activeId, setActiveId] = useState<string>(EXPERIENCE_DATA[0].id);
  const detailPanelRef = useRef<HTMLDivElement>(null);

  const activeExp = EXPERIENCE_DATA.find((item) => item.id === activeId) || EXPERIENCE_DATA[0];

  const handleSelectMilestone = (id: string) => {
    setActiveId(id);
  };

  return (
    <section id="experience" className="py-24 bg-[#DDE3E8] border-t border-[#C8D3CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Career Path"
          title="Professional Experience"
          description="A timeline of delivering value across various industries and roles."
          centered
        />

        {/* Desktop & Tablet Horizontal Multi-Accent Timeline */}
        <div className="mt-16 relative hidden md:block">
          {/* Multi-Accent Gradient Timeline Line */}
          <div className="absolute top-7 left-[7%] right-[7%] h-1.5 bg-gradient-to-r from-[#24756D] via-[#94B4C1] via-[#8DAA96] via-[#213448] via-[#8A191D] to-[#24756D] rounded-full opacity-90 -z-0 shadow-sm" />

          {/* Milestones Horizontal Row */}
          <div className="grid grid-cols-6 gap-3 relative z-10">
            {EXPERIENCE_DATA.map((exp) => {
              const isActive = exp.id === activeId;
              const accent = exp.accentColor || "#24756D";

              return (
                <div
                  key={exp.id}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isActive}
                  aria-label={`Select experience details for ${exp.company}`}
                  onClick={() => handleSelectMilestone(exp.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSelectMilestone(exp.id);
                    }
                  }}
                  className="flex flex-col items-center group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#172536] rounded-xl p-1"
                >
                  {/* Timeline Dot Node with Custom Accent Glow */}
                  <div
                    style={{
                      backgroundColor: isActive ? accent : "#DDE3E8",
                      borderColor: accent,
                      boxShadow: isActive ? `0 0 16px ${accent}a0` : "none"
                    }}
                    className={`w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center mb-4 ${
                      isActive ? "scale-125" : "group-hover:scale-110"
                    }`}
                  >
                    {isActive && <div className="w-2 h-2 rounded-full bg-[#F8FAFC]" />}
                  </div>

                  {/* Milestone Compact Card */}
                  <div
                    style={{
                      borderTopColor: accent,
                      borderTopWidth: "4px"
                    }}
                    className={`w-full p-4 rounded-xl border border-[#C8D3CC] transition-all duration-300 flex flex-col justify-between h-48 ${
                      isActive
                        ? "bg-[#F4F7F5] shadow-xl -translate-y-1.5 ring-2 ring-[#24756D]"
                        : "bg-[#FFFFFF] hover:bg-[#F4F7F5] hover:shadow-md hover:-translate-y-0.5"
                    }`}
                  >
                    <div>
                      <p
                        style={{ color: accent }}
                        className="text-[11px] font-bold uppercase tracking-wider line-clamp-1"
                      >
                        {exp.period.split("–")[0]}
                      </p>
                      <h4 className="text-sm font-bold text-[#172536] line-clamp-2 leading-snug mt-1 group-hover:text-[#24756D]">
                        {exp.company.replace(" India Pvt. Ltd.", "").replace(" Resource India Pvt. Ltd.", "")}
                      </h4>
                      <p className="text-xs font-semibold text-[#52606D] line-clamp-1 mt-1">
                        {exp.role}
                      </p>
                    </div>

                    <Button
                      size="sm"
                      variant={isActive ? "default" : "outline"}
                      style={{
                        backgroundColor: isActive ? "#172536" : "transparent",
                        borderColor: isActive ? "#172536" : "#C8D3CC",
                        color: isActive ? "#F8FAFC" : "#172536"
                      }}
                      className="w-full text-xs font-semibold h-8 rounded-lg mt-2 transition-all hover:opacity-90"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Milestone Stack */}
        <div className="mt-12 md:hidden space-y-3">
          {EXPERIENCE_DATA.map((exp) => {
            const isActive = exp.id === activeId;
            const accent = exp.accentColor || "#24756D";

            return (
              <button
                key={exp.id}
                onClick={() => handleSelectMilestone(exp.id)}
                style={{
                  borderLeftColor: accent,
                  borderLeftWidth: "4px"
                }}
                className={`w-full text-left p-4 rounded-xl border border-[#C8D3CC] transition-all duration-300 flex items-center justify-between ${
                  isActive
                    ? "bg-[#F4F7F5] shadow-md ring-2 ring-[#24756D]"
                    : "bg-[#FFFFFF]"
                }`}
              >
                <div>
                  <p style={{ color: accent }} className="text-xs font-bold">{exp.period}</p>
                  <h4 className="text-base font-bold text-[#172536]">{exp.company}</h4>
                  <p className="text-xs font-medium text-[#52606D]">{exp.role}</p>
                </div>
                <div
                  style={{
                    backgroundColor: isActive ? "#172536" : "#E8EFEA",
                    color: isActive ? "#F8FAFC" : "#172536"
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                >
                  {isActive ? "Selected" : "View"}
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Detail Panel */}
        <div ref={detailPanelRef} className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeExp.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              style={{
                borderTopColor: activeExp.accentColor || "#172536",
                borderTopWidth: "4px"
              }}
              className="p-6 sm:p-8 rounded-3xl bg-[#E8EFEA] border border-[#C8D3CC] shadow-xl overflow-hidden relative"
            >
              {/* Subtle Header Accent Gradient Overlay */}
              <div
                style={{
                  background: activeExp.accentColor ? `linear-gradient(180deg, ${activeExp.accentColor}15 0%, transparent 100%)` : undefined
                }}
                className="absolute top-0 left-0 right-0 h-28 pointer-events-none"
              />

              {/* Detail Panel Header */}
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#C8D3CC]">
                <div>
                  <div className="flex items-center gap-2 mb-1 text-[#172536]">
                    <Building2 className="w-5 h-5" style={{ color: activeExp.accentColor }} />
                    <span className="text-sm font-bold tracking-wide uppercase">{activeExp.company}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#172536]">{activeExp.role}</h3>
                </div>

                <div className="flex flex-wrap gap-2 sm:text-right">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#172536]/10 text-[#172536] font-semibold text-xs border border-[#C8D3CC]">
                    <Calendar className="w-3.5 h-3.5" style={{ color: activeExp.accentColor }} />
                    {activeExp.period}
                  </div>
                  {activeExp.location && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#172536]/10 text-[#172536] font-semibold text-xs border border-[#C8D3CC]">
                      <MapPin className="w-3.5 h-3.5" style={{ color: activeExp.accentColor }} />
                      {activeExp.location}
                    </div>
                  )}
                </div>
              </div>

              {/* Role Overview */}
              <div className="relative z-10 py-6 border-b border-[#C8D3CC]">
                <p className="text-base text-[#52606D] font-medium leading-relaxed">
                  {activeExp.summary}
                </p>
              </div>

              {/* Bullets or Grouped Roles */}
              <div className="relative z-10 pt-6">
                {activeExp.groupedRoles ? (
                  <div>
                    <h4 className="text-sm font-bold text-[#172536] uppercase tracking-wider mb-4">
                      Early Career Progression & Leadership Development
                    </h4>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {activeExp.groupedRoles.map((role, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-[#FFFFFF] border border-[#C8D3CC]">
                          <p className="text-xs font-bold text-[#172536]">{role.period}</p>
                          <h5 className="text-sm font-bold text-[#172536] mt-1">{role.role}</h5>
                          <p className="text-xs font-medium text-[#52606D] mt-0.5">{role.company}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4 className="text-sm font-bold text-[#172536] uppercase tracking-wider mb-4">
                      Key Responsibilities & Deliverables
                    </h4>
                    <ul className="space-y-3">
                      {activeExp.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-[#52606D] text-sm leading-relaxed">
                          <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: activeExp.accentColor || "#24756D" }} />
                          <span className="font-normal">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
