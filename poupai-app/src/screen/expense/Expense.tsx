import {styles} from './ExpenseStyle';
import {ScrollView, View} from 'react-native';
import AppTitle from "../../component/appTitle/AppTitle";
import AppMoneyInput from "../../component/appMoneyInput/AppMoneyInput";
import AppTextInput from "../../component/appTextInput/AppTextInput";
import * as React from "react";
import {useState} from "react";
import {ICONES, MESES} from "../../services/utils";
import AppSelectMesAnoInput from "../../component/appSelectMesAnoInput/AppSelectMesAnoInput";
import AppPressable from "../../component/appPressable/AppPressable";
import AppDespesaCard from "../../component/appDespesaCard/AppDespesaCard";
import AppIconeInput from "../../component/appIconeInput/AppIconeInput";
import AppIconeModal from "../../component/appIconeModal/AppIconeModal";

export default function Expense() {

  const [descricao, setDescricao] = useState("")
  const [valor, setValor] = useState(0)
  const [mesCadastro, setMesCadastro] = useState("")
  const [anoCadastro, setAnoCadastro] = useState("")
  const [mesConsulta, setMesConsulta] = useState("")
  const [anoConsulta, setAnoConsulta] = useState("")
  const [icone, setIcone] = useState("receipt")
  const [modalVisible, setModalVisible] = useState(false)

  const mesListaCadastro = MESES
  const anoListaCadastro = ["2021", "2022", "2023", "2024", "2025"]
  const mesListaConsulta = MESES
  const anoListaConsulta = ["2021", "2022", "2023", "2024", "2025"]
  const iconeLista = ICONES
  const despesas = [
    {
      descricao: "Aluguel",
      valor: 1000,
      id: 1,
      icone: "home"
    },
    {
      descricao: "Mercado",
      valor: 500,
      id: 2,
      icone: "cart"
    },
    {
      descricao: "Luz",
      valor: 200,
      id: 3,
      icone: "bulb"
    },
    {
      descricao: "Água",
      valor: 100,
      id: 4,
      icone: "water"
    },
    {
      descricao: "Internet",
      valor: 100,
      id: 5,
      icone: "wifi"
    },
    {
      descricao: "Telefone",
      valor: 50,
      id: 6,
      icone: "call"
    }
  ]

  const removerDespesa = (id: number) => {
    console.log("Remover despesa", id)
  }
  const editarDespesa = (id: number) => {
    console.log("Editar despesa", id)
  }

  return (
    <ScrollView style={styles.container}>

      <AppIconeModal
        icone={[icone, setIcone]}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={"Escolha um ícone"}
        iconeLista={iconeLista}>
      </AppIconeModal>


      <View style={styles.subContainer}>

        <AppTitle text={"Cadastrar Despesa"}/>

        <View style={styles.rowIconeDescricao}>
          <View style={styles.colIcone}>
            <AppIconeInput icone={icone} label={"Ícone"} onPress={() => setModalVisible(true)}/>
          </View>
          <View style={styles.colDescricao}>
            <AppTextInput text={descricao} label={"Descrição"} onValueChange={setDescricao}/>
          </View>
        </View>

        <AppMoneyInput value={valor} label={"Valor"} onValueChange={setValor}/>
        <AppSelectMesAnoInput label={"Período"} editable={true} mes={mesCadastro} mesLista={mesListaCadastro} onMesChange={setMesCadastro} ano={anoCadastro} anoLista={anoListaCadastro} onAnoChange={setAnoCadastro}/>
        <AppPressable text={"Salvar"} action={() => console.log("Salvar")}/>

      </View>


      <View style={styles.subContainerHistorico}>
        <AppTitle text={"Histórico"}/>
        <AppSelectMesAnoInput label={"Período"} editable={true} mes={mesConsulta} mesLista={mesListaConsulta} onMesChange={setMesConsulta} ano={anoConsulta} anoLista={anoListaConsulta} onAnoChange={setAnoConsulta}/>
        {despesas.map((despesa, index) => {
          return (
            <AppDespesaCard
              key={index}
              descricao={despesa.descricao}
              valor={despesa.valor}
              removeAction={() => removerDespesa(despesa.id)}
              editAction={() => editarDespesa(despesa.id)}
              icone={despesa.icone}
            />
          )
        })}
      </View>

    </ScrollView>
  )
}