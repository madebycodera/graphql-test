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

import { markTodoComplete, updateTodo, deleteTodo } from "../../query";

const Detail = (props) => {
  const [data, setData] = useState({});
  const [priority, setPriority] = useState("1");
  const [description, setDescription] = useState("");
  const [markCompleteFunc, { data: completedData }] = useMutation(
    markTodoComplete
  );
  const [updateTodoFunc, { data: updateTodoData }] = useMutation(updateTodo);
  const [deleteTodoFunc, { data: deleteTodoData }] = useMutation(deleteTodo);

  useEffect(() => {
    setFormData(props.route.params.detail);
    console.log();
  }, [props]);

  useEffect(() => {
    if (completedData) {
      setFormData(completedData.markTodoComplete);
    }
  }, [completedData]);

  useEffect(() => {
    if (updateTodoData) {
      setFormData(updateTodoData.updateTodo);
    }
  }, [updateTodoData]);

  useEffect(() => {
    if (deleteTodoData) {
      if (deleteTodoData.deleteTodo.statusCode === "OK") {
        Alert.alert("", "Todo deleted");
        props.navigation.goBack();
      } else {
        Alert.alert("", deleteTodoData.deleteTodo.message);
      }
    }
  }, [deleteTodoData]);

  const setFormData = (dt) => {
    setData(dt);
    setDescription(dt.description);
    setPriority(dt.priority.toString());
  };

  const handleComplete = () => {
    markCompleteFunc({ variables: { id: data.id } });
    Alert.alert("", "Todo completed");
  };

  const handleUpdate = () => {
    updateTodoFunc({
      variables: {
        id: data.id,
        description: description,
        priority: parseInt(priority, 10),
      },
    });
    Alert.alert("", "Todo updated");
  };

  const handleDelete = () => {
    deleteTodoFunc({
      variables: {
        id: data.id,
      },
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.topText}>Edit Todo</Text>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={styles.closeBtn}
          >
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => handleComplete()}
            style={data.completed ? styles.completedButton : styles.button}
            disabled={data.completed}
          >
            <Text
              style={data.completed ? styles.compledtedText : styles.buttonText}
            >
              {data.completed ? "Completed" : "Complete"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleDelete()}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleUpdate()}
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

export default Detail;
