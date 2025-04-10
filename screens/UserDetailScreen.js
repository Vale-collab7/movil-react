import React, { useEffect, useState } from "react";
import {ScrollView, Button, View, Alert, ActivityIndicator, StyleSheet,TextInput,} from "react-native";
import axios from "axios";

const UserDetailScreen = (props) => {
  const initialState = {
    id: "",
    name: "",
    email: "",
    phone: "",
  };

  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setUser({ ...user, [prop]: value });
  };

  const getUserById = async (id) => {
    try {
      const res = await axios.get(`http://192.168.20.126:3000/users/${id}`);
      setUser({ ...res.data, id: id });
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener el usuario:", error.message);
      Alert.alert("Error", "No se pudo cargar el usuario.");
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    setLoading(true);
    try {
      await axios.delete(`http://192.168.20.126:3000/users/${user.id}`);
      Alert.alert("Usuario eliminado");
      props.navigation.navigate("UsersList");
    } catch (error) {
      console.error("Error al eliminar el usuario:", error.message);
      Alert.alert("Error", "No se pudo eliminar el usuario.");
    }
    setLoading(false);
  };

  const updateUser = async () => {
    try {
      await axios.put(`http://192.168.20.126:3000/users/${user.id}`, {
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
      Alert.alert("Usuario actualizado correctamente");
      props.navigation.navigate("UsersList");
    } catch (error) {
      console.error("Error al actualizar el usuario:", error.message);
      Alert.alert("Error", "No se pudo actualizar el usuario.");
    }
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Eliminar usuario",
      "¿Estás seguro que deseas eliminar este usuario?",
      [
        { text: "Sí", onPress: () => deleteUser() },
        { text: "No", onPress: () => console.log("Cancelado") },
      ],
      {
        cancelable: true,
      }
    );
  };

  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder="Nombre"
          autoComplete="name"
          style={styles.inputGroup}
          value={user.name}
          onChangeText={(value) => handleTextChange(value, "name")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Email"
          autoComplete="email"
          style={styles.inputGroup}
          value={user.email}
          onChangeText={(value) => handleTextChange(value, "email")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Teléfono"
          autoComplete="tel"
          style={styles.inputGroup}
          value={user.phone}
          onChangeText={(value) => handleTextChange(value, "phone")}
        />
      </View>
      <View style={styles.btn}>
        <Button
          title="Eliminar"
          onPress={openConfirmationAlert}
          color="#E37399"
        />
      </View>
      <View>
        <Button title="Actualizar" onPress={updateUser} color="#19AC52" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
});

export default UserDetailScreen;
