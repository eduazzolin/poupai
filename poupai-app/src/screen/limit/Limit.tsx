import {styles} from './LimitStyle';
import {View} from 'react-native';
import AppMoneyInput from "../../component/appMoneyInput/AppMoneyInput";
import {useState} from "react";
import AppSelectMesAnoInput from "../../component/appSelectMesAnoInput/AppSelectMesAnoInput";
import {MESES} from '../../services/utils'
import AppTitle from "../../component/appTitle/AppTitle";
import AppPressable from "../../component/appPressable/AppPressable";
import AppLimiteCard from "../../component/appLimiteCard/AppLimiteCard";

export default function Limit() {

  const [limiteCadastro, setLimiteCadastro] = useState(0)
  const [mesCadastro, setMesCadastro] = useState("")
  const [anoCadastro, setAnoCadastro] = useState("")
  const [mesConsulta, setMesConsulta] = useState("")
  const [anoConsulta, setAnoConsulta] = useState("")

  const mesListaCadastro = MESES
  const anoListaCadastro = ["2021", "2022", "2023", "2024", "2025"]
  const mesListaConsulta = MESES
  const anoListaConsulta = ["2021", "2022", "2023", "2024", "2025"]

  const limiteConsulta = {
    id: 1,
    valor: 1999.80
  }

  const removerLimite = (id: number) => {
    console.log("Remover limite", id)
  }
  const editarLimite = (id: number) => {
    console.log("Editar limite", id)
  }

  return (

    <View style={styles.container}>
      <View style={styles.subContainer}>
        <AppTitle text={"Cadastrar Limite"}/>
        <AppMoneyInput value={limiteCadastro} label={"Limite"} onValueChange={setLimiteCadastro}/>
        <AppSelectMesAnoInput label={"Período"} editable={true} mes={mesCadastro} mesLista={mesListaCadastro} onMesChange={setMesCadastro} ano={anoCadastro} anoLista={anoListaCadastro} onAnoChange={setAnoCadastro}/>
        <AppPressable text={"Salvar"} action={() => console.log("Salvar")}/>
      </View >

      <View style={styles.subContainer}>
        <AppTitle text={"Consultar"}/>
        <AppSelectMesAnoInput label={"Período"} editable={true} mes={mesConsulta} mesLista={mesListaConsulta} onMesChange={setMesConsulta} ano={anoConsulta} anoLista={anoListaConsulta} onAnoChange={setAnoConsulta}/>
        <AppLimiteCard valor={limiteConsulta.valor} editAction={() => editarLimite(limiteConsulta.id)} removeAction={() => removerLimite(limiteConsulta.id)}></AppLimiteCard>
      </View>

    </View>
  )
}