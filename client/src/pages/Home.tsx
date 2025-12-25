import { Navigation } from "@/components/Navigation";
import { HeroCanvas } from "@/components/HeroCanvas";
import { SectionHeader } from "@/components/SectionHeader";
import { ExperienceCard } from "@/components/ExperienceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateMessage } from "@/hooks/use-messages";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { 
  ArrowRight, 
  Linkedin, 
  Mail, 
  MapPin, 
  Download, 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  Target 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const EXPERIENCE_DATA = [
  {
    role: "Senior Project Delivery Manager",
    company: "Horizontal Integration India Pvt Ltd",
    period: "08/2024 - Present",
    location: "Vadodara / Dubai",
    description: [
      "Leading cross-functional delivery teams across India, UAE, and US.",
      "Managing complex digital transformation programs with $295K/mo budget.",
      "Improved operational efficiency by reducing sprint spillovers by 25%."
    ]
  },
  {
    role: "Delivery Manager",
    company: "CIVICA Resource India Pvt Ltd",
    period: "04/2022 - 06/2024",
    location: "Vadodara",
    description: [
      "Recovered 12-15% of at-risk margins through strategic resource allocation.",
      "Achieved zero client escalations for 6 consecutive months.",
      "Implemented risk management frameworks reducing project delays by 20%."
    ]
  },
  {
    role: "Senior Project Manager",
    company: "Exxat Systems Pvt Ltd",
    period: "10/2018 - 03/2022",
    location: "Vadodara",
    description: [
      "Spearheaded Agile adoption (Scrum/Kanban) increasing velocity by 30%.",
      "Managed key stakeholder relationships for flagship product lines.",
      "Maintained 90% team utilization rate consistently."
    ]
  },
  {
    role: "Assistant Project Manager",
    company: "Panamax Infotech Ltd",
    period: "04/2016 - 08/2018",
    location: "Ahmedabad",
    description: [
      "Oversaw delivery of fintech solutions for African markets.",
      "Coordinated between technical teams and business stakeholders.",
      "Reduced deployment downtime by implementing CI/CD best practices."
    ]
  }
];

const SKILLS_DATA = [
  { category: "Leadership", items: ["Program Management", "Stakeholder Management", "Team Leadership", "Strategic Planning", "Budget Management"] },
  { category: "Methodologies", items: ["Agile/Scrum", "Kanban", "Waterfall", "SDLC", "Risk Management"] },
  { category: "Technical", items: ["Salesforce", "Sitecore", "AWS", "JIRA/Confluence", "MS Project"] },
  { category: "Domain", items: ["Digital Transformation", "Service Delivery", "GovTech", "EdTech", "FinTech"] }
];

