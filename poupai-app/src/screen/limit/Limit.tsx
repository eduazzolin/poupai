import {styles} from './LimitStyle';
import {View} from 'react-native';
import AppTextInput from "../../component/appTextInput/AppTextInput";
import AppMoneyInput from "../../component/appMoneyInput/AppMoneyInput";
import {useState} from "react";
import AppSelectInput from "../../component/appSelectInput/AppSelectInput";
import {MESES} from '../../services/constants'

export default function Limit() {

  const [limit, setLimit] = useState(0)
  const [description, setDescription] = useState("")
  const [mes, setMes] = useState("")
  const [ano, setAno] = useState("")

  const mesLista = MESES
  const anoLista = ["2021", "2022", "2023", "2024", "2025"]

  return (

    <View style={styles.container}>
      <AppTextInput label={"label de texaaato"} placeholder={"Digite o valor"} text={description} onValueChange={setDescription} editable={true}/>
      <AppMoneyInput value={limit} label={"Limite"} onValueChange={setLimit}/>
      <AppSelectInput label={"Período"} editable={true} mes={mes} mesLista={mesLista} onMesChange={setMes} ano={ano} anoLista={anoLista} onAnoChange={setAno}/>
    </View>
  )
}