import AsyncStorage from "@react-native-async-storage/async-storage";

export const url: string = 'http://192.168.0.4:8080';

export const getToken = async () => {
  const hardCodedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MzIyMzczLCJleHAiOjE4MDQ3MjIzNzN9.w1GSPfocX8m2jgwmt_IDDZWUEOs8x2rQmzOaImoktVU'
  return hardCodedToken;
  // return await AsyncStorage.getItem("token");
}
