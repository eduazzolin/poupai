import AsyncStorage from "@react-native-async-storage/async-storage";

export const url: string = 'http://192.168.0.4:8080';

export const getToken = async () => {
  const hardCodedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MzE5OTk1LCJleHAiOjE4MDQ3MTk5OTV9.1zQnI1snoNah3PvvIvNXiH7OUXwqzbvgYRFbysaU4MY'
  return hardCodedToken;
  // return await AsyncStorage.getItem("token");
}
