import {styles} from './ExpenseStyle';
import {ScrollView, View} from 'react-native';
import AppTitle from "../../component/appTitle/AppTitle";
import AppMoneyInput from "../../component/appMoneyInput/AppMoneyInput";
import AppTextInput from "../../component/appTextInput/AppTextInput";
import * as React from "react";
import {useEffect, useState} from "react";
import {ICONES, MESES, getAnoAtual, getMesAtual} from "../../services/utils";
import AppSelectMesAnoInput from "../../component/appSelectMesAnoInput/AppSelectMesAnoInput";
import AppPressable from "../../component/appPressable/AppPressable";
import AppDespesaCard from "../../component/appDespesaCard/AppDespesaCard";
import AppIconeInput from "../../component/appIconeInput/AppIconeInput";
import AppIconeModal from "../../component/appIconeModal/AppIconeModal";
import {getDespesasPorMes, salvarDespesa} from "../../services/despesaService";
import {useRef} from 'react';

export default function Expense() {

  /*
   * ------------------------------------------------------------------
   * variáveis useEffect()
   * ------------------------------------------------------------------
   */
  const [despesas, setDespesas] = useState([])
  const [modalVisible, setModalVisible] = useState(false)

  const [idDespesa, setIdDespesa] = useState(0)
  const [icone, setIcone] = useState("receipt")
  const [descricao, setDescricao] = useState("")
  const [valor, setValor] = useState(0)
  const [mesCadastro, setMesCadastro] = useState(getMesAtual())
  const [anoCadastro, setAnoCadastro] = useState(getAnoAtual())
  const mesListaCadastro = MESES
  const anoListaCadastro = ["2024", "2025", "2026", "2027", "2028"]

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
      const despesas = await getDespesasPorMes(mesConsulta, anoConsulta)
      setDespesas(despesas)
    } catch (error) {
      setDespesas([])
      console.log("Erro ao buscar despesas", error)
    }
  }

  useEffect(() => {
    mountPage();
  }, [mesConsulta, anoConsulta]);

  const scrollViewRef = useRef(null);
  const handleScrollToTop = () => {
    scrollViewRef.current?.scrollTo({y: 0, animated: true});
  };


  /*
   * ------------------------------------------------------------------
   * funções auxiliares
   * montar objetos, modificar funções de estado, etc
   * ------------------------------------------------------------------
   */
  function incorporarDespesaObjeto(despesaObjeto) {
    if (despesaObjeto === null) {
      setIdDespesa(0)
      setIcone("receipt")
      setDescricao("")
      setValor(0)
      setMesCadastro(getMesAtual())
      setAnoCadastro(getAnoAtual())
      return
    }
    setIdDespesa(despesaObjeto.id)
    setIcone(despesaObjeto.icone)
    setDescricao(despesaObjeto.descricao)
    setValor(despesaObjeto.valor)
    setMesCadastro(despesaObjeto.mes.toString())
    setAnoCadastro(despesaObjeto.ano.toString())
  }

  function montarDespesaObjeto() {
    return {
      id: idDespesa,
      icone: icone,
      descricao: descricao,
      valor: valor,
      mes: parseInt(mesCadastro),
      ano: parseInt(anoCadastro)
    }
  }

  function handleCancelar() {
    incorporarDespesaObjeto(null)
  }

  /*
   * ------------------------------------------------------------------
   * funções de CRUD
   * salvar, remover, editar, etc
   * ------------------------------------------------------------------
   */
  const removerDespesa = (despesaObjeto) => {
    console.log("Remover despesa", despesaObjeto.id)
  }

  const handleEditarDespesa = (despesaObjeto) => {
    handleScrollToTop()
    incorporarDespesaObjeto(despesaObjeto);
  }

  const handleSalvarDespesa = async () => {
    //ToDo
    const despesaObjeto = montarDespesaObjeto();
    try {
      await salvarDespesa(despesaObjeto)
      incorporarDespesaObjeto(null)
      mountPage()
    } catch (error) {
      console.log("Erro ao salvar despesa", error)
    }
  }


  /*
   * ------------------------------------------------------------------
   * View
   * ------------------------------------------------------------------
   */
  return (
    <ScrollView ref={scrollViewRef} style={styles.container}>

      <AppIconeModal
        icone={[icone, setIcone]}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={"Escolha um ícone"}
        iconeLista={ICONES}>
      </AppIconeModal>


      <View style={styles.subContainer}>

        <AppTitle text={idDespesa === 0 ? "Cadastrar Despesa" : "Editar Despesa"}/>

        <View style={styles.rowIconeDescricao}>
          <View style={styles.colIcone}>
            <AppIconeInput icone={icone} label={"Ícone"} onPress={() => setModalVisible(true)}/>
          </View>
          <View style={styles.colDescricao}>
            <AppTextInput text={descricao} label={"Descrição"} onValueChange={setDescricao}/>
          </View>
        </View>

        <AppMoneyInput value={valor} label={"Valor"} onValueChange={setValor}/>
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
        <View style={styles.botoesCadastrar}>
          {idDespesa !== 0 ?
            <View style={styles.botoesCadastrarUnidade}>
              <AppPressable
                text={"Cancelar"}
                action={handleCancelar}
              />
            </View> : null}
          <View style={styles.botoesCadastrarUnidade}>
            <AppPressable
              text={idDespesa === 0 ? "Cadastrar" : "Salvar edição"}
              action={handleSalvarDespesa}
            />
          </View>
        </View>

      </View>


      <View style={styles.subContainerHistorico}>
        <AppTitle text={"Histórico"}/>
        <AppSelectMesAnoInput
          label={"Período"}
          editable={true}
          mes={mesConsulta}
          mesLista={mesListaConsulta}
          onMesChange={setMesConsulta}
          ano={anoConsulta}
          anoLista={anoListaConsulta}
          onAnoChange={setAnoConsulta}
        />
        {
          despesas.length === 0 ?
            <AppTitle text={"Nenhuma despesa cadastrada"}/> :
            despesas.map((despesa, index) =>
              <AppDespesaCard
                key={index}
                descricao={despesa.descricao}
                valor={despesa.valor}
                removeAction={() => removerDespesa(despesa)}
                editAction={() => handleEditarDespesa(despesa)}
                icone={despesa.icone}
                mes={despesa.mes}
                ano={despesa.ano}
              />
            )
        }
      </View>

    </ScrollView>
  )
}