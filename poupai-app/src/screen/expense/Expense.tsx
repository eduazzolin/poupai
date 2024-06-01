import {styles} from './ExpenseStyle';
import {ScrollView, View} from 'react-native';
import AppTitle from "../../component/appTitle/AppTitle";
import AppMoneyInput from "../../component/appMoneyInput/AppMoneyInput";
import AppTextInput from "../../component/appTextInput/AppTextInput";
import {useState} from "react";
import {MESES} from "../../services/utils";
import AppSelectInput from "../../component/appSelectInput/AppSelectInput";
import AppPressable from "../../component/appPressable/AppPressable";
import AppDespesaCard from "../../component/appDespesaCard/AppDespesaCard";

export default function Expense() {

  const [descricao, setDescricao] = useState("")
  const [valor, setValor] = useState(0)
  const [mesCadastro, setMesCadastro] = useState("")
  const [anoCadastro, setAnoCadastro] = useState("")
  const [mesConsulta, setMesConsulta] = useState("")
  const [anoConsulta, setAnoConsulta] = useState("")

  const mesListaCadastro = MESES
  const anoListaCadastro = ["2021", "2022", "2023", "2024", "2025"]
  const mesListaConsulta = MESES
  const anoListaConsulta = ["2021", "2022", "2023", "2024", "2025"]

  const despesas = [
    {
      descricao: "Aluguel",
      valor: 1000,
      id: 1
    },
    {
      descricao: "Mercado",
      valor: 500,
      id: 2
    },
    {
      descricao: "Luz",
      valor: 200,
      id: 3
    },
    {
      descricao: "Água",
      valor: 100,
      id: 4
    },
    {
      descricao: "Internet",
      valor: 100,
      id: 5
    },
    {
      descricao: "Telefone",
      valor: 50,
      id: 6
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
      <View style={styles.subContainer}>
        <AppTitle text={"Cadastrar Despesa"}/>
        <AppTextInput text={descricao} label={"Descrição"} onValueChange={setDescricao}/>
        <AppMoneyInput value={valor} label={"Valor"} onValueChange={setValor}/>
        <AppSelectInput label={"Período"} editable={true} mes={mesCadastro} mesLista={mesListaCadastro} onMesChange={setMesCadastro} ano={anoCadastro} anoLista={anoListaCadastro} onAnoChange={setAnoCadastro}/>
        <AppPressable text={"Salvar"} action={() => console.log("Salvar")}/>
      </View>

      <View style={styles.subContainerHistorico}>
        <AppTitle text={"Histórico"}/>
        <AppSelectInput label={"Período"} editable={true} mes={mesConsulta} mesLista={mesListaConsulta} onMesChange={setMesConsulta} ano={anoConsulta} anoLista={anoListaConsulta} onAnoChange={setAnoConsulta}/>
        {despesas.map((despesa, index) => {
          return (
            <AppDespesaCard
              key={index}
              descricao={despesa.descricao}
              valor={despesa.valor}
              removeAction={() => removerDespesa(despesa.id)}
              editAction={() => editarDespesa(despesa.id)}
            />
          )
        })}
      </View>
    </ScrollView>
  )
}