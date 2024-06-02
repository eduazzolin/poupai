export const getDespesasPorMes = async (mes, ano) => {
  console.log("Buscando despesas por mes", mes, ano)

  return ano == 2024 ? [
    {
      descricao: "Aluguel",
      valor: 1000,
      id: 1,
      icone: "home",
      mes: 8,
      ano: 2024
    },
    {
      descricao: "Mercado",
      valor: 500,
      id: 2,
      icone: "cart",
      mes: 8,
      ano: 2024
    },
    {
      descricao: "Luz",
      valor: 200,
      id: 3,
      icone: "bulb",
      mes: 8,
      ano: 2024
    },
    {
      descricao: "Água",
      valor: 100,
      id: 4,
      icone: "water",
      mes: 8,
      ano: 2024
    },
    {
      descricao: "Internet",
      valor: 100,
      id: 5,
      icone: "wifi",
      mes: 8,
      ano: 2024
    },
    {
      descricao: "Telefone",
      valor: 50,
      id: 6,
      icone: "call",
      mes: 8,
      ano: 2024
    }
  ] : [];
}

export const salvarDespesa = async (despesa) => {
  if (despesa.id) {
    console.log("Atualizando despesa", despesa)
  } else {
    console.log("Inserindo despesa", despesa)
  }
}

export const removerDespesa = async (id) => {
  console.log("Removendo despesa", id)
}