export interface OutletSpec {
  label: string;
  value: string;
}

export interface OutletImage {
  src: string;
  alt: string;
}

export interface OutletDescriptionBlock {
  heading?: string;
  body: string;
}

export interface OutletProduct {
  slug: string;
  handle: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  hook: string;
  priceNoTax: number;
  priceWithTax: number;
  priceNoTaxDisplay: string;
  priceWithTaxDisplay: string;
  stock: number;
  bullets: string[];
  descriptionLead: string;
  descriptionBlocks: OutletDescriptionBlock[];
  specs: OutletSpec[];
  disclaimer: string;
  /**
   * Real photos go here once available, in this exact order: 01 pantalla
   * encendida (portada), 02 frontal apagada, 03 ángulo 3/4, 04 puertos
   * traseros, 05 etiqueta de modelo/serie, 06 caja + accesorios. Paths are
   * pre-wired to /public/images/products/<slug>/ — drop files there with the
   * names below and they appear automatically; until then the card/ficha
   * show a neutral placeholder instead of a broken image.
   */
  images: OutletImage[];
  metaDescription: string;
  weightKg: number;
  vendor: string;
  productType: string;
  googleCategory: string;
  tags: string[];
}

const SHARED_TAGS = [
  "LG",
  "digital signage",
  "pantalla comercial",
  "monitor comercial",
  "4K UHD",
  "webOS",
  "señalización digital",
  "publicidad",
  "restaurante",
  "retail",
  "última unidad",
];

const ATSC_DISCLAIMER =
  "El sintonizador de este equipo es ATSC (norma de Estados Unidos), por lo que no capta señal de TV abierta ecuatoriana. Funciona sin problema con HDMI, USB, decodificador de cable o TV box.";

