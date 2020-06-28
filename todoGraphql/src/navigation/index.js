import React from "react";
import { Animated } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "../screens/Splash";
import Main from "../screens/Main";
import Detail from "../screens/Detail";
import Add from "../screens/Add";

const MainStack = createStackNavigator();

const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity },
  };
};

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <MainStack.Screen
        name="Splash"
        component={Splash}
        options={{ cardStyleInterpolator: forFade }}
      />
      <MainStack.Screen
        name="Main"
        component={Main}
        options={{ cardStyleInterpolator: forFade }}
      />
      <MainStack.Screen
        name="Detail"
        component={Detail}
        options={{ cardStyleInterpolator: forFade }}
      />
      <MainStack.Screen
        name="Add"
        component={Add}
        options={{ cardStyleInterpolator: forFade }}
      />
    </MainStack.Navigator>
  );
};

const AppContainer = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};
export default AppContainer;
