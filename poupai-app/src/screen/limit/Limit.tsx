import {styles} from './LimitStyle';
import {Button, Text, View} from 'react-native';
import AppInput from "../../component/appTextInput/AppTextInput";
import AppMoneyInput from "../../component/appMoneyInput/AppMoneyInput";
import {useState} from "react";
import AppTextInput from "../../component/appTextInput/AppTextInput";

export default function Limit() {

  const [limit, setLimit] = useState(0)
  const [description, setDescription] = useState("")
  return (

    <View style={styles.container}>
      <AppTextInput label={"label de texaaato"} placeholder={"Digite o valor"} text={description} onValueChange={setDescription} editable={true}/>
      <AppMoneyInput value={limit} label={"Limite"} onValueChange={setLimit}/>
    </View>
  )
}