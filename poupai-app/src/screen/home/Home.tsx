import React, { useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./HomeStyle";
import { getAnoAtual, getMesAtual, MESES } from "../../services/utils";
import AppSelectMesAnoInput from "../../component/appSelectMesAnoInput/AppSelectMesAnoInput";

export default function Home() {
  const [mesConsulta, setMesConsulta] = useState(getMesAtual());
  const [anoConsulta, setAnoConsulta] = useState(getAnoAtual());
  const mesListaConsulta = MESES;
  const anoListaConsulta = ["2021", "2022", "2023", "2024", "2025"];

  const progresso = 500;
  const meta = 2000;

  let emoji = "😊";
  let message = "Você conseguiu";

  if (meta === 0 as number) {
    emoji = "🤔";
    message = "Hmmmmmmm";
  } else if (progresso < meta) {
    emoji = "🤩";
    message = `Você economizou ${meta - progresso} reais!!`;
  } else if (progresso >= meta) {
    emoji = "😢";
    message = "Se ferrou";
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá NOME AQUI!!</Text>
      </View>
      <View style={styles.selectContainer}>
        <AppSelectMesAnoInput
          label={"Selecione um período"}
          editable={true}
          mes={mesConsulta}
          mesLista={mesListaConsulta}
          onMesChange={setMesConsulta}
          ano={anoConsulta}
          anoLista={anoListaConsulta}
          onAnoChange={setAnoConsulta}
        />
      </View>
      <View style={styles.emojiContainer}>
        <View style={styles.emojiBackground}>
          <Text style={styles.emoji}>{emoji}</Text>
          <Text style={styles.emojiText}>{message}</Text>
        </View>
      </View>
      <View style={styles.progressSection}>
        <Text style={styles.progressoText}>Progresso</Text>
        <Text style={styles.metaText}>{progresso} / {meta}</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${(progresso / meta) * 100}%` }]}></View>
      </View>
    </View>
  );
}
