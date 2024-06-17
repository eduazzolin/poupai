import AsyncStorage from "@react-native-async-storage/async-storage";

export const url: string = 'http://10.10.102.58:8080';

export const getToken = async () => {
  return await AsyncStorage.getItem("token");
}
