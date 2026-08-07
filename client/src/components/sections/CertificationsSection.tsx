import { useState, useRef, lazy, Suspense } from "react";
import { Eye, ShieldAlert } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CERTIFICATIONS_DATA } from "@/data/certifications";
import { CertificationItem } from "@/types/portfolio";

// Lazy load certificate modal for optimal performance
const CertificateModal = lazy(() => import("./CertificateModal").then(module => ({ default: module.CertificateModal })));

export function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const handleOpenModal = (cert: CertificationItem) => {
    setSelectedCert(cert);
  };

  const handleCloseModal = () => {
    const certId = selectedCert?.id;
    setSelectedCert(null);
    if (certId) {
      setTimeout(() => {
        cardRefs.current.get(certId)?.focus();
      }, 50);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, cert: CertificationItem) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpenModal(cert);
    }
  };

  return (
    <section id="certifications" className="py-24 bg-[#F6F3EC] border-t border-[#C8D3CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Certifications"
          title="Professional Credentials"
          description="Industry-recognized certifications that validate my expertise and commitment to excellence."
          centered
        />

        <div className="mt-16">
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {CERTIFICATIONS_DATA.map((cert) => {
                const accent = cert.accentColor || "#172536";

                return (
                  <CarouselItem key={cert.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-2 h-full">
                      <div
                        ref={(el) => {
                          if (el) cardRefs.current.set(cert.id, el);
                        }}
                        tabIndex={0}
                        role="button"
                        aria-label={`View certificate: ${cert.title} issued by ${cert.provider}`}
                        onClick={() => handleOpenModal(cert)}
                        onKeyDown={(e) => handleKeyDown(e, cert)}
                        className="group cursor-pointer h-full outline-none focus-visible:ring-2 focus-visible:ring-[#172536] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F3EC] rounded-2xl"
                      >
                        <Card
                          style={{
                            borderTopColor: accent,
                            borderTopWidth: "4px"
                          }}
                          className="h-full bg-[#FFFFFF] hover:bg-[#F4F7F5] border border-[#C8D3CC] hover:border-[#24756D] shadow-lg hover:shadow-[0_12px_32px_rgba(23,37,54,0.12)] transition-all duration-300 transform group-hover:-translate-y-1.5 flex flex-col overflow-hidden"
                        >
                          <CardContent className="p-5 flex flex-col h-full">
                            {/* Fixed Aspect Thumbnail Container */}
                            <div className="relative w-full h-52 bg-[#F6F3EC] rounded-xl overflow-hidden mb-4 flex items-center justify-center p-2 border border-[#D8DFDA]">
                              <img
                                src={cert.image}
                                alt=""
                                loading="lazy"
                                decoding="async"
                                className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                              />

                              {/* View Certificate Hover Overlay */}
                              <div className="absolute inset-0 bg-[#172536]/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-[#F8FAFC] font-semibold text-sm">
                                <Eye className="w-5 h-5 text-[#F8FAFC]" />
                                <span>View Certificate</span>
                              </div>
                            </div>

                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <h3 className="text-base font-bold text-[#172536] mb-1 line-clamp-2 group-hover:text-[#24756D] transition-colors">
                                  {cert.title}
                                </h3>
                                <p
                                  style={{ color: accent }}
                                  className="text-xs font-bold mb-2"
                                >
                                  {cert.provider}
                                </p>
                              </div>
                              {cert.description && (
                                <p className="text-[#52606D] text-xs line-clamp-2 mt-1">
                                  {cert.description}
                                </p>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="bg-[#172536] border-none text-[#F8FAFC] hover:bg-[#24756D] hover:text-white" />
            <CarouselNext className="bg-[#172536] border-none text-[#F8FAFC] hover:bg-[#24756D] hover:text-white" />
          </Carousel>

          {/* Privacy & Misuse Notice */}
          <div className="mt-12 max-w-3xl mx-auto p-4 rounded-xl bg-[#E8EFEA] border border-[#C8D3CC] flex items-center gap-3 text-[#52606D] text-xs sm:text-sm shadow-sm">
            <ShieldAlert className="w-5 h-5 text-[#24756D] flex-shrink-0" />
            <p className="font-medium">
              These certificates are displayed solely for professional verification. Copying, downloading, altering, reproducing, or misrepresenting any certificate or credential is strictly prohibited.
            </p>
          </div>
        </div>
      </div>

      {/* Controlled Lazy Loaded Certificate Modal */}
      {selectedCert && (
        <Suspense fallback={null}>
          <CertificateModal
            certificate={selectedCert}
            onClose={handleCloseModal}
          />
        </Suspense>
      )}
    </section>
  );
}
