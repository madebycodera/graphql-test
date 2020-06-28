import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Query } from "react-apollo";
import RNPickerSelect from "react-native-picker-select";

import { listTodo } from "../../query";
import { orderByFields, sortByFields, completedFields } from "./fields";

const TodoList = ({ navigation, ...props }) => {
  return (
    <Query query={listTodo} fetchPolicy="network-only" variables={{ ...props }}>
      {({ loading, error, data }) => {
        if (loading) return <Text style={styles.normalText}>Loading...</Text>;
        if (error)
          return <Text style={styles.normalText}>{error.toString()}</Text>;
        if (data)
          return (
            <View style={styles.todoContainer}>
              {data.listTodo.length ? (
                <ScrollView
                  style={styles.scrollContainer}
                  showsVerticalScrollIndicator={false}
                >
                  {data.listTodo.map((each) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Detail", { detail: each })
                        }
                        key={each.id}
                        style={styles.eachContainer}
                      >
                        <View style={styles.dateTickContainer}>
                          <Text
                            style={styles.descriptionText}
                            numberOfLines={1}
                          >
                            {each.description}
                          </Text>
                          <Text style={styles.normalText}>{each.priority}</Text>
                        </View>
                        <View style={styles.dateTickContainer}>
                          <Text style={styles.normalText}>
                            {new Date(each.createdAt).toLocaleString()}
                          </Text>
                          <Text style={styles.normalText}>
                            {each.completed ? "✓" : "✘"}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              ) : (
                <Text style={styles.noTodoText}>No Todo</Text>
              )}
            </View>
          );
      }}
    </Query>
  );
};

const Main = (props) => {
  const [orderBy, setOrderBy] = useState();
  const [sortBy, setSortBy] = useState();
  const [completed, setCompleted] = useState();
  const [todoKey, setTodoKey] = useState(1);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      setTodoKey((prev) => prev + 1);
    });
    return unsubscribe;
  }, [props.navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.topText}>Todo List</Text>
      <View>
        <RNPickerSelect
          onValueChange={(value) => setOrderBy(value)}
          items={orderByFields}
          placeholder={{ label: "Order By", value: null }}
          style={{
            viewContainer: styles.pickerContainer,
          }}
          Icon={() => <View />}
        />

        <RNPickerSelect
          onValueChange={(value) => setSortBy(value)}
          items={sortByFields}
          placeholder={{ label: "Sort By", value: null }}
          style={{
            viewContainer: styles.pickerContainer,
          }}
          Icon={() => <View />}
        />

        <RNPickerSelect
          onValueChange={(value) => setCompleted(value)}
          items={completedFields}
          placeholder={{ label: "Completed Status", value: null }}
          style={{
            viewContainer: styles.pickerContainer,
          }}
          Icon={() => <View />}
        />
      </View>
      <TodoList
        key={todoKey}
        orderBy={orderBy}
        sortBy={sortBy}
        completed={completed}
        style={styles.todoContainer}
        navigation={props.navigation}
      />
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Add")}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>Add Todo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
    padding: 20,
  },
  topText: {
    marginTop: 30,
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
  scrollContainer: {
    marginTop: 30,
  },
  normalText: {
    fontSize: 16,
    color: "white",
  },
  noTodoText: {
    fontSize: 20,
    color: "white",
    marginTop: 20,
  },
  descriptionText: {
    width: "80%",
    fontSize: 16,
    color: "white",
  },
  eachContainer: {
    padding: 20,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
  },
  dateTickContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  todoContainer: {
    flex: 1,
  },
  addButton: {
    padding: 10,
    borderRadius: 8,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 20,
  },
  addButtonText: {
    textAlign: "center",
    color: "white",
  },
  pickerContainer: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
});

export default Main;
