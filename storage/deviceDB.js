import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const storeData = async (value) => {
  try {
    await AsyncStorage.setItem(value.id, value);
  } catch (e) {
    Alert.alert("An Error Occurred!", e, [{ text: "Okay" }]);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? value : null;
  } catch (e) {
    Alert.alert("An Error Occurred!", e, [{ text: "Okay" }]);
  }
};
