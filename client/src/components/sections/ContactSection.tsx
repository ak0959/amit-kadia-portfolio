import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "emailjs-com";
import { Linkedin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { insertMessageSchema, type InsertMessage } from "@/types/contact";
import { contactSection as c } from "@/data/portfolio.mock";
import { ResumeSection } from "@/components/sections/ResumeSection";

const SUBJECT = "New Portfolio Enquiry — Amit Kadia";

type Status = { kind: "idle" } | { kind: "success" } | { kind: "error"; text: string };

const escapeHtml = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

function ContactForm() {
  const [isSending, setIsSending] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const inFlight = useRef(false); // synchronous guard: state updates are async, so double-clicks could slip past `disabled`

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: { name: "", email: "", message: "" },
  });
  const errors = form.formState.errors;

  const onSubmit = async (data: InsertMessage) => {
    if (inFlight.current) return;

    // Automated bot submissions fill the hidden honeypot: drop them silently, send nothing.
    if (honeypot.trim() !== "") {
      form.reset();
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      // Configuration problem: never claim success, never show internals to visitors.
      if (import.meta.env.DEV) console.warn("Contact form: VITE_EMAILJS_SERVICE_ID / TEMPLATE_ID / PUBLIC_KEY are not set.");
      setStatus({ kind: "error", text: "Your message could not be sent right now. Please try again later or contact me by email or phone." });
      return;
    }

    inFlight.current = true;
    setIsSending(true);
    setStatus({ kind: "idle" });

    try {
      const res = await emailjs.send(
        serviceId,
        templateId,
        {
          subject: SUBJECT,
          from_name: data.name,
          from_email: data.email,
          reply_to: data.email,
          message: data.message,
          // HTML-escaped copy with line breaks preserved, for templates that render {{{message_html}}}.
          message_html: escapeHtml(data.message).replace(/\r?\n/g, "<br>"),
        },
        publicKey,
      );
      if (res.status !== 200) throw new Error("EmailJS did not accept the message");

      form.reset();
      setStatus({ kind: "success" });
    } catch {
      // Keep what the visitor typed so they can retry.
      setStatus({ kind: "error", text: "Something went wrong and your message was not sent. Please try again in a moment." });
    } finally {
      inFlight.current = false;
      setIsSending(false);
    }
  };

  return (
    <div className="rt-form-card">
      <h3>{c.formTitle}</h3>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Hidden honeypot field for bot defence */}
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

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="contact-name">Name</label>
            <Input
              id="contact-name"
              placeholder="Your Name"
              maxLength={100}
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className="rt-field h-12"
              {...form.register("name")}
            />
            {errors.name && <p id="name-error" className="text-destructive text-xs">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="contact-email">Email</label>
            <Input
              id="contact-email"
              placeholder="your@email.com"
              type="email"
              maxLength={254}
              autoComplete="email"
              inputMode="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="rt-field h-12"
              {...form.register("email")}
            />
            {errors.email && <p id="email-error" className="text-destructive text-xs">{errors.email.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="contact-message">Message</label>
          <Textarea
            id="contact-message"
            placeholder="How can I help you?"
            maxLength={3000}
            autoComplete="off"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className="rt-field min-h-[130px] resize-none"
            {...form.register("message")}
          />
          {errors.message && <p id="message-error" className="text-destructive text-xs">{errors.message.message}</p>}
        </div>

        <Button
          type="submit"
          disabled={isSending}
          aria-busy={isSending}
          className="w-full h-12 text-base font-semibold shadow-lg"
          style={{ background: "linear-gradient(180deg,#f06450,#df4a36)", color: "#fff", borderColor: "#d6422e" }}
        >
          {isSending ? "Sending..." : "Send Message"}
        </Button>

        <div className="rt-form-status" role="status" aria-live="polite">
          {status.kind === "success" && <p className="ok">Thank you for reaching out! Your message has been sent and I'll get back to you soon.</p>}
          {status.kind === "error" && <p className="err">{status.text}</p>}
        </div>
      </form>
    </div>
  );
}

export function ContactSection() {
  return (
    <section className="rt-sec rt-merge" style={{ paddingBottom: 48 }}>
      <div className="rt-wrap rt-rc">
        <ResumeSection />

        <div id="contact" className="rt-rc-right">
          <div className="rt-contact-top">
            <div>
              <span className="rt-pill">{c.label}</span>
              <h2 className="rt-display rt-h2" style={{ fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)" }}>{c.title}</h2>
              <p style={{ fontSize: "0.85rem", margin: 0 }}>{c.description} Based in {c.location}.</p>
            </div>

            <ul className="rt-contact-rows">
              <li>
                <span className="rt-ic" style={{ background: "#e8553e" }}><Phone aria-hidden="true" /></span>
                <span>
                  <a href={c.phoneHref}>{c.phone}</a>
                  <a className="rt-wa" href={c.whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                </span>
              </li>
              <li>
                <span className="rt-ic" style={{ background: "#1d9a86" }}><Mail aria-hidden="true" /></span>
                <a href={`mailto:${c.email}`}>{c.email}</a>
              </li>
              <li>
                <span className="rt-ic" style={{ background: "#2d6cc0" }}><Linkedin aria-hidden="true" /></span>
                <a href={c.linkedinHref} target="_blank" rel="noopener noreferrer">{c.linkedinLabel}</a>
              </li>
            </ul>

            <div className="rt-scene">
              <img className="scene" src={c.scene} alt="" aria-hidden="true" width={490} height={270} loading="lazy" />
              <div className="rt-note" aria-hidden="true">
                <img src={c.stickyNote} alt="" width={180} height={150} loading="lazy" />
                <span>{c.stickyText}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: the form, centred under both columns */}
        <div className="rt-rc-form">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
