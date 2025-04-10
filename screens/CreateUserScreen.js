import React, { useState } from "react";
import { Button, View, StyleSheet, TextInput, ScrollView } from "react-native";
import axios from "axios";

const CreateUserScreen = ({ navigation }) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChangeText = (value, field) => {
    setState({ ...state, [field]: value });
  };

  const saveNewUser = async () => {
    if (state.name === "") {
      alert("Por favor ingrese un nombre");
    } else {
      try {
        await axios.post("http://192.168.20.126:3000/users", state);
        navigation.navigate("UsersList");
      } catch (error) {
        console.log("Error al guardar usuario:", error.message);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name"
          onChangeText={(value) => handleChangeText(value, "name")}
          value={state.name}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email"
          onChangeText={(value) => handleChangeText(value, "email")}
          value={state.email}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Phone"
          onChangeText={(value) => handleChangeText(value, "phone")}
          value={state.phone}
        />
      </View>

      <View style={styles.button}>
        <Button title="Save User" onPress={saveNewUser} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  button: {
    marginTop: 20,
  },
});

export default CreateUserScreen;
