import AsyncStorage from "@react-native-async-storage/async-storage";

export const url: string = 'http://192.168.0.4:8080';

export const getToken = async () => {
  const hardCodedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4NDcxMjMxLCJleHAiOjE4MDQ4NzEyMzF9.limzsVdVhGzqWstLpYoSbBwBWX8hHixGxzkLwclj9Hg'
  return hardCodedToken;
  // return await AsyncStorage.getItem("token");
}
