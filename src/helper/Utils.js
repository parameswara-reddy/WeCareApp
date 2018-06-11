import { AsyncStorage } from 'react-native';
export const getGreeting = () => {
  var today = new Date();
  var curHr = today.getHours();

  if (curHr < 12) {
    return "Good morning";
  } else if (curHr < 18) { 
    return "Good afternoon";
  } else {
    return "Good evening";
  }
};

export const saveValue = async (key, data) => {
  await AsyncStorage.setItem(`WE_CARE_${key}`, JSON.stringify(data));
}
export const getValue = async (key) => {
  return await AsyncStorage.getItem(`WE_CARE_${key}`, "");
}
