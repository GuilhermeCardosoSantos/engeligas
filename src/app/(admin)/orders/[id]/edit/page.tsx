import EditOrder from "@/components/orders/edit/OrderEditPage";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ENGELIGAS & ENQUÍMICA | Pedidos",
  description:
    "A ENGELIGAS & ENQUÍMICA atua desde 2012 oferecendo soluções em Bronze, Cobre, Latão e Alumínio, com excelência, qualidade, tecnologia e compromisso no segmento de metais não ferrosos.",
};

export default function Orders() {
    return (
        <EditOrder />
    );
  }