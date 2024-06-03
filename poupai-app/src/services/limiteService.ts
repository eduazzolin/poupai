import {isMesAnoIgualOuPosteriorADataAtual} from "./utils";

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
  validarLimite(limite)
  if (limite.id) {
    console.log("Atualizando limite", limite)
  } else {
    console.log("Inserindo limite", limite)
  }
}

export const removerLimite = async (id) => {
  console.log("Removendo limite", id)
}

export const validarLimite = (limite) => {

  if (!limite.valor) {
    throw new Error("Valor do limite é obrigatório")
  }

  if (!limite.mes) {
    throw new Error("Mês do limite é obrigatório")
  }

  if (limite.mes < 1 || limite.mes > 12) {
    throw new Error("Mês do limite inválido")
  }

  if (!limite.ano) {
    throw new Error("Ano do limite é obrigatório")
  }

  if (limite.valor <= 0) {
    throw new Error("Valor do limite deve ser maior que zero")
  }

  if (!isMesAnoIgualOuPosteriorADataAtual(limite.mes, limite.ano)) {
    throw new Error("Mês e ano do limite devem ser iguais ou posteriores à data atual")
  }
}