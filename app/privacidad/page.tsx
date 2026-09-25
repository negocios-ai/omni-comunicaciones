import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { OG_DEFAULTS, SITE_URL } from "@/lib/site-config";

const TITLE = "Política de Privacidad — OMNI COMUNICACIONES";
const DESCRIPTION = "Cómo OMNI COMUNICACIONES recopila, usa y protege tu información.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/privacidad` },
  openGraph: { ...OG_DEFAULTS, title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/privacidad`, type: "website" },
};

const linkClass = "text-primary underline underline-offset-2 hover:text-primary-hover";

export default function PrivacidadPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navigation />
      <article className="max-w-[820px] mx-auto px-6 lg:px-12 pt-32 pb-24">
        <span className="sys-tag mb-4 block">LEGAL</span>
        <h1 className="font-display text-4xl lg:text-5xl text-foreground leading-[0.95] tracking-tight mb-2">
          Política de Privacidad
        </h1>
        <p className="font-mono text-[0.625rem] text-muted-foreground tracking-widest uppercase mb-10">
          Última actualización: septiembre 2026
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground [&_h2]:font-display [&_h2]:text-foreground [&_h2]:text-xl [&_h2]:mb-3 [&_h2]:tracking-tight [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
          <section>
            <h2>1. Quiénes somos</h2>
            <p>
              <strong>OMNI COMUNICACIONES</strong> es un distribuidor de radios Motorola, Kenwood,
              ICOM y equipos POC RugGear con operación en Ecuador. El sitio lo opera{" "}
              <strong>OMNITRONEC CIA. LTDA.</strong> (RUC 1793226293001), responsable del
              tratamiento de los datos personales que recibimos a través de este sitio, conforme a
              la <strong>Ley Orgánica de Protección de Datos Personales (LOPDP)</strong> de Ecuador.
            </p>
            <p className="mt-3">
              Este sitio y{" "}
              <a href="https://omnitronec.com" className={linkClass}>
                omnitronec.com
              </a>{" "}
              pertenecen a la misma empresa: omnitronec.com es nuestro sitio principal, con todo
              nuestro portafolio, y este sitio se enfoca en radios de comunicación y productos
              destacados. Por eso nuestro correo de contacto usa el dominio omnitronec.com.
            </p>
            <p className="mt-3">
              Dirección: Beethoven E2-34 y Pasaje Debussy, Las Acacias, Quito. Correo:{" "}
              <a href="mailto:negocios@omnitronec.com" className={linkClass}>
                negocios@omnitronec.com
              </a>
              . WhatsApp:{" "}
              <a href="https://wa.me/593996590777" className={linkClass}>
                +593 99 659 0777
              </a>
              .
            </p>
          </section>

          <section>
            <h2>2. Qué información recopilamos</h2>
            <p>Recopilamos datos personales en dos escenarios:</p>
            <ul className="mt-3">
              <li>
                <strong>Formulario de contacto del sitio:</strong> nombre, correo electrónico,
                empresa (opcional), teléfono (opcional), qué necesitas y tu mensaje. Estos datos se
                envían directamente a nuestro correo de negocios a través de un proveedor de envío
                de correo (Resend) — no quedan almacenados en una base de datos propia del sitio.
              </li>
              <li>
                <strong>WhatsApp y correo directo:</strong> cuando nos escribes por esos canales,
                recibimos los datos que tú decides compartir (nombre, número de contacto, empresa y
                el producto de interés).
              </li>
            </ul>
            <p className="mt-3">
              De forma automática, mediante analítica de uso (Vercel Analytics), recopilamos datos
              agregados y anónimos de navegación: qué páginas visitas, qué botones usas (por
              ejemplo, si haces clic en "Cotizar" o en WhatsApp) y métricas de rendimiento. Esta
              información no identifica a personas individuales.
            </p>
          </section>

          <section>
            <h2>3. Para qué usamos tu información</h2>
            <p>
              Usamos los datos de contacto exclusivamente para responder tu cotización o consulta,
              y para enviarte información puntual que tú mismo solicitaste (por ejemplo, nuestra
              carta de presentación si nos escribes como empresa). Los datos analíticos agregados se
              usan para entender qué partes del sitio funcionan mejor y mejorar la experiencia de
              navegación — nunca se venden ni se comparten con terceros con fines publicitarios.
            </p>
          </section>

          <section>
            <h2>4. Con quién compartimos información</h2>
            <p>
              No vendemos ni alquilamos tu información de contacto. La compartimos únicamente con
              proveedores estrictamente necesarios para operar el sitio:
            </p>
            <ul className="mt-3">
              <li>
                <strong>Resend</strong> (envío del correo de contacto) — procesa tu mensaje solo
                para entregarlo a nuestra bandeja de entrada.
              </li>
              <li>
                <strong>Vercel</strong> (hosting y analítica agregada del sitio).
              </li>
            </ul>
            <p className="mt-3">
              Estos proveedores pueden procesar datos en servidores fuera de Ecuador; en ambos
              casos se trata de compañías con políticas de protección de datos propias y con las que
              solo compartimos lo estrictamente necesario para prestar el servicio.
            </p>
          </section>

          <section>
            <h2>5. Cuánto tiempo conservamos tu información</h2>
            <p>
              Conservamos los mensajes de contacto el tiempo necesario para atender tu consulta o
              cotización y, si se concreta una compra, mientras dure la relación comercial y las
              obligaciones legales de garantía o tributarias asociadas. Puedes solicitar su
              eliminación en cualquier momento (ver sección 6).
            </p>
          </section>

          <section>
            <h2>6. Tus derechos</h2>
            <p>
              Conforme a la LOPDP, tienes derecho a acceder, actualizar, rectificar o solicitar la
              eliminación de tus datos personales, así como a oponerte a su tratamiento o revocar tu
              consentimiento. Para ejercer cualquiera de estos derechos, escríbenos a{" "}
              <a href="mailto:negocios@omnitronec.com" className={linkClass}>
                negocios@omnitronec.com
              </a>{" "}
              indicando tu solicitud; te responderemos en un plazo razonable.
            </p>
          </section>

          <section>
            <h2>7. Cookies y analítica</h2>
            <p>
              Este sitio usa Vercel Analytics, una herramienta de analítica sin cookies de
              seguimiento: no identifica visitantes individuales ni se usa con fines publicitarios.
              No usamos cookies de publicidad ni de rastreo entre sitios.
            </p>
          </section>

          <section>
            <h2>8. Menores de edad</h2>
            <p>
              Este sitio está dirigido a personas naturales y empresas que buscan equipos de
              radiocomunicación para uso comercial o personal. No solicitamos ni recopilamos
              intencionalmente datos de menores de edad.
            </p>
          </section>

          <section>
            <h2>9. Cambios a esta política</h2>
            <p>
              Podemos actualizar esta política conforme el sitio evolucione. Publicaremos cualquier
              cambio en esta misma página junto con la fecha de actualización.
            </p>
          </section>
        </div>
      </article>
      <FooterSection />
    </main>
  );
}
