import { motion, useReducedMotion } from "framer-motion";
import { FolderGit2, ExternalLink, LineChart, Database, Bot, Github } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PROJECTS_DATA } from "@/data/projects";
import { Button } from "@/components/ui/button";

const projectIcons = [LineChart, Database, Bot, FolderGit2, ExternalLink];

export function ProjectsSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="projects" className="py-24 bg-[#F6F3EC] border-t border-[#C8D3CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="SELECTED WORK"
          title="AI, Analytics & Transformation Projects"
          description="Practical projects demonstrating analytics, automation, machine learning, and business-focused decision support."
          centered
        />

        {/* 6-Column Grid on Desktop to perfectly center the final 2-project row */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-6 gap-6">
          {PROJECTS_DATA.map((project, i) => {
            const Icon = projectIcons[i % projectIcons.length];
            const hasProjectUrl = Boolean(project.projectUrl);
            const targetUrl = project.projectUrl || project.githubUrl;

            // Positioning for 3-top + 2-bottom centered desktop layout
            const gridPositionClass =
              i === 3
                ? "lg:col-span-2 lg:col-start-2"
                : "lg:col-span-2";

            return (
              <motion.div
                key={project.id}
                tabIndex={0}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.015 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                style={{
                  borderTopColor: project.accentColor,
                  borderTopWidth: "4px"
                }}
                className={`p-7 rounded-2xl bg-[#FFFFFF] hover:bg-[#F4F7F5] hover:shadow-2xl transition-all duration-200 border border-[#C8D3CC] flex flex-col justify-between group outline-none focus-visible:ring-2 focus-visible:ring-[#172536] focus-visible:ring-offset-2 relative overflow-hidden ${gridPositionClass}`}
              >
                {/* Accent-tinted header gradient glow zone */}
                <div
                  style={{
                    background: `linear-gradient(180deg, ${project.accentColor}18 0%, transparent 100%)`
                  }}
                  className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
                />

                <div className="relative z-10">
                  {/* Card Header: Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      style={{
                        backgroundColor: project.accentColor
                      }}
                      className="w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform text-white shadow-md"
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-[#172536] mb-3 leading-snug group-hover:text-[#24756D] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[15px] text-[#52606D] leading-relaxed mb-6 font-normal">
                    {project.description}
                  </p>
                </div>

                <div className="relative z-10">
                  {/* Technology Tags with Accent Tint Borders & Backgrounds */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag, j) => (
                      <span
                        key={j}
                        style={{
                          backgroundColor: `${project.accentColor}12`,
                          borderColor: `${project.accentColor}30`
                        }}
                        className="px-2.5 py-1 rounded-md border text-[#172536] text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Functional CTA Button */}
                  {targetUrl && (
                    <div className="pt-4 border-t border-[#D8DFDA]">
                      <Button
                        asChild
                        variant="outline"
                        style={{
                          borderColor: project.accentColor,
                          color: "#172536"
                        }}
                        className="w-full h-10 rounded-xl border font-semibold text-xs transition-all hover:bg-[#172536] hover:text-white"
                      >
                        <a
                          href={targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={hasProjectUrl ? `View project: ${project.title}` : `View ${project.title} repository on GitHub`}
                          className="inline-flex items-center justify-center gap-2"
                        >
                          {hasProjectUrl ? (
                            <>
                              <span>View Project</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </>
                          ) : (
                            <>
                              <Github className="w-3.5 h-3.5" />
                              <span>View on GitHub</span>
                            </>
                          )}
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
