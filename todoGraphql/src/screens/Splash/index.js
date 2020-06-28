import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const Splash = (props) => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate("Main");
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.topText}>Todo demo</Text>
      <Text style={styles.bottomText}>Built by Shing Ho Tan</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 50,
    paddingTop: 100,
    backgroundColor: "#212121",
  },
  topText: {
    fontSize: 30,
    textAlign: "center",
    color: "white",
  },
  bottomText: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
});

export default Splash;
