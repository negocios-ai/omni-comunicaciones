import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata: Metadata = {
  title: "Términos y Condiciones — OMNI COMUNICACIONES",
  description: "Condiciones de uso del sitio y de compra de equipos OMNI COMUNICACIONES.",
};

const linkClass = "text-primary underline underline-offset-2 hover:text-primary-hover";

export default function TerminosPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navigation />
      <article className="max-w-[820px] mx-auto px-6 lg:px-12 pt-32 pb-24">
        <span className="sys-tag mb-4 block">LEGAL</span>
        <h1 className="font-display text-4xl lg:text-5xl text-foreground leading-[0.95] tracking-tight mb-2">
          Términos y Condiciones
        </h1>
        <p className="font-mono text-[0.625rem] text-muted-foreground tracking-widest uppercase mb-10">
          Última actualización: agosto 2026
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground [&_h2]:font-display [&_h2]:text-foreground [&_h2]:text-xl [&_h2]:mb-3 [&_h2]:tracking-tight [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
          <section>
            <h2>1. Sobre este sitio</h2>
            <p>
              Este sitio es un catálogo informativo de <strong>OMNI COMUNICACIONES</strong>,
              distribuidor de radios Motorola, Kenwood, ICOM y equipos POC RugGear en Ecuador. La
              navegación y el uso del sitio implican la aceptación de estos términos.
            </p>
          </section>

          <section>
            <h2>2. Precios y disponibilidad</h2>
            <p>
              Los precios mostrados están expresados en dólares de Estados Unidos (USD) y no
              incluyen IVA salvo que se indique lo contrario. Los precios, especificaciones y
              disponibilidad de stock pueden cambiar sin previo aviso y se confirman de forma
              definitiva al momento de generar tu cotización por WhatsApp, correo o formulario de
              contacto. Los productos marcados como "última unidad" están sujetos a disponibilidad
              real de inventario.
            </p>
          </section>

          <section>
            <h2>3. Cómo se cierra una compra</h2>
            <p>
              Este sitio no procesa pagos ni compras en línea. Toda cotización, negociación, acuerdo
              de condiciones, pago, facturación y despacho se coordina directamente con nuestro
              equipo por WhatsApp, correo electrónico o el formulario de contacto — como se describe
              en la sección "Cómo comprar" de la página principal. La compra se entiende
              formalizada únicamente cuando ambas partes confirman el pedido y sus condiciones.
            </p>
          </section>

          <section>
            <h2>4. Garantía</h2>
            <p>
              Cada equipo indica su tiempo de garantía en su ficha de producto. La garantía cubre
              defectos de fábrica bajo uso normal y se gestiona conforme a las políticas del
              fabricante y de OMNI COMUNICACIONES. No cubre daños por mal uso, humedad, caídas,
              manipulación no autorizada o desgaste normal por el tiempo de vida útil estimado del
              equipo.
            </p>
          </section>

          <section>
            <h2>5. Envíos</h2>
            <p>
              Realizamos envíos a nivel nacional a través de Servientrega o cooperativas de
              transporte. Los tiempos y costos de envío se coordinan según destino al momento de
              confirmar tu pedido.
            </p>
          </section>

          <section>
            <h2>6. Propiedad intelectual y marcas</h2>
            <p>
              Motorola, Kenwood, ICOM y RugGear son marcas registradas de sus respectivos
              propietarios. OMNI COMUNICACIONES es distribuidor autorizado de estos equipos; el uso
              de estas marcas en este sitio es únicamente con fines informativos y de
              identificación de producto, y no implica afiliación corporativa más allá de la
              relación comercial de distribución.
            </p>
          </section>

          <section>
            <h2>7. Uso del sitio</h2>
            <p>
              El contenido de este sitio (textos, imágenes propias, diseño) es propiedad de OMNI
              COMUNICACIONES y no puede reproducirse con fines comerciales sin autorización. La
              información publicada es de carácter general y puede contener imprecisiones; en caso
              de duda sobre especificaciones técnicas, contáctanos antes de tomar una decisión de
              compra.
            </p>
          </section>

          <section>
            <h2>8. Datos personales</h2>
            <p>
              El tratamiento de tus datos personales cuando nos contactas se describe en nuestra{" "}
              <a href="/privacidad" className={linkClass}>
                Política de Privacidad
              </a>
              .
            </p>
          </section>

          <section>
            <h2>9. Cambios a estos términos</h2>
            <p>
              Podemos actualizar estos términos conforme el sitio y nuestra operación evolucionen.
              Publicaremos cualquier cambio en esta misma página junto con la fecha de
              actualización.
            </p>
          </section>
        </div>
      </article>
      <FooterSection />
    </main>
  );
}
