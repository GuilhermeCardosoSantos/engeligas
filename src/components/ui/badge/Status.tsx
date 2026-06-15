export const getStatusClassBadge = (
    status: string
  ) => {
  
    switch (
      status?.toUpperCase()
    ) {
  
      case "FINALIZADO":
        return `
          bg-green-100
          text-green-700
          dark:bg-green-500/10
          dark:text-green-400
        `;
  
      case "EM ABERTO":
        return `
          bg-blue-100
          text-blue-700
          dark:bg-blue-500/10
          dark:text-blue-400
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
  
      default:
        return `
          bg-gray-100
          text-gray-700
          dark:bg-gray-500/10
          dark:text-gray-400
        `;
    }
  };