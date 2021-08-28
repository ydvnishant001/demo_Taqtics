import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import DatePicker from "react-native-datepicker";
import moment from "moment";

const CustomForm = ({
  curId,
  onSubmit,
  curTitle,
  curAmount,
  curNote,
  curDate,
  showModal,
}) => {
  const NewDate = moment().format("YYYY-MM-DD");
  const [title, setTitle] = useState(curTitle ? curTitle : "");
  const [amount, setAmount] = useState(curAmount ? curAmount : "");
  const [note, setNote] = useState(curNote ? curNote : "");
  const [date, setDate] = useState(curDate ? curDate : NewDate);
  const [error, setError] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorAmount, setErrorAmount] = useState("");
  const [errorNote, setErrorNote] = useState("");

  const submit = () => {
    if (!title) {
      setErrorTitle("Required");
      setError(true);
    }
    if (!amount || isNaN(amount)) {
      setErrorAmount("Amount must be a number");
      setError(true);
    }
    if (!note) {
      setErrorNote("Required");
      setError(true);
    }
    if (error) {
      setError(false);
      return;
    }
    if (title && amount && !isNaN(amount) && note && date) {
      const id = Math.random().toString();
      onSubmit(id, title, amount, note, date);
      setTitle("");
      setAmount("");
      setNote("");
      setDate(NewDate);
    }
  };

  const update = () => {
    if (!title) {
      setErrorTitle("Required");
      setError(true);
    }
    if (!amount || isNaN(amount)) {
      setErrorAmount("Amount must be a number");
      setError(true);
    }
    if (!note) {
      setErrorNote("Required");
      setError(true);
    }
    if (error) {
      setError(false);
      return;
    }
    if (curId && title && amount && !isNaN(amount) && note && date) {
      onSubmit(curId, title, amount, note, date);
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
        style={{
          width: 220,
          left: 4,
          top: 5,
        }}
        date={date}
        mode="date"
        placeholder="Date"
        format="YYYY-MM-DD"
        showIcon={false}
        onDateChange={(date) => {
          setDate(date);
        }}
      />
      <View style={styles.submit}>
        <Button
          title={showModal ? "Update" : "Add Expense"}
          onPress={() => {
            if (showModal) {
              update();
            } else {
              submit();
            }
          }}
        />
      </View>
      {showModal ? (
        <View style={styles.cancel}>
          <Button
            title="Cancel"
            onPress={() => {
              showModal(false);
            }}
          />
        </View>
      ) : null}
    </View>
  );
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
  submit: { width: 130, left: 50, top: 20 },
  cancel: { width: 130, left: 50, top: 30 },
});

export default CustomForm;
