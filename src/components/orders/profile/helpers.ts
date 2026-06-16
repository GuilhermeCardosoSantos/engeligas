export const getStatusClassBadge = (status?: string) => {
    const value = status?.toUpperCase() ?? "";
  
    switch (value) {
      case "FINALIZADO":
        return `
          bg-green-100
          text-green-700
          dark:bg-green-500/10
          dark:text-green-400
        `;
  
      case "ALERTA":
        return `
          bg-yellow-100
          text-yellow-700
          dark:bg-yellow-500/10
          dark:text-yellow-400
        `;
  
      case "EM ATRASO":
        return `
          bg-orange-100
          text-orange-700
          dark:bg-orange-500/10
          dark:text-orange-400
        `;
  
      case "CANCELADO":
        return `
          bg-red-100
          text-red-700
          dark:bg-red-500/10
          dark:text-red-400
        `;
  
      case "EM ABERTO":
      default:
        return `
          bg-blue-100
          text-blue-700
          dark:bg-blue-500/10
          dark:text-blue-400
        `;
    }
  };
  
  const normalizeLiga = (liga?: string) => {
    const value = (liga ?? "")
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "")
      .trim();
  
    const aliases: Record<string, string> = {
      SAE68A: "SAE68-A",
      SAE68B: "SAE68-B",
      SAE68C: "SAE68-C",
      SAE68D: "SAE68-D",
  
      "68A": "SAE68-A",
      "68B": "SAE68-B",
      "68C": "SAE68-C",
      "68D": "SAE68-D",
  
      "430A": "430-A",
      "430B": "430-B",
  
      BZAL: "BZ-AL",
  
      LATAO: "LATAO",
  
      NÃOENCONTRADO: "NAOENCONTRADO",
      NAOENCONTRADO: "NAOENCONTRADO",
    };
  
    return aliases[value] ?? value;
  };
  
  const ligaBadgeClasses: Record<string, string> = {
    TM620: `
      bg-blue-100
      text-blue-700
      dark:bg-blue-500/10
      dark:text-blue-400
    `,
  
    TM23: `
      bg-indigo-100
      text-indigo-700
      dark:bg-indigo-500/10
      dark:text-indigo-400
    `,
  
    SAE660: `
      bg-cyan-100
      text-cyan-700
      dark:bg-cyan-500/10
      dark:text-cyan-400
    `,
  
    SAE621: `
      bg-sky-100
      text-sky-700
      dark:bg-sky-500/10
      dark:text-sky-400
    `,
  
    SAE620: `
      bg-blue-200
      text-blue-800
      dark:bg-blue-400/10
      dark:text-blue-300
    `,
  
    "SAE68-D": `
      bg-red-100
      text-red-700
      dark:bg-red-500/10
      dark:text-red-400
    `,
  
    "SAE68-C": `
      bg-rose-100
      text-rose-700
      dark:bg-rose-500/10
      dark:text-rose-400
    `,
  
    "SAE68-B": `
      bg-pink-100
      text-pink-700
      dark:bg-pink-500/10
      dark:text-pink-400
    `,
  
    "SAE68-A": `
      bg-fuchsia-100
      text-fuchsia-700
      dark:bg-fuchsia-500/10
      dark:text-fuchsia-400
    `,
  
    SAE68: `
      bg-purple-100
      text-purple-700
      dark:bg-purple-500/10
      dark:text-purple-400
    `,
  
    SAE67: `
      bg-violet-100
      text-violet-700
      dark:bg-violet-500/10
      dark:text-violet-400
    `,
  
    SAE65: `
      bg-orange-100
      text-orange-700
      dark:bg-orange-500/10
      dark:text-orange-400
    `,
  
    SAE64: `
      bg-amber-100
      text-amber-700
      dark:bg-amber-500/10
      dark:text-amber-400
    `,
  
    SAE62: `
      bg-yellow-100
      text-yellow-700
      dark:bg-yellow-500/10
      dark:text-yellow-400
    `,
  
    SAE43: `
      bg-lime-100
      text-lime-700
      dark:bg-lime-500/10
      dark:text-lime-400
    `,
  
    SAE40: `
      bg-green-100
      text-green-700
      dark:bg-green-500/10
      dark:text-green-400
    `,
  
    "430-B": `
      bg-emerald-100
      text-emerald-700
      dark:bg-emerald-500/10
      dark:text-emerald-400
    `,
  
    "430-A": `
      bg-teal-100
      text-teal-700
      dark:bg-teal-500/10
      dark:text-teal-400
    `,
  
    "BZ-AL": `
      bg-cyan-200
      text-cyan-800
      dark:bg-cyan-400/10
      dark:text-cyan-300
    `,
  
    BZ14: `
      bg-amber-200
      text-amber-800
      dark:bg-amber-400/10
      dark:text-amber-300
    `,
  
    BZ12: `
      bg-orange-200
      text-orange-800
      dark:bg-orange-400/10
      dark:text-orange-300
    `,
  
    BZ10: `
      bg-yellow-200
      text-yellow-800
      dark:bg-yellow-400/10
      dark:text-yellow-300
    `,
  
    CA955: `
      bg-emerald-200
      text-emerald-800
      dark:bg-emerald-400/10
      dark:text-emerald-300
    `,
  
    CA954: `
      bg-green-200
      text-green-800
      dark:bg-green-400/10
      dark:text-green-300
    `,
  
    CA630: `
      bg-teal-200
      text-teal-800
      dark:bg-teal-400/10
      dark:text-teal-300
    `,
  
    CA624: `
      bg-sky-200
      text-sky-800
      dark:bg-sky-400/10
      dark:text-sky-300
    `,
  
    "86300": `
      bg-slate-100
      text-slate-700
      dark:bg-slate-500/10
      dark:text-slate-400
    `,
  
    INDUSTRIAL: `
      bg-fuchsia-100
      text-fuchsia-700
      dark:bg-fuchsia-500/10
      dark:text-fuchsia-400
    `,
  
    LATAO: `
      bg-stone-100
      text-stone-700
      dark:bg-stone-500/10
      dark:text-stone-400
    `,
  
    NAOENCONTRADO: `
      bg-red-100
      text-red-700
      dark:bg-red-500/10
      dark:text-red-400
    `,
  };
  
  export const getLigaClassBadge = (liga?: string) => {
    const value = normalizeLiga(liga);
  
    return (
      ligaBadgeClasses[value] ??
      `
        bg-neutral-100
        text-neutral-700
        dark:bg-neutral-500/10
        dark:text-neutral-400
      `
    );
  };
  
  export const formatCurrency = (value?: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(value || 0));
  };
  
  export const formatWeight = (value?: number) => {
    return `${Number(value || 0).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} KG`;
  };
  
  export const formatDate = (value?: string) => {
    if (!value) return "-";
  
    return new Date(value).toLocaleDateString("pt-BR");
  };
  
  export const formatDateTime = (value?: string) => {
    if (!value) return "-";
  
    return new Date(value).toLocaleString("pt-BR");
  };
  
  export const formatText = (value?: string) => {
    if (!value) return "-";
  
    return value
      .toLowerCase()
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };
  
  export const formatMedidas = (medidas?: any[]) => {
    if (!Array.isArray(medidas) || medidas.length === 0) {
      return "-";
    }
  
    return medidas.map((m) => `${m.valor}${m.unidade}`).join(" x ");
  };