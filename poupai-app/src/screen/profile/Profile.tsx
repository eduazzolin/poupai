import App from '../../../App';
import { styles } from './ProfileStyle';
import { Text, View } from 'react-native';
import AppTitle from '../../component/appTitle/AppTitle';

export default function Profile() {
  return (
    <View style={styles.container}>
      <AppTitle text="Meus Dados" />

      <Text>Nome: </Text>
      <Text>Email: </Text>
      <Text>Data de Nascimento: </Text>

    </View>
  )
}