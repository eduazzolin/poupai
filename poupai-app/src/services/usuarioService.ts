import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = 'http://localhost:8080';

export const postUsuario = async (entidade) => {

  try {
    const response = await axios.post(`${url}/usuario`, entidade);
    return response.data;
  } catch (error) {
    if (error.response.status === 409) {
      throw new Error("Email já cadastrado");
    } else {
      throw new Error("Erro ao cadastrar usuário");
    }
  }
  
}

export const postUsuarioLogin = async (entidade) => {
  try {
    const response = await axios.post(`${url}/login`, entidade);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao fazer login");
  }
}

export const cadastrarUsuario = async (entidade) => {
  try {
    const response = await postUsuario(entidade);
    return response;
  } catch (error) {
    return error.message;
  }
}

export const loginUsuario = async (entidade) => {
  try {
    const response = await postUsuarioLogin(entidade);
    await AsyncStorage.setItem("token", response.token);
    return response;
  } catch (error) {
    return error.message;
  }
  
}

