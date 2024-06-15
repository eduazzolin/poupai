import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {url, getToken} from "./apiBase";

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

export const cadastrarUsuario = async (usuario) => {
  usuario.dt_nascimento = usuario.dt_nascimento.toISOString().split('T')[0];
  try {
    const reqUrl = `${url}/usuario`;
    const response = await axios.post(reqUrl, usuario);
    return response.data;
  } catch (error) {
    console.log('Erro ao cadastrar usuário:', error);
    return {error: error.response?.data || 'Erro desconhecido'};
  }
};

export const loginUsuario = async (usuario) => {
  try {
    const reqUrl = `${url}/login`;
    const response = await axios.post(reqUrl, usuario);

    return response.data;
  } catch (error) {
    console.log('Erro ao fazer login:', error);
  }
};

export const postUsuarioAsyncStorage = async (usuario) => {
  try {
    await AsyncStorage.setItem('usuario', JSON.stringify(usuario));
    await AsyncStorage.setItem('token', usuario.token);
  } catch (error) {
    console.log('Erro ao salvar usuário no AsyncStorage:', error);
  }
}

export const getUsuarioAsyncStorage = async () => {
  try {
    const usuario = await AsyncStorage.getItem('usuario');
    return JSON.parse(usuario);
  } catch (error) {
    console.log('Erro ao buscar usuário no AsyncStorage:', error);
  }
}