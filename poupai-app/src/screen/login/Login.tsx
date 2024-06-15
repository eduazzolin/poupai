import {styles} from "./LoginStyle";
import {Alert, Text, View} from "react-native";
import AppTextInput from "../../component/appTextInput/AppTextInput";
import React, {useState} from "react";
import AppTitle from "../../component/appTitle/AppTitle";
import AppPressable from "../../component/appPressable/AppPressable";
import {loginUsuario, postUsuarioAsyncStorage} from "../../services/usuarioService";


export default function Login({navigation}) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    if (email === "" || senha === "") {
      alert("Preencha todos os campos");
      return;
    }

    const user = {
      email: email,
      senha: senha,
    };
    try {
      const response = await loginUsuario(user);
      if (response.token) {
        Alert.alert("Login realizado com sucesso");
        await postUsuarioAsyncStorage(response)
        navigation.replace('Main');
      } else {
        Alert.alert("Erro no login", response.message);
      }
    } catch (error) {
      Alert.alert("Erro no login", "Erro no login");
    }
  };


  const register = () => {
    navigation.replace('Register');
  };

  const handleChangeEmail = (value: string) => {
    setEmail(value);
  };

  const handleChangeSenha = (value: string) => {
    setSenha(value);
  };

  return (
    <View style={styles.container}>
      <AppTitle text="Login"/>
      <AppTextInput
        label="Email"
        placeholder="Digite seu email"
        onValueChange={handleChangeEmail}
      />
      <AppTextInput
        label="Senha"
        placeholder="Digite sua senha"
        onValueChange={handleChangeSenha}
      />

      <AppPressable text="Entrar" action={handleLogin}/>

      <Text style={styles.register} onPress={register}>Cadastre-se</Text>
    </View>


  );
}
