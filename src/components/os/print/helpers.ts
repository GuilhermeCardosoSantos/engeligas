import { Medida } from "./types";

export function formatDate(value?: string) {
  if (!value) {
    return "";
  }

  if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
    const [year, month, day] = value
      .slice(0, 10)
      .split("-");

    return `${day}/${month}/${year}`;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("pt-BR").format(date);
}

export function formatNumber(
  value?: number | string | null
) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "";
  }

  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(value));
}

export function getMedidas(medidas: any): Medida[] {
  if (!medidas) {
    return [];
  }

  if (Array.isArray(medidas)) {
    return medidas;
  }

  try {
    const parsed = JSON.parse(medidas);

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch {
    return [];
  }
}

export function getMedida(
  medidas: Medida[],
  index: number
) {
  return medidas[index]?.valor ?? "";
}

export function getUnidadeMedida(
  medidas: Medida[],
  index: number
) {
  return medidas[index]?.unidade ?? "";
}

export function getOSNumber(os: any) {
  return os.os_number ?? os.id;
}

export function getEntradaDate(os: any) {
  return (
    formatDate(os.emissao) ||
    formatDate(os.created_at)
  );
}

export function getSaidaDate(os: any) {
  return formatDate(os.previsto);
}