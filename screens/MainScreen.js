import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import CustomForm from "../components/CustomForm";

const MainScreen = () => {
  const [modalItem, setModalItem] = useState("");
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [toggleModal, setToggleModal] = useState(false);

  const getTotal = () => {
    var num = 0;
    if (data.length === 0) {
      setTotal(0);
      return;
    }
    if (data.length > 0) {
      for (var i = 0; i < data.length; i++) {
        num = num + +data[i].amount;
      }
      setTotal(num);
    }
  };

  useEffect(() => {
    var num = 0;
    if (data.length === 0) {
      setTotal(0);
      return;
    }
    if (data.length > 0) {
      for (var i = 0; i < data.length; i++) {
        num = num + +data[i].amount;
      }
      setTotal(num);
    }
  }, [data]);

  const getData = (id, title, amount, note, date) => {
    if (data.length > 0) {
      const exist = data.find((item) => item.id === id);
      if (exist) {
        let index = data.findIndex((item) => item.id === id);
        const newData = data;
        newData.splice(index, 1, {
          id: id,
          title: title,
          amount: amount,
          note: note,
          date: date,
        });
        setData(newData);
        getTotal();
        setToggleModal(false);
        return;
      }
    }
    setData((prev) => {
      return [
        ...prev,
        {
          id: id,
          title: title,
          amount: amount,
          note: note,
          date: date,
        },
      ];
    });
  };

  return (
    <View style={styles.cotainer}>
      <View style={styles.header}>
        <Text style={styles.textOne}>My Expenses</Text>
        <Text style={styles.textTwo}>{total}</Text>
      </View>
      <View style={styles.form}>
        <CustomForm onSubmit={getData} />
      </View>
      <SafeAreaView style={styles.list}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View style={styles.items}>
                <View style={styles.data}>
                  <TouchableOpacity
                    style={styles.edit}
                    onPress={() => {
                      console.log(item);
                      setModalItem(item);
                      setToggleModal(true);
                    }}
                  >
                    <Ionicons name="pencil" size={30} color="black" />
                  </TouchableOpacity>
                  <View>
                    <Modal isVisible={toggleModal}>
                      <View style={styles.modal}>
                        <CustomForm
                          curId={modalItem.id}
                          onSubmit={getData}
                          curTitle={modalItem.title}
                          curAmount={modalItem.amount}
                          curNote={modalItem.note}
                          curDate={modalItem.date}
                          showModal={setToggleModal}
                        />
                      </View>
                    </Modal>
                  </View>
                  <Text style={styles.text}>{item.date}</Text>
                  <Text style={styles.text}>{item.title}</Text>
                  <Text style={styles.text}>NOTE: {item.note}</Text>
                  <View style={styles.amount}>
                    <Text>₹ {item.amount}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.delete}
                    onPress={() => {
                      setData(data.filter((node) => node.id !== item.id));
                      getTotal();
                    }}
                  >
                    <Ionicons name="close-circle" size={40} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: 450,
    borderWidth: 2,
    borderColor: "black",
  },
  header: {
    bottom: 30,
    flexDirection: "row",
    width: 370,
    justifyContent: "space-between",
  },
  textOne: { fontSize: 25 },
  textTwo: { fontSize: 25 },
  form: {
    left: 70,
    width: 250,
  },
  modal: {
    left: 70,
    width: 250,
    height: 400,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  list: {
    //position: "absolute",
    top: 90,
    height: 330,
    width: 380,
  },
  items: {
    right: 25,
    width: 350,
    marginVertical: 15,
    marginHorizontal: 40,
    height: 140,
    justifyContent: "space-between",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  data: { bottom: 30 },
  text: {
    marginVertical: 10,
    marginBottom: 2,
    marginHorizontal: 10,
    left: 50,
    top: 15,
  },
  amount: {
    left: 255,
    bottom: 70,
  },
  edit: {
    alignItems: "center",
    justifyContent: "center",
    top: 80,
    width: 50,
  },
  delete: {
    alignItems: "center",
    justifyContent: "center",
    left: 300,
    width: 50,
    bottom: 70,
  },
});

export default MainScreen;