export const OUTLET_PRODUCTS: OutletProduct[] = [
  {
    slug: "lg-43",
    handle: "lg-43-monitor-comercial-digital-signage-4k",
    title: "LG 43'' Monitor Comercial 4K UHD — Diseñado para trabajar 16 horas al día",
    shortTitle: "LG 43'' Digital Signage 4K UHD — Última unidad",
    metaTitle: "LG 43'' UR340C Digital Signage 4K UHD | Monitor Comercial webOS",
    hook: "No es un televisor de casa. Es una pantalla profesional pensada para estar encendida todo el día en tu negocio. Nueva, sellada, última unidad.",
    priceNoTax: 933.0,
    priceWithTax: 1072.95,
    priceNoTaxDisplay: "USD 933,00",
    priceWithTaxDisplay: "USD 1.072,95",
    stock: 1,
    bullets: [
      "4K UHD real (3840 × 2160) con HDR10 — precios, menús y textos nítidos incluso de cerca",
      "Uso comercial 16 horas al día / 7 días a la semana, hasta 30.000 horas de vida útil",
      "webOS 6.0: reproduce tu contenido desde un USB en bucle, sin PC ni reproductor externo",
      "Programador horario: se enciende y apaga sola según el horario de tu local",
      "2× HDMI, LAN RJ45, RS-232C y salida de audio óptica",
      "Montaje VESA 200 × 200 mm — horizontal o vertical, con cualquier soporte estándar",
      "Producto nuevo y sellado, con control remoto y cable de poder",
    ],
    descriptionLead: "Pantalla comercial LG 43'' 4K UHD — Serie UR340C",
    descriptionBlocks: [
      {
        body: "Si tu negocio necesita una pantalla encendida todo el día, un televisor doméstico no es la respuesta: se calienta, pierde brillo y la garantía no cubre uso comercial. Esta LG es un monitor de señalización digital diseñado por LG para uso profesional, con soporte para 16 horas diarias, 7 días a la semana y una vida útil de hasta 30.000 horas.",
      },
      {
        heading: "Imagen que vende",
        body: "Panel 4K UHD (3840 × 2160) con HDR10 y 300 nits de brillo. Tus fotos de producto, menús y promociones se ven con detalle y color real, incluso a corta distancia. Ideal para restaurantes, farmacias, gimnasios, retail, salas de espera, hoteles, consultorios y oficinas.",
      },
      {
        heading: "Sin computador, sin complicaciones",
        body: "Con webOS 6.0 integrado, conectas un USB con tus imágenes o videos y la pantalla los reproduce en bucle automáticamente. Incluye programador horario para que encienda y apague sola con el horario de tu local, y pantalla de bienvenida personalizable.",
      },
      {
        heading: "Instalación flexible",
        body: "Perfil ultradelgado de 5,7 cm y montaje VESA 200 × 200 mm: la instalas horizontal o vertical, en pared o en pedestal, con soportes estándar del mercado.",
      },
    ],
    specs: [
      { label: "Pantalla", value: "43'' clase (42,5'' reales / 107,9 cm)" },
      { label: "Resolución", value: "4K UHD 3840 × 2160 · HDR10 / HLG" },
      { label: "Brillo", value: "300 nits · Contraste 1200:1" },
      { label: "Sistema", value: "webOS 6.0" },
      { label: "Audio", value: "2 parlantes de 10 W" },
      { label: "Conexiones", value: "2× HDMI, RJ45 (LAN), RS-232C, salida óptica, RF" },
      { label: "Montaje", value: "VESA 200 × 200 mm" },
      { label: "Medidas", value: "967 × 564 × 57,1 mm · Peso: 8,8 kg" },
      { label: "Alimentación", value: "120 V (compatible con la red eléctrica de Ecuador)" },
      { label: "Incluye", value: "Control remoto y cable de poder" },
      { label: "Estado", value: "Nuevo, en caja sellada" },
    ],
    disclaimer: ATSC_DISCLAIMER,
    images: [
      { src: "/images/products/lg-43/01-front.webp", alt: "Monitor comercial LG 43 pulgadas 4K UHD digital signage vista frontal" },
      { src: "/images/products/lg-43/03-angle.webp", alt: "Comparativo de grosor del monitor LG 43 pulgadas: 57,5 mm de perfil ultradelgado" },
    ],
    metaDescription:
      "Monitor comercial LG 43'' 4K UHD con webOS, diseñado para uso 16 horas al día. Ideal para restaurantes, retail y oficinas. Nuevo y sellado. Última unidad.",
    weightKg: 11,
    vendor: "LG",
    productType: "Monitor comercial / Digital Signage",
    googleCategory: "Electronics > Video > Computer Monitors",
    tags: SHARED_TAGS,
  },
  {
    slug: "lg-50",
    handle: "lg-50-monitor-comercial-digital-signage-4k-400nits",
    title: "LG 50'' Monitor Comercial 4K UHD — Más pantalla, más brillo, uso 16/7",
    shortTitle: "LG 50'' Digital Signage 4K UHD 400 nits — Última unidad",
    metaTitle: "LG 50'' UR340C Digital Signage 4K UHD 400 nits | Monitor Comercial",
    hook: "400 nits de brillo para que tu contenido se vea incluso en locales con mucha luz. Pantalla profesional, nueva y sellada. Última unidad.",
    priceNoTax: 1117.0,
    priceWithTax: 1284.55,
    priceNoTaxDisplay: "USD 1.117,00",
    priceWithTaxDisplay: "USD 1.284,55",
    stock: 1,
    bullets: [
      "4K UHD real (3840 × 2160) con HDR10 en 50 pulgadas",
      "400 nits de brillo — se ve nítida incluso en locales con luz natural o vitrinas",
      "Uso comercial 16 horas al día / 7 días a la semana, hasta 30.000 horas de vida útil",
      "webOS 6.0: reproduce tu contenido desde un USB en bucle, sin PC ni reproductor externo",
      "Programador horario automático según el horario de tu negocio",
      "2× HDMI, LAN RJ45, RS-232C y salida de audio óptica",
      "Montaje VESA 200 × 200 mm — horizontal o vertical",
      "Producto nuevo y sellado, con control remoto y cable de poder",
    ],
    descriptionLead: "Pantalla comercial LG 50'' 4K UHD — Serie UR340C",
    descriptionBlocks: [
      {
        body: "Siete pulgadas más de superficie visible y un salto real de brillo frente al modelo de 43''. Es la opción correcta cuando la pantalla se ve desde lejos o el local tiene mucha luz: vitrinas, salones amplios, recepciones, food courts, patios de comida y salas de espera grandes.",
      },
      {
        heading: "Brillo pensado para locales reales",
        body: 'Con 400 nits de brillo, el contenido no se "lava" con la luz natural que entra por la vitrina. Panel 4K UHD (3840 × 2160) con HDR10: colores intensos y negros profundos para que tus promociones se vean como las diseñaste.',
      },
      {
        heading: "Diseñada para no apagarse",
        body: "No es un televisor forzado a trabajar de más. LG la certifica para 16 horas diarias, 7 días a la semana, con una vida útil de hasta 30.000 horas. Además tiene programador horario para que encienda y apague sola, y modo de ahorro de energía.",
      },
      {
        heading: "Contenido sin PC",
        body: "webOS 6.0 integrado: conectas un USB con tus imágenes o videos y la pantalla los reproduce en bucle. Si más adelante tienes varias pantallas, es compatible con software de gestión centralizada LG SuperSign Control.",
      },
    ],
    specs: [
      { label: "Pantalla", value: "50'' clase (49,5'' reales / 125,7 cm)" },
      { label: "Resolución", value: "4K UHD 3840 × 2160 · HDR10 / HLG" },
      { label: "Brillo", value: "400 nits" },
      { label: "Sistema", value: "webOS 6.0" },
      { label: "Audio", value: "2 parlantes de 10 W" },
      { label: "Conexiones", value: "2× HDMI, RJ45 (LAN), RS-232C, salida óptica, RF" },
      { label: "Montaje", value: "VESA 200 × 200 mm" },
      { label: "Medidas", value: "1.121 × 651 × 57,1 mm · Peso: 11,7 kg" },
      { label: "Alimentación", value: "120 V (compatible con la red eléctrica de Ecuador)" },
      { label: "Incluye", value: "Control remoto y cable de poder" },
      { label: "Estado", value: "Nuevo, en caja sellada" },
    ],
    disclaimer: ATSC_DISCLAIMER,
    images: [
      { src: "/images/products/lg-50/01-front.webp", alt: "Monitor comercial LG 50 pulgadas 4K UHD digital signage 400 nits vista frontal" },
      { src: "/images/products/lg-50/03-angle.webp", alt: "Comparativo de grosor del monitor LG 50 pulgadas: 57,5 mm de perfil ultradelgado" },
    ],
    metaDescription:
      "Monitor comercial LG 50'' 4K UHD 400 nits con webOS, uso 16/7. Para vitrinas, retail y locales con mucha luz. Nuevo y sellado. Última unidad.",
    weightKg: 14.6,
    vendor: "LG",
    productType: "Monitor comercial / Digital Signage",
    googleCategory: "Electronics > Video > Computer Monitors",
    tags: SHARED_TAGS,
  },
];

export function getOutletProduct(slug: string): OutletProduct | undefined {
  return OUTLET_PRODUCTS.find((p) => p.slug === slug);
}
