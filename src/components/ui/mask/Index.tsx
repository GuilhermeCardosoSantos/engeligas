export function formatCpf(cpf?: string) {
    if (!cpf) return "";
  
    const value = cpf.replace(/\D/g, "");
  
    return value.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    );
  }
  
  export function formatPhone(phone?: string) {
    if (!phone) return "";
  
    const value = phone.replace(/\D/g, "");
  
    if (value.length === 11) {
      return value.replace(
        /(\d{2})(\d{5})(\d{4})/,
        "($1) $2-$3"
      );
    }
  
    return value.replace(
      /(\d{2})(\d{4})(\d{4})/,
      "($1) $2-$3"
    );
  }

  export function formatDate(
    value?: string
  ) {
    if (!value) return "-";
  
    return new Date(value)
      .toLocaleDateString("pt-BR");
  }

  export function formatDateTime(
    value?: string | null
  ) {
    if (!value) return "-";
  
    return new Date(value)
      .toLocaleString(
        "pt-BR",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      );
  }

  export function formatCapitalize(
    value?: string
  ) {
    if (!value) return "-";
  
    return value
      .toLowerCase()
      .replace(
        /\b\w/g,
        (l) => l.toUpperCase()
      );
  }