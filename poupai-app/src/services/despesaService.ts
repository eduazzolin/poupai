import {isMesAnoIgualOuPosteriorADataAtual} from "./utils";
import {url, getToken} from "./apiBase";
import axios from "axios";

export const getDespesasPorMes = async (mes, ano) => {
  const userToken = await getToken();
  const reqUrl = `${url}/despesas?mes=${mes}&ano=${ano}`;
  try {
    const response = await axios.get(reqUrl, {
      headers: {
        Authorization: 'Bearear ' + userToken
      }
    });
    console.log(response.data)
    return response ? response.data : [];
  } catch (e) {
    throw new Error("Erro ao buscar despesas");
  }
}

export const getTotalMes = async (mes, ano) => {
  const userToken = await getToken();
  const reqUrl = `${url}/total?mes=${mes}&ano=${ano}`;
  try {
    const response = await axios.get(reqUrl, {
      headers: {
        Authorization: 'Bearear ' + userToken
      }
    });
    if (response && response.data.TOTAL != null) {
      return response.data.TOTAL;
    } else {
      return 0;
    }
  } catch (e) {
    console.log(e)
    throw new Error("Erro ao buscar total de despesas");
  }

}

export const salvarDespesa = async (despesa) => {
  validarDespesa(despesa)
  const userToken = await getToken();
  if (despesa.id) {
    const reqUrl = `${url}/despesas/${despesa.id}`;
    try {
      await axios.put(reqUrl, despesa, {
        headers: {
          Authorization: 'Bearear ' + userToken
        }
      });
    } catch (e) {
      throw new Error("Erro ao atualizar despesa");
    }
  } else {
    const reqUrl = `${url}/despesas`;
    try {
      await axios.post(reqUrl, despesa, {
        headers: {
          Authorization: 'Bearear ' + userToken
        }
      });
    } catch (e) {
      throw new Error("Erro ao salvar despesa");
    }
  }
}

export const removerDespesa = async (id) => {
  const userToken = await getToken();
  const reqUrl = `${url}/despesas/${id}`;
  try {
    await axios.delete(reqUrl, {
      headers: {
        Authorization: 'Bearear ' + userToken
      }
    });
  } catch (e) {
    throw new Error("Erro ao remover despesa");
  }
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

  if (!isMesAnoIgualOuPosteriorADataAtual(despesa.mes, despesa.ano)) {
    throw new Error("Mês e ano devem ser iguais ou posteriores a data atual")
  }

}