/**
 * Carta de presentación institucional — se adjunta automáticamente en la
 * respuesta automática cuando un visitante marca "Proyecto corporativo /
 * empresa grande" en el formulario de contacto. Registro único de esta
 * copia: si cambia el posicionamiento de la empresa, actualizar solo aquí.
 */
export const COMPANY_LETTER_TEXT = `Estimados,

Gracias por su interés en OMNI COMUNICACIONES. Nos presentamos brevemente:

Somos distribuidores oficiales de radios Motorola, Kenwood e ICOM, además de equipos POC RugGear con cobertura celular 4G/LTE, con 20 años de trayectoria como aliado tecnológico en radiocomunicación profesional en Ecuador.

Trabajamos con clientes corporativos como PRONACA, TIA, Corporación El Rosado, Liderman, Hotel Marriott y otras empresas líderes a nivel nacional, en sectores que van desde retail y manufactura hasta seguridad privada y hospitalidad.

Lo que ofrecemos a proyectos corporativos:
- Catálogo completo: desde radios de entrada hasta equipos profesionales DMR y POC de largo alcance.
- Precios escalonados por volumen, con cotización personalizada según cantidad de equipos.
- Programación de frecuencias incluida sin costo adicional, equipos listos para operar.
- Garantía oficial y soporte técnico local, con repuestos disponibles en Ecuador.
- Facturación empresarial con IVA y opción de crédito para empresas.
- Instalación de infraestructura (torres, repetidoras, sistemas de puesta a tierra) para ampliar cobertura real en campo.

Quedamos atentos a conocer el alcance de su proyecto — cantidad de equipos, tipo de operación y cobertura necesaria — para preparar una propuesta a la medida.

Saludos cordiales,
Equipo OMNI COMUNICACIONES
+593 99 659 0777 · negocios@omnitronec.com`;

export const COMPANY_LETTER_HTML = COMPANY_LETTER_TEXT
  .split("\n\n")
  .map((block) => {
    if (block.startsWith("- ")) {
      const items = block.split("\n").map((line) => `<li>${line.replace(/^- /, "")}</li>`).join("");
      return `<ul>${items}</ul>`;
    }
    return `<p>${block.replace(/\n/g, "<br>")}</p>`;
  })
  .join("\n");
