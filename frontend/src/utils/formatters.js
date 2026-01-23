export const formatarData = (dataString) => {
    if (!dataString) return "";
    // Se a data vier no formato AAAA-MM-DD
    const [ano, mes, dia] = dataString.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  export const formatarMoeda = (valor) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };