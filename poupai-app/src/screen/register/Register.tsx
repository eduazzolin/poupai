import { styles } from "./RegisterStyle";
import { Text, View, Alert } from "react-native";
import AppTitle from "../../component/appTitle/AppTitle";
import AppTextInput from "../../component/appTextInput/AppTextInput";
import AppSelectMesAnoInput from "../../component/appSelectMesAnoInput/AppSelectMesAnoInput";
import { getAnoAtual, getMesAtual, MESES } from "../../services/utils";
import { useState } from "react";
import AppPressable from "../../component/appPressable/AppPressable";
import { cadastrarUsuario } from "../../services/usuarioService";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");

  const handleRegister = async () => {
    if (senha == "" || senha !== confirmSenha) {
      Alert.alert("Erro", "Senhas não conferem");
      return;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email == "" || !regex.test(email)) {
      Alert.alert("Erro", "Insira um email válido");
      return;
    }

    const usuario = {
      email: email,
      senha: senha,
      nome: nome,
        mes: mesCadastro,
        ano: anoCadastro
    };
    const response = await cadastrarUsuario(usuario);
    if (response.id != null) {
      Alert.alert("Sucesso", "Usuário cadastrado com sucesso");
      navigation.navigate("SignIn");
    } else {
      Alert.alert("Erro", response);
    }
  };

  const [mesCadastro, setMesCadastro] = useState(getMesAtual());
  const [anoCadastro, setAnoCadastro] = useState(getAnoAtual());
  const mesListaCadastro = MESES;
  const anoListaCadastro = ["2021", "2022", "2023", "2024", "2025"];

  return (
    <View style={styles.container}>
      <AppTitle text="Register" />
      <AppTextInput
        label="Nome"
        placeholder="Digite seu nome"
        onValueChange={setNome}
      />
      <AppSelectMesAnoInput
        label={"Período"}
        editable={true}
        mes={mesCadastro}
        mesLista={mesListaCadastro}
        onMesChange={setMesCadastro}
        ano={anoCadastro}
        anoLista={anoListaCadastro}
        onAnoChange={setAnoCadastro}
        bloquearDatasAnteriores={true}
      />

      <AppTextInput
        label="Email"
        placeholder="Digite seu email"
        onValueChange={setEmail}
      />
      <AppTextInput
        label="Senha"
        placeholder="Digite sua senha"
        onValueChange={setSenha}
      />
      <AppTextInput
        label="Confirmar Senha"
        placeholder="Confirme sua senha"
        onValueChange={setConfirmSenha}
      />
      <AppPressable text="Entrar" action={handleRegister} />
    </View>
  );
}
