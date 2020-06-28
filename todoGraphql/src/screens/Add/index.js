import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { useMutation } from "@apollo/react-hooks";

import { createTodo } from "../../query";

const Add = (props) => {
  const [priority, setPriority] = useState();
  const [description, setDescription] = useState();
  const [createTodoFunc, { data: createTodoData }] = useMutation(createTodo);

  useEffect(() => {
    if (createTodoData) {
      if (createTodoData.createTodo.id) {
        Alert.alert("", "Todo created");
        props.navigation.goBack();
      }
    }
  }, [createTodoData]);

  const handleCreate = () => {
    let temp = 1;
    if (priority) {
      temp = parseInt(priority, 10);
    }
    createTodoFunc({
      variables: {
        description: description,
        priority: temp,
      },
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.topText}>Create Todo</Text>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={styles.closeBtn}
          >
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => handleCreate()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          value={priority}
          style={styles.priorityText}
          onChangeText={(value) => setPriority(value)}
          placeholder="Priority"
          keyboardType="number-pad"
        />
        <TextInput
          multiline={true}
          numberOfLines={5}
          value={description}
          style={styles.descriptionText}
          onChangeText={(value) => setDescription(value)}
          placeholder="Description"
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
    padding: 20,
  },
  topContainer: {
    marginTop: 30,
    textAlign: "center",
  },
  topText: {
    textAlign: "center",
    fontSize: 24,
    color: "white",
  },
  closeBtn: {
    position: "absolute",
    right: 0,
    top: 5,
  },
  closeText: {
    fontSize: 18,
    color: "white",
  },
  priorityText: {
    borderWidth: 1,
    borderColor: "gray",
    fontSize: 16,
    borderRadius: 8,
    padding: 10,
    color: "white",
    textAlignVertical: "top",
    marginTop: 10,
  },
  descriptionText: {
    borderWidth: 1,
    borderColor: "gray",
    fontSize: 16,
    borderRadius: 8,
    padding: 10,
    color: "white",
    textAlignVertical: "top",
    marginTop: 10,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 50,
  },
  completedButton: {
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "gray",
    marginLeft: 10,
    backgroundColor: "white",
  },
  button: {
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "gray",
    marginLeft: 10,
  },
  compledtedText: {
    fontSize: 16,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
});

export default Add;
