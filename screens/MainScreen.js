import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import CustomForm from "../components/CustomForm";

const MainScreen = () => {
  return (
    <View style={styles.cotainer}>
      <View style={styles.header}>
        <Text style={styles.textOne}>My Expenses</Text>
        <Text style={styles.textTwo}>0</Text>
      </View>
      <View style={styles.form}>
        <CustomForm />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  header: {
    flexDirection: "row",
  },
  textOne: { right: 80, bottom: 190, fontSize: 25 },
  textTwo: { left: 140, bottom: 190, fontSize: 25 },
  form: { bottom: 120 },
});

export default MainScreen;
