import {Text, TextInput, View} from "react-native";
import {styles} from "./AppDespesaCardStyle";
import {formatarMoeda} from "../../services/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as React from "react";
import AppEditarRemoverPressable from "../appEditarRemoverPressables/AppEditarRemoverPressable";

interface AppinputProps {
  descricao: string;
  valor: number;
  editAction?: () => void;
  removeAction?: () => void;
}

export default function AppDespesaCard({descricao, valor, removeAction, editAction}: AppinputProps) {
  return (
    <View style={styles.container}>
      <View style={styles.rowConteudo}>
        <Ionicons name={"receipt"} size={40} color={"black"}/>
        <View style={styles.columnDescricaoValor}>
          <Text style={styles.descricao}>
            {descricao}
          </Text>
          <Text style={styles.valor}>
            {formatarMoeda(valor)}
          </Text>
        </View>
      </View>
      <AppEditarRemoverPressable editAction={editAction} removeAction={removeAction}/>
    </View>
  );
}