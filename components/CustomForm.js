import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import DatePicker from "react-native-datepicker";

const CustomForm = ({ onSubmit, initialValues }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [amount, setAmount] = useState(initialValues.amount);
  const [note, setNote] = useState(initialValues.note);
  const [date, setDate] = useState(initialValues.date);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorAmount, setErrorAmount] = useState("");
  const [errorNote, setErrorNote] = useState("");

  const submit = () => {
    if (!title) {
      setErrorTitle("Required");
    }
    if (!amount || isNaN(amount)) {
      setErrorAmount("Amount must be a number");
    }
    if (!note) {
      setErrorNote("Required");
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        onChange={() => setErrorTitle("")}
      />
      {errorTitle ? (
        <Text style={{ color: "red", marginLeft: 5 }}>{errorTitle}</Text>
      ) : null}
      <TextInput
        placeholder="₹"
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        onChange={() => setErrorAmount("")}
      />
      {errorAmount ? (
        <Text style={{ color: "red", marginLeft: 5 }}>{errorAmount}</Text>
      ) : null}
      <TextInput
        placeholder="Note"
        style={styles.input}
        value={note}
        onChangeText={setNote}
        onChange={() => setErrorNote("")}
      />
      {errorNote ? (
        <Text style={{ color: "red", marginLeft: 5 }}>{errorNote}</Text>
      ) : null}
      <DatePicker
        style={{ width: 200 }}
        date={date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2025-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: "absolute",
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 36,
          },
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {
          setDate(date);
        }}
      />
      <View style={styles.button}>
        <Button title="Add Expense" onPress={() => submit()} />
      </View>
    </View>
  );
};

CustomForm.defaultProps = {
  initialValues: {
    title: "",
    amount: "",
    note: "",
    date: "",
  },
};

const styles = StyleSheet.create({
  input: {
    width: 220,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
    padding: 5,
    margin: 5,
  },
  button: { width: 130, left: 50 },
});

export default CustomForm;
