import App from '../../../App';
import {styles} from './ProfileStyle';
import {Button, Text, View} from 'react-native';
import AppTitle from '../../component/appTitle/AppTitle';
import {useEffect, useState} from "react";
import {getLimiteValorPorMes} from "../../services/limiteService";
import {getTotalMes} from "../../services/despesaService";
import {getUsuarioAsyncStorage} from "../../services/usuarioService";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppPressable from "../../component/appPressable/AppPressable";

export default function Profile({navigation}) {


  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('usuario');
      navigation.navigate("Login");
    } catch (error) {
      console.log("Erro ao remover o token", error);
    }
  };

  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    dt_nascimento: ""
  });

  const mountPage = async () => {
    try {
      const usuario_logado = await getUsuarioAsyncStorage()
      console.log(usuario_logado)
      setUsuario(usuario_logado)
    } catch (error) {
      console.log("Erro ao buscar dados", error)
    }
  }
  useEffect(() => {
    mountPage();
  }, []);


  return (
    <View style={styles.container}>
      <AppTitle text="Meus Dados"/>

      <Text>Nome: {usuario.nome}</Text>
      <Text>Email: {usuario.email}</Text>
      <Text>Data de Nascimento: {usuario.dt_nascimento}</Text>
      <AppPressable text={"Sair"} action={logout}/>


    </View>
  )
}