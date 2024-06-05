import {isMesAnoIgualOuPosteriorADataAtual} from "./utils";

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
      valor: 1000,
      id: 2,
      icone: "cart",
      mes: 8,
      ano: 2024
    },
    {
      descricao: "Academia",
      valor: 100,
      id: 3,
      icone: "barbell",
      mes: 8,
      ano: 2024
    },
    {
      descricao: "Jogos",
      valor: 100,
      id: 4,
      icone: "game-controller",
      mes: 8,
      ano: 2024
    },
    {
      descricao: "Mercado",
      valor: 25.5,
      id: 5,
      icone: "cart",
      mes: 8,
      ano: 2024
    },
    {
      descricao: "Mercado",
      valor: 10,
      id: 6,
      icone: "cart",
      mes: 8,
      ano: 2024
    },
    {
      descricao: "Luz",
      valor: 200,
      id: 7,
      icone: "bulb",
      mes: 8,
      ano: 2024
    },
    {
      descricao: "Água",
      valor: 100,
      id: 8,
      icone: "water",
      mes: 8,
      ano: 2024
    },
    {
      descricao: "Internet",
      valor: 100,
      id: 9,
      icone: "wifi",
      mes: 8,
      ano: 2024
    },
    {
      descricao: "Telefone",
      valor: 50,
      id: 10,
      icone: "call",
      mes: 8,
      ano: 2024
    }
  ] : [];
}

export const salvarDespesa = async (despesa) => {
  validarDespesa(despesa)
  if (despesa.id) {
    console.log("Atualizando despesa", despesa)
  } else {
    console.log("Inserindo despesa", despesa)
  }
}

export const removerDespesa = async (id) => {
  console.log("Removendo despesa", id)
}

export const validarDespesa = (despesa) => {
  if (!despesa.descricao) {
    throw new Error("Descrição é obrigatória")
  }

  if (!despesa.valor) {
    throw new Error("Valor é obrigatório")
  }

  if (despesa.valor <= 0) {
    throw new Error("Valor deve ser maior que zero")
  }

  if (!despesa.mes) {
    throw new Error("Mês é obrigatório")
  }
  if (despesa.mes < 1 || despesa.mes > 12) {
    throw new Error("Mês inválido")
  }

  if (!despesa.ano) {
    throw new Error("Ano é obrigatório")
  }

  if(!isMesAnoIgualOuPosteriorADataAtual(despesa.mes, despesa.ano)){
    throw new Error("Mês e ano devem ser iguais ou posteriores a data atual")
  }

}