import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { ProductSection } from "@/components/landing/product-section";
import { ServicesSection } from "@/components/landing/services-section";
import { MetricsSection } from "@/components/landing/metrics-section";
import { CtaSection } from "@/components/landing/cta-section";
import { OutletProductsSection } from "@/components/landing/outlet-products-section";
import { ProcessTimelineSection } from "@/components/landing/process-timeline-section";
import { BulkBanner } from "@/components/landing/bulk-banner";
import { FooterSection } from "@/components/landing/footer-section";
import { WhatsappFloat } from "@/components/landing/whatsapp-float";
import { BrandRevealScroll } from "@/components/ui/text-scroll-animation";
import { DOMESTICAS, SEMIPROFESIONALES, PROFESIONALES, POC } from "@/components/landing/catalog-data";
import { organizationSchema, allProductSchemas } from "@/lib/structured-data";

export default function Home() {
  const jsonLd = [organizationSchema(), ...allProductSchemas()];

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <HeroSection />
      <ProductSection
        id="domesticas"
        catalogNumber="01"
        titleTop="RADIOS"
        titleBottom="DOMÉSTICAS"
        tagline="USO PERSONAL / FAMILIAR / PRIMER CONTACTO CON RADIOCOMUNICACIÓN"
        items={DOMESTICAS}
      />
      <ProductSection
        id="semiprofesionales"
        catalogNumber="02"
        titleTop="RADIOS"
        titleBottom="SEMIPROFESIONALES"
        tagline="EQUIPOS DE ENTRADA / OPERACIÓN DIARIA / BUEN COSTO-BENEFICIO"
        items={SEMIPROFESIONALES}
      />
      <ProductSection
        id="profesionales"
        catalogNumber="03"
        titleTop="RADIOS"
        titleBottom="PROFESIONALES"
        tagline="HASTA 260 CANALES / DIGITAL DMR / MÁXIMA DURABILIDAD"
        items={PROFESIONALES}
      />
      <BulkBanner />
      <ProductSection
        id="poc"
        catalogNumber="04"
        titleTop="EQUIPOS"
        titleBottom="POC · PUSH TO TALK"
        tagline="RED CELULAR 4G/LTE / SIN LÍMITE DE DISTANCIA / GPS"
        items={POC}
      />
      <BrandRevealScroll />
      <ServicesSection />
      <MetricsSection />
      <ProcessTimelineSection />
      <OutletProductsSection />
      <CtaSection />
      <FooterSection />
      <WhatsappFloat />
    </main>
  );
}
