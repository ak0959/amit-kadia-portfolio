import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "emailjs-com";
import { Linkedin, Mail, MapPin, Phone, Briefcase } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { insertMessageSchema, type InsertMessage } from "@/types/contact";

export function ContactSection() {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: { name: "", email: "", message: "" }
  });

  const onSubmit = async (data: InsertMessage) => {
    // Silent rejection for automated bot submissions populating hidden honeypot
    if (honeypot.trim() !== "") {
      form.reset();
      return;
    }

    setIsSending(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast({
        title: "Configuration Error",
        description: "EmailJS credentials are missing in environment variables.",
        variant: "destructive"
      });
      setIsSending(false);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
          reply_to: data.email,
        },
        publicKey
      );

      toast({
        title: "Message Sent",
        description: "Thank you for reaching out! I'll get back to you soon.",
      });

      form.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        title: "Error Sending Message",
        description: "Something went wrong. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#DDD3F8] border-t border-[#3B2A60]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <SectionHeader
              label="Get in Touch"
              title="Let's Start a Conversation"
              description="Interested in collaboration or have a project in mind? I'm always open to discussing new opportunities."
              descriptionWrap={true}
            />

            <div className="space-y-6 mt-8">
              {/* Location */}
              <div className="flex items-center gap-4 group">
                <div 
                  className="w-12 h-12 rounded-2xl bg-[#EA4335] text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-md"
                  aria-label="Location"
                  title="Location"
                >
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <span className="text-base sm:text-lg font-semibold text-[#3B2A60]">
                  Vadodara, Gujarat, India
                </span>
              </div>

              {/* Email (Plain Text) */}
              <div className="flex items-center gap-4 group">
                <div 
                  className="w-12 h-12 rounded-2xl bg-[#D93025] text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-md"
                  aria-label="Email address"
                  title="Email"
                >
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <span className="text-base sm:text-lg font-semibold text-[#3B2A60]">
                  adi209@gmail.com
                </span>
              </div>

              {/* Phone (Plain Text) */}
              <div className="flex items-center gap-4 group">
                <div 
                  className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-md"
                  aria-label="Phone number"
                  title="Phone"
                >
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <span className="text-base sm:text-lg font-semibold text-[#3B2A60]">
                  +91 9638180959
                </span>
              </div>

              {/* LinkedIn */}
              <div className="flex items-center gap-4 group">
                <div 
                  className="w-12 h-12 rounded-2xl bg-[#0A66C2] text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-md"
                  aria-label="LinkedIn profile"
                  title="LinkedIn"
                >
                  <Linkedin className="w-6 h-6 text-white" />
                </div>
                <a 
                  href="https://www.linkedin.com/in/amit-kadia" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-base sm:text-lg font-semibold text-[#3B2A60] hover:text-[#0A66C2] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2] rounded-md"
                >
                  linkedin.com/in/amit-kadia
                </a>
              </div>

              {/* Work Preference */}
              <div className="flex items-center gap-4 group">
                <div 
                  className="w-12 h-12 rounded-2xl bg-[#4F4A8A] text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-md"
                  aria-label="Work preference"
                  title="Work Preference"
                >
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <span className="text-base sm:text-lg font-semibold text-[#3B2A60]">
                  Open to full-time and part-time remote opportunities
                </span>
              </div>
            </div>
          </div>

          {/* Contact Form Container */}
          <div className="bg-[#E2D8FA] rounded-3xl p-8 border border-[#3B2A60]/20 shadow-xl">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Hidden Honeypot Field for Bot Defense */}
              <input
                type="text"
                name="website_hp"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />

              <div className="space-y-2">
                <label htmlFor="contact-name" className="text-sm font-bold text-[#3B2A60]">
                  Name
                </label>
                <Input
                  id="contact-name"
                  placeholder="Your Name"
                  maxLength={100}
                  autoComplete="name"
                  aria-invalid={!!form.formState.errors.name}
                  aria-describedby={form.formState.errors.name ? "name-error" : undefined}
                  className="bg-[#F3EEFC] border-[#3B2A60]/30 text-[#3B2A60] placeholder:text-[#57417A]/60 focus:border-[#3B2A60] h-12"
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p id="name-error" className="text-destructive text-xs">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-email" className="text-sm font-bold text-[#3B2A60]">
                  Email
                </label>
                <Input
                  id="contact-email"
                  placeholder="your@email.com"
                  type="email"
                  maxLength={254}
                  autoComplete="email"
                  inputMode="email"
                  aria-invalid={!!form.formState.errors.email}
                  aria-describedby={form.formState.errors.email ? "email-error" : undefined}
                  className="bg-[#F3EEFC] border-[#3B2A60]/30 text-[#3B2A60] placeholder:text-[#57417A]/60 focus:border-[#3B2A60] h-12"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p id="email-error" className="text-destructive text-xs">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-sm font-bold text-[#3B2A60]">
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  placeholder="How can I help you?"
                  maxLength={3000}
                  autoComplete="off"
                  aria-invalid={!!form.formState.errors.message}
                  aria-describedby={form.formState.errors.message ? "message-error" : undefined}
                  className="bg-[#F3EEFC] border-[#3B2A60]/30 text-[#3B2A60] placeholder:text-[#57417A]/60 focus:border-[#3B2A60] min-h-[150px] resize-none"
                  {...form.register("message")}
                />
                {form.formState.errors.message && (
                  <p id="message-error" className="text-destructive text-xs">
                    {form.formState.errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSending}
                className="w-full h-12 bg-[#3B2A60] hover:bg-[#2E214B] text-[#F3EEFC] text-lg font-semibold shadow-lg transition-all"
              >
                {isSending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
