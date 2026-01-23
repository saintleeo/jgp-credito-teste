export const formatarData = (dataString) => {
    if (!dataString) return "";
    // Se a data vier no formato AAAA-MM-DD
    const [ano, mes, dia] = dataString.split("-");
    return `${dia}/${mes}/${ano}`;
  };