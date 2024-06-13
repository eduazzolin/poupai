import {isMesAnoIgualOuPosteriorADataAtual} from "./utils";
import {url} from "./apiBase";
import axios from "axios";

export const getLimitePorMes = async (mes, ano) => {
  const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MDY1MjQyLCJleHAiOjE4MDQ0NjUyNDJ9.OYbV-R95NkOGLMposvwlb45MEGkNRo_PIcfJSW6pHj0'
  const reqUrl = `${url}/limites?mes=${mes}&ano=${ano}`;
  try {
    const response = await axios.get(reqUrl, {
      headers: {
        Authorization: 'Bearear ' + userToken
      }
    });
    return response ? response.data : null;
  } catch (e) {
    throw new Error("Erro ao buscar limite");
  }
};


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