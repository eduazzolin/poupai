import AsyncStorage from "@react-native-async-storage/async-storage";

export const url: string = 'http://192.168.0.4:8080';

export const getToken = async () => {
  return await AsyncStorage.getItem("token");
}
