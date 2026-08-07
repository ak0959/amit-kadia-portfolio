import { useState, useEffect } from "react";
import { Menu, X, Download, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 2.159.684 4.159 1.854 5.804L2 22l4.316-1.77A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.804 0-3.488-.475-4.948-1.306l-.354-.202-2.569 1.052 1.069-2.502-.224-.366A7.954 7.954 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
    </svg>
  );
}

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Certifications", href: "#certifications" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled ? "bg-[#F6F3EC]/90 backdrop-blur-md shadow-sm border-[#C8D3CC] py-3.5" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center w-full">
          {/* Left-Aligned Desktop Navigation Links (15px font) */}
          <div className="hidden md:flex items-center space-x-7">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-[15px] font-semibold text-[#172536] hover:text-[#24756D] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right-Aligned Action Group: LinkedIn -> WhatsApp -> Download CV */}
          <div className="hidden md:flex items-center space-x-2.5">
            {/* LinkedIn Icon Button */}
            <a
              href="https://www.linkedin.com/in/amit-kadia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Amit Kadia LinkedIn profile"
              className="w-9 h-9 rounded-full bg-[#0A66C2] text-white hover:bg-[#004182] hover:scale-105 hover:shadow-[0_4px_12px_rgba(10,102,194,0.35)] transition-all flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2] focus-visible:ring-offset-2"
            >
              <Linkedin className="w-4 h-4 text-white" />
            </a>

            {/* WhatsApp Icon Button */}
            <a
              href="https://wa.me/919638180959"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Amit Kadia on WhatsApp"
              className="w-9 h-9 rounded-full bg-[#25D366] text-white hover:bg-[#1DA851] hover:scale-105 hover:shadow-[0_4px_12px_rgba(37,211,102,0.35)] transition-all flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
            >
              <WhatsappIcon className="text-white" />
            </a>

            {/* Spacing Gap before Download CV */}
            <div className="pl-1.5">
              <Button
                size="sm"
                variant="outline"
                className="rounded-full px-5 border-[#172536] bg-[#F6F3EC] hover:bg-[#172536] text-[#172536] hover:text-[#F8FAFC] font-semibold text-xs transition-colors"
                asChild
              >
                <a 
                  href="/documents/resume/Amit%20Kadia%20-%20New.pdf" 
                  download="Amit-Kadia-Resume.pdf" 
                  target="_blank"
                >
                  <Download className="mr-1.5 w-3.5 h-3.5" /> Download CV
                </a>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#172536] ml-auto"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#F6F3EC] border-b border-[#C8D3CC] p-4 shadow-lg animate-in slide-in-from-top-5">
          <div className="flex flex-col space-y-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-lg font-semibold text-[#172536] py-2 border-b border-[#C8D3CC]/50 last:border-0 hover:text-[#24756D]"
              >
                {item.label}
              </a>
            ))}

            {/* Mobile Social & Download Action Row */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/amit-kadia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Amit Kadia LinkedIn profile"
                className="w-10 h-10 rounded-full bg-[#0A66C2] text-white hover:bg-[#004182] transition-all flex items-center justify-center shadow-sm"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>

              <a
                href="https://wa.me/919638180959"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Amit Kadia on WhatsApp"
                className="w-10 h-10 rounded-full bg-[#25D366] text-white hover:bg-[#1DA851] transition-all flex items-center justify-center shadow-sm"
              >
                <WhatsappIcon className="text-white" />
              </a>

              <Button
                variant="outline"
                className="flex-1 rounded-full border-[#172536] bg-[#F6F3EC] hover:bg-[#172536] text-[#172536] hover:text-[#F8FAFC] font-semibold transition-colors"
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
          </div>
        </div>
      )}
    </nav>
  );
}
