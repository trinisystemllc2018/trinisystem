import type { Metadata } from "next";
import { TechER } from "@/components/features/TechER";

export const metadata: Metadata = {
  title: "Reparación de Impresoras Cerca de Mí — NYC | Trini System LLC",
  description: "Reparación de impresoras HP, Canon, Epson, Brother. Servicio técnico remoto. Impresoras offline, errores de tinta, configuración WiFi. Llame: 347-953-1531.",
  keywords: [
    "reparacion de impresoras cerca de mi","impresoras epson","impresoras hp","impresoras canon",
    "servicio tecnico hp cerca de mi","reparacion impresoras new york","servicio impresoras",
    "impresora no imprime","error impresora","configurar impresora wifi",
  ],
};

const SPANISH_TRENDING = [
  "Impresora HP no imprime","Error tinta Epson EcoTank","Impresora Canon B200",
  "Configurar impresora WiFi","Impresora offline Windows","Actualizar GPS Garmin",
  "Computadora lenta","Internet lento",
];

export default function ReparacionImprisorasPage() {
  return (
    <>
      <div className="bg-green-700 text-white py-3 text-center text-sm font-semibold">
        🖨️ Reparación de Impresoras — Servicio Remoto, Todo EE.UU. · <a href="tel:+13479531531" className="underline">Llame: 347-953-1531</a>
      </div>
      <div className="max-w-3xl mx-auto px-4 pt-8 text-center">
        <h1 className="text-3xl font-black text-gray-900 mb-2">¿Tiene un problema técnico?</h1>
        <p className="text-gray-600 mb-6">Impresora · Computadora · Internet · Router — escríbalo en el buscador. Tenemos <strong>3 opciones</strong> para ayudarle.</p>
      </div>
      <TechER brandFilter="Spanish" pageTrending={SPANISH_TRENDING} />
    </>
  );
}
