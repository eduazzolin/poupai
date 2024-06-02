export const getLimitePorMes = async (mes, ano) => {
  console.log("Buscando limite por mes", mes, ano)

  return ano == 2024 ? {
    valor: 1650.50,
    id: 1,
    mes: mes,
    ano: ano
  } : null;
}

export const salvarLimite = async (limite) => {
  if (limite.id) {
    console.log("Atualizando limite", limite)
  } else {
    console.log("Inserindo limite", limite)
  }
}

export const removerLimite = async (id) => {
  console.log("Removendo limite", id)
}