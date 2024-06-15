import AsyncStorage from "@react-native-async-storage/async-storage";

export const url: string = 'http://192.168.0.4:8080';

export const getToken = async () => {
  const hardCodedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4NDc0MzU1LCJleHAiOjE4MDQ4NzQzNTV9.bp0pkSVvYAOA9n7LO_6aLaB3cVj00H-VGWEUNESN6Lo'
  return hardCodedToken;
  // return await AsyncStorage.getItem("token");
}
