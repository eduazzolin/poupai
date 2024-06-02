import {styles} from './LimitStyle';
import {View} from 'react-native';
import AppMoneyInput from "../../component/appMoneyInput/AppMoneyInput";
import {useEffect, useState} from "react";
import AppSelectMesAnoInput from "../../component/appSelectMesAnoInput/AppSelectMesAnoInput";
import {getAnoAtual, getMesAtual, MESES} from '../../services/utils'
import AppTitle from "../../component/appTitle/AppTitle";
import AppPressable from "../../component/appPressable/AppPressable";
import AppLimiteCard from "../../component/appLimiteCard/AppLimiteCard";
import {getLimitePorMes, salvarLimite} from "../../services/limiteService";

export default function Limit() {

  /*
   * ------------------------------------------------------------------
   * variáveis useEffect()
   * ------------------------------------------------------------------
   */
  const [limiteConsulta, setLimiteConsulta] = useState(null)

  const [idLimite, setIdLimite] = useState(0)
  const [limiteCadastro, setLimiteCadastro] = useState(0)
  const [mesCadastro, setMesCadastro] = useState(getMesAtual())
  const [anoCadastro, setAnoCadastro] = useState(getAnoAtual())
  const mesListaCadastro = MESES
  const anoListaCadastro = ["2021", "2022", "2023", "2024", "2025"]

  const [mesConsulta, setMesConsulta] = useState(getMesAtual())
  const [anoConsulta, setAnoConsulta] = useState(getAnoAtual())
  const mesListaConsulta = MESES
  const anoListaConsulta = ["2021", "2022", "2023", "2024", "2025"]


  /*
   * ------------------------------------------------------------------
   * funções da página
   * montar a página, rolar, etc
   * ------------------------------------------------------------------
   */
  const mountPage = async () => {
    try {
      const limite = await getLimitePorMes(mesConsulta, anoConsulta)
      setLimiteConsulta(limite)
    } catch (error) {
      setLimiteConsulta(null)
      console.log("Erro ao buscar limite", error)
    }
  }

  useEffect(() => {
    mountPage();
  }, [mesConsulta, anoConsulta]);


  /*
   * ------------------------------------------------------------------
   * funções auxiliares
   * montar objetos, modificar funções de estado, etc
   * ------------------------------------------------------------------
   */
  function incorporarLimiteObjeto(limiteObjeto) {
    if (limiteObjeto == null) {
      setIdLimite(0)
      setLimiteCadastro(0)
      setMesCadastro(getMesAtual())
      setAnoCadastro(getAnoAtual())
    } else {
      setIdLimite(limiteObjeto.id)
      setLimiteCadastro(limiteObjeto.valor)
      setMesCadastro(limiteObjeto.mes.toString())
      setAnoCadastro(limiteObjeto.ano.toString())
    }
  }

  function montarLimiteObjeto() {
    return {
      id: idLimite,
      valor: limiteCadastro,
      mes: parseInt(mesCadastro),
      ano: parseInt(anoCadastro)
    }
  }


  /*
   * ------------------------------------------------------------------
   * funções de CRUD
   * salvar, remover, editar, etc
   * ------------------------------------------------------------------
   */
  const removerLimite = (limiteObjeto) => {
    console.log("Remover limite", limiteObjeto.id)
  }
  const handleEditarLimite = (limiteObjeto) => {
    incorporarLimiteObjeto(limiteObjeto)
  }
  const handleSalvarLimite = async () => {
    const limiteObjeto = montarLimiteObjeto()
    try {
      await salvarLimite(limiteObjeto)
      incorporarLimiteObjeto(null)
      mountPage()
    } catch (error) {
      console.log("Erro ao salvar limite", error)
    }
  }


  /*
   * ------------------------------------------------------------------
   * View
   * ------------------------------------------------------------------
   */
  return (

    <View style={styles.container}>
      <View style={styles.subContainer}>
        <AppTitle text={idLimite === 0 ? "Cadastrar Limite" : "Editar Limite"}/>
        <AppMoneyInput value={limiteCadastro} label={"Limite"} onValueChange={setLimiteCadastro}/>
        <AppSelectMesAnoInput label={"Período"} editable={true} mes={mesCadastro} mesLista={mesListaCadastro} onMesChange={setMesCadastro} ano={anoCadastro} anoLista={anoListaCadastro} onAnoChange={setAnoCadastro}/>
        <AppPressable
          text={idLimite === 0 ? "Cadastrar" : "Salvar edição"}
          action={handleSalvarLimite}
        />
      </View>

      <View style={styles.subContainer}>
        <AppTitle text={"Consultar"}/>
        <AppSelectMesAnoInput label={"Período"} editable={true} mes={mesConsulta} mesLista={mesListaConsulta} onMesChange={setMesConsulta} ano={anoConsulta} anoLista={anoListaConsulta} onAnoChange={setAnoConsulta}/>
        {limiteConsulta == null ? <AppTitle text={"Sem limite cadastrado"}/> :
          <AppLimiteCard
            valor={limiteConsulta.valor}
            editAction={() => handleEditarLimite(limiteConsulta)}
            removeAction={() => removerLimite(limiteConsulta)}/>}
      </View>

    </View>
  )
}