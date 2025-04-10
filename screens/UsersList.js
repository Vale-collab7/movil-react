import React, { useState, useCallback } from "react";
import { Button } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const UserScreen = (props) => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const res = await axios.get("http://192.168.20.126:3000/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadUsers();
    }, [])
  );

  return (
    <ScrollView>
      <Button
        onPress={() => props.navigation.navigate("CreateUserScreen")}
        title="Crear Usuario"
      />
      {users.length === 0 ? (
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>No hay usuarios disponibles</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ) : (
        users.map((user) => (
          <ListItem
            key={user.id}
            bottomDivider
            onPress={() =>
              props.navigation.navigate("UserDetailScreen", {
                userId: user.id,
              })
            }
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri:"https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{user.name}</ListItem.Title>
              <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))
      )}
    </ScrollView>
  );
};

export default UserScreen;
