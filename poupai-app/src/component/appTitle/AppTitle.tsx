import {Text, TextInput, View} from "react-native";
import {styles} from "./AppTitleStyle";


interface AppinputProps {
  text: string;
}

export default function AppTitle({text}: AppinputProps) {
  return (
    <Text style={styles.title}>
      {text}
    </Text>
  );
}