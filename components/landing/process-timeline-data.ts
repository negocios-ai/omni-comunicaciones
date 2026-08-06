import type { ComponentType } from "react";
import {
  ChatBubbleIcon,
  UserCheckIcon,
  FileInvoiceIcon,
  ExchangeArrowsIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  ReceiptIcon,
  TruckIcon,
  HeadsetIcon,
} from "./process-icons";

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: ComponentType;
  colorGroup: "primary" | "amber" | "green";
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "01",
    title: "Contacto inicial",
    description: "Escríbenos por web, WhatsApp, redes o llamada.",
    icon: ChatBubbleIcon,
    colorGroup: "primary",
  },
  {
    id: "02",
    title: "Asesoría personalizada",
    description: "Identificamos tu necesidad y el equipo ideal.",
    icon: UserCheckIcon,
    colorGroup: "primary",
  },
  {
    id: "03",
    title: "Cotización",
    description: "Te enviamos la propuesta con valores especiales.",
    icon: FileInvoiceIcon,
    colorGroup: "amber",
  },
  {
    id: "04",
    title: "Negociación",
    description: "Ajustamos valores y forma de inversión.",
    icon: ExchangeArrowsIcon,
    colorGroup: "amber",
  },
  {
    id: "05",
    title: "Venta",
    description: "Cerramos el pedido con las condiciones acordadas.",
    icon: ShieldCheckIcon,
    colorGroup: "amber",
  },
  {
    id: "06",
    title: "Facturación",
    description: "Emitimos tu factura o comprobante de inmediato.",
    icon: ReceiptIcon,
    colorGroup: "amber",
  },
  {
    id: "07",
    title: "Pago",
    description: "Recibimos el pago por el método que prefieras.",
    icon: CreditCardIcon,
    colorGroup: "amber",
  },
  {
    id: "08",
    title: "Envío / Entrega",
    description: "Despachamos tu pedido a nivel nacional.",
    icon: TruckIcon,
    colorGroup: "green",
  },
  {
    id: "09",
    title: "Seguimiento post-venta",
    description: "Confirmamos la recepción y te damos soporte.",
    icon: HeadsetIcon,
    colorGroup: "green",
  },
];