export default function Home() {
  const { mutate: sendMessage, isPending } = useCreateMessage();
  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: { name: "", email: "", message: "" }
  });

  const onSubmit = (data: InsertMessage) => {
    sendMessage(data, {
      onSuccess: () => form.reset()
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <HeroCanvas />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent font-medium text-sm mb-6 border border-accent/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                Open to Opportunities
              </div>
              
              <h1 className="text-5xl md:text-7xl font-display font-bold text-primary leading-tight mb-6">
                Amit <br />
                <span className="text-secondary-foreground/60">Kadia</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Strategic Program Manager & Service Delivery Leader with 19+ years of experience orchestrating complex digital transformation programs.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-primary/25 transition-all"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Contact Me <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full px-8 border-primary/20 hover:bg-primary/5 text-primary"
                  asChild
                >
                  <a href="/Amit_Kadia_CV_1766640247652.pdf" download target="_blank">
                    <Download className="mr-2 w-4 h-4" /> Download CV
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden md:block"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-3xl opacity-50" />
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-white/90 backdrop-blur border-none shadow-xl transform translate-y-8">
                  <CardHeader>
                    <Users className="w-8 h-8 text-accent mb-2" />
                    <CardTitle className="text-3xl font-bold">19+</CardTitle>
                    <p className="text-sm text-muted-foreground font-medium">Years Experience</p>
                  </CardHeader>
                </Card>
                <Card className="bg-primary text-white border-none shadow-xl transform -translate-y-4">
                  <CardHeader>
                    <Target className="w-8 h-8 text-white mb-2" />
                    <CardTitle className="text-3xl font-bold">98%</CardTitle>
                    <p className="text-sm text-white/80 font-medium">Delivery Success</p>
                  </CardHeader>
                </Card>
                <Card className="bg-white/90 backdrop-blur border-none shadow-xl col-span-2">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="p-3 bg-green-100 rounded-full">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold text-lg text-primary">$295K/mo</p>
                      <p className="text-sm text-muted-foreground">Portfolio Budget Managed</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            label="About Me" 
            title="Strategic Leadership" 
            description="I bridge the gap between technical complexity and business value, driving growth through efficient delivery."
            centered
          />
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              { 
                icon: Target, 
                title: "Program Management", 
                desc: "Expert in steering multi-million dollar digital programs from inception to delivery with proven frameworks." 
              },
              { 
                icon: Users, 
                title: "Global Team Leadership", 
                desc: "Managed distributed teams of 50+ members across India, UAE, and US timezones effectively." 
              },
              { 
                icon: TrendingUp, 
                title: "Margin Recovery", 
                desc: "Specialist in turning around at-risk projects, recovering margins by 15-20% through optimization." 
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-border"
              >
                <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-6 text-primary">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            label="Career Path" 
            title="Professional Experience"
            description="A timeline of delivering value across various industries and roles."
            centered 
          />
          
          <div className="mt-16 space-y-0 relative">
            {/* Vertical Line for Desktop is inside component */}
            {EXPERIENCE_DATA.map((exp, index) => (
              <ExperienceCard key={index} {...exp} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80')] opacity-5 bg-cover bg-center" />
        <div className="absolute inset-0 bg-primary/90" />
        
        {/* Unsplash Image Comment: Abstract digital network background for skills section */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-16 text-center">
            <span className="text-accent font-bold tracking-widest uppercase text-sm mb-2 block">Expertise</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Technical & Leadership Skills</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SKILLS_DATA.map((skillGroup, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <h3 className="text-xl font-bold text-accent mb-6">{skillGroup.category}</h3>
                <ul className="space-y-3">
                  {skillGroup.items.map((skill, j) => (
                    <li key={j} className="flex items-center gap-3 text-white/80">
                      <CheckCircle2 className="w-5 h-5 text-accent/80 flex-shrink-0" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <SectionHeader 
                label="Get in Touch" 
                title="Let's Start a Conversation"
                description="Interested in collaboration or have a project in mind? I'm always open to discussing new opportunities."
              />
              
              <div className="space-y-8 mt-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-primary flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-primary">Location</h4>
                    <p className="text-muted-foreground">Dubai, UAE & Vadodara, India</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-primary flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-primary">Email</h4>
                    <a href="mailto:adi209@gmail.com" className="text-muted-foreground hover:text-accent transition-colors">
                      adi209@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-primary flex-shrink-0">
                    <Linkedin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-primary">LinkedIn</h4>
                    <a href="https://linkedin.com/in/amitkadia" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                      linkedin.com/in/amitkadia
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 border border-border">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">Name</label>
                  <Input 
                    placeholder="Your Name" 
                    className="bg-white border-gray-200 focus:border-primary h-12"
                    {...form.register("name")}
                  />
                  {form.formState.errors.name && (
                    <p className="text-destructive text-xs">{form.formState.errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">Email</label>
                  <Input 
                    placeholder="your@email.com" 
                    type="email"
                    className="bg-white border-gray-200 focus:border-primary h-12"
                    {...form.register("email")}
                  />
                  {form.formState.errors.email && (
                    <p className="text-destructive text-xs">{form.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">Message</label>
                  <Textarea 
                    placeholder="How can I help you?" 
                    className="bg-white border-gray-200 focus:border-primary min-h-[150px] resize-none"
                    {...form.register("message")}
                  />
                  {form.formState.errors.message && (
                    <p className="text-destructive text-xs">{form.formState.errors.message.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full h-12 bg-primary text-white hover:bg-primary/90 text-lg font-medium"
                >
                  {isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white/40 text-sm">
          <p>© {new Date().getFullYear()} Amit Kadia. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
