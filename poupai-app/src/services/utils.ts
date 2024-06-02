/* exemplo de uso em AppSelectMesAnoInput.tsx e Limit.tsx */
export const MESES = [
  {name: 'Janeiro', value: 1},
  {name: 'Fevereiro', value: 2},
  {name: 'Março', value: 3},
  {name: 'Abril', value: 4},
  {name: 'Maio', value: 5},
  {name: 'Junho', value: 6},
  {name: 'Julho', value: 7},
  {name: 'Agosto', value: 8},
  {name: 'Setembro', value: 9},
  {name: 'Outubro', value: 10},
  {name: 'Novembro', value: 11},
  {name: 'Dezembro', value: 12}
];

export const ICONES = [
  "receipt",
  "basket",
  "car",
  "bus",
  "briefcase",
  "cafe",
  "beer",
  "book",
  "bed",
  "calendar",
  "card",
  "camera",
  "call",
  "dice",
  "document-sharp",
  "barbell",
  "bicycle",
  "boat",
  "fish",
  "game-controller",
  "musical-notes-sharp",
  "airplane",
  "bandage",
  "bowling-ball",
  "balloon",
  "build",
  "bulb",
  "american-football",
  "analytics",
  "bag-handle",
  "brush"
];


export function formatarMoeda(value: number) {
  return value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
}

export function getMesAtual() {
  const mes = (new Date().getMonth() + 1).toString()
  return mes
}

export function getAnoAtual() {
  const ano = new Date().getFullYear().toString()
  return ano
}

export function isMesAnoIgualOuPosteriorADataAtual(mes: number, ano: number) {
  const mesAtual = parseInt(getMesAtual())
  const anoAtual = parseInt(getAnoAtual())
  const dataAtual = new Date(anoAtual, mesAtual)
  const dataDespesa = new Date(ano, mes)
  return dataDespesa >= dataAtual
}