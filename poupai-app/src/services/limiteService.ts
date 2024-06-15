import {isMesAnoIgualOuPosteriorADataAtual} from "./utils";
import {url, getToken} from "./apiBase";
import axios from "axios";

export const getLimitePorMes = async (mes, ano) => {
  const userToken = await getToken();
  const reqUrl = `${url}/limites?mes=${mes}&ano=${ano}`;
  try {
    const response = await axios.get(reqUrl, {
      headers: {
        Authorization: 'Bearear ' + userToken
      }
    });
    return response ? response.data : [];
  } catch (e) {
    throw new Error("Erro ao buscar limites");
  }
};

export const getLimiteValorPorMes = async (mes, ano) => {
  const userToken = await getToken();
  const reqUrl = `${url}/limites?mes=${mes}&ano=${ano}`;
  try {
    const response = await axios.get(reqUrl, {
      headers: {
        Authorization: 'Bearear ' + userToken
      }
    });
    if(response.data.length > 0 && response.data[0] != null) {
      return response.data[0].valor;
    } else {
      return 0;
    }
  } catch (e) {
    console.log("Erro ao buscar limites", e)
  }
};


export const salvarLimite = async (limite) => {
  await validarLimite(limite)
  const userToken = await getToken();
  if (limite.id) {
    const reqUrl = `${url}/limites/${limite.id}`;
    try {
      const response = await axios.put(reqUrl, limite, {
        headers: {
          Authorization: 'Bearear ' + userToken
        }
      });
    } catch (e) {
      throw new Error("Erro ao atualizar limite");
    }
  } else {
    const reqUrl = `${url}/limites`;
    try {
      const response = await axios.post(reqUrl, limite, {
        headers: {
          Authorization: 'Bearear ' + userToken
        }
      });
    } catch (e) {
      throw new Error("Erro ao salvar limite");
    }
  }
}

export const removerLimite = async (id) => {
  const userToken = await getToken();
  const reqUrl = `${url}/limites/${id}`;
  try {
    const response = await axios.delete(reqUrl, {
      headers: {
        Authorization: 'Bearear ' + userToken
      }
    });
  } catch (e) {
    throw new Error("Erro ao remover limite");
  }
}

export const validarLimite = async (limite) => {
  if (!limite.id) {
    const limiteResponse = await getLimitePorMes(limite.mes, limite.ano)
    if (limiteResponse.length > 0 && limiteResponse[0] != null) {
      console.log("limiteResponse", limiteResponse)
      throw new Error("Já existe um limite para este mês e ano")
    }
  }

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