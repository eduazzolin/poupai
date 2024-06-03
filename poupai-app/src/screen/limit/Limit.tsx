import {styles} from './LimitStyle';
import {ScrollView, Text, View} from 'react-native';
import AppMoneyInput from "../../component/appMoneyInput/AppMoneyInput";
import {useEffect, useState} from "react";
import AppSelectMesAnoInput from "../../component/appSelectMesAnoInput/AppSelectMesAnoInput";
import {getAnoAtual, getMesAtual, MESES} from '../../services/utils'
import AppTitle from "../../component/appTitle/AppTitle";
import AppPressable from "../../component/appPressable/AppPressable";
import AppLimiteCard from "../../component/appLimiteCard/AppLimiteCard";
import {getLimitePorMes, salvarLimite, removerLimite} from "../../services/limiteService";
import AppRemoverModal from "../../component/appRemoverModal/AppRemoverModal";
import * as React from "react";

export default function Limit() {

  /*
   * ------------------------------------------------------------------
   * variáveis useEffect()
   * ------------------------------------------------------------------
   */
  const [limiteConsulta, setLimiteConsulta] = useState(null)
  const [erro, setErro] = useState("")

  const [modalRemoverVisible, setModalRemoverVisible] = useState(false)
  const [limiteRemocaoId, setLimiteRemocaoId] = useState(0)
  const [limiteRemocaoMesAno, setLimiteRemocaoMesAno] = useState("")

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
      setErro("")
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

  function handleCancelar() {
    incorporarLimiteObjeto(null)
    setErro("")
  }


  /*
   * ------------------------------------------------------------------
   * funções de CRUD
   * salvar, remover, editar, etc
   * ------------------------------------------------------------------
   */
  const handleModalDeRemocao = (limiteObjeto) => {
    setLimiteRemocaoId(limiteObjeto.id)
    setLimiteRemocaoMesAno(limiteObjeto.mes + "/" + limiteObjeto.ano)
    setModalRemoverVisible(true)
  }

  const handleRemoverLimite = async () => {
    setModalRemoverVisible(false)
    try {
      await removerLimite(limiteRemocaoId)
      mountPage()
    } catch (error) {
      console.log("Erro ao remover limite", error)
    }
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
      setErro(error.message)
    }
  }


  /*
   * ------------------------------------------------------------------
   * View
   * ------------------------------------------------------------------
   */
  return (

    <ScrollView style={styles.container}>

      <AppRemoverModal
        modalVisible={modalRemoverVisible}
        setModalVisible={setModalRemoverVisible}
        title={"Tem certeza que deseja remover?"}
        name={limiteRemocaoMesAno}
        removerAction={handleRemoverLimite}
      />


      <View style={styles.subContainer}>
        <AppTitle text={idLimite === 0 ? "Cadastrar Limite" : "Editar Limite"}/>
        <AppMoneyInput value={limiteCadastro} label={"Limite"} onValueChange={setLimiteCadastro}/>
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
        {erro ? <Text style={styles.erro}>{erro}</Text> : null}
        <View style={styles.botoesCadastrar}>
          {idLimite !== 0 ?
            <View style={styles.botoesCadastrarUnidade}>
              <AppPressable
                text={"Cancelar"}
                action={handleCancelar}
              />
            </View> : null}
          <View style={styles.botoesCadastrarUnidade}>
            <AppPressable
              text={idLimite === 0 ? "Cadastrar" : "Salvar edição"}
              action={handleSalvarLimite}
            />
          </View>

        </View>
      </View>

      <View style={styles.subContainerConsultar}>
        <AppTitle text={"Consultar"}/>
        <AppSelectMesAnoInput label={"Período"} editable={true} mes={mesConsulta} mesLista={mesListaConsulta} onMesChange={setMesConsulta} ano={anoConsulta} anoLista={anoListaConsulta} onAnoChange={setAnoConsulta}/>
        {limiteConsulta == null ? <AppTitle text={"Sem limite cadastrado"}/> :
          <AppLimiteCard
            valor={limiteConsulta.valor}
            editAction={() => handleEditarLimite(limiteConsulta)}
            removeAction={() => handleModalDeRemocao(limiteConsulta)}
            mes={limiteConsulta.mes}
            ano={limiteConsulta.ano}
          />}
      </View>

    </ScrollView>
  )
}