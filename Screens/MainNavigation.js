// MainNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from './Welcome';
import Login from './Login';
import Register from './Register';
import TabNavigation from './TabNavigation';

import Course from './TabNavScreen/Home/Course';
import CourseContent from './TabNavScreen/Home/CourseContent';
import Quiz from './TabNavScreen/Quiz/Quiz';
import Quiz2 from './TabNavScreen/Quiz/Quiz2';
import Quiz3 from './TabNavScreen/Quiz/Quiz3';
import Score from './TabNavScreen/Quiz/Score';
import Post from './TabNavScreen/Profile/Post';
import CreatePost from './TabNavScreen/Profile/CreatePost';
import Language from './Language';
import Achievement from './TabNavScreen/Profile/Achievement';
import Progress from './TabNavScreen/Profile/Progress';
import QuizScore from './TabNavScreen/Profile/QuizScore';
const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="TabNavigation" component={TabNavigation} options={{ headerShown: false }} />
      <Stack.Screen name="Quiz" component={Quiz} options={{ headerShown: false }} />
      <Stack.Screen name="Language" component={Language} options={{ headerShown: false }} />
      <Stack.Screen name="Course" component={Course} options={{ headerShown: false }} />
      <Stack.Screen name="CourseContent" component={CourseContent} options={{ headerShown: false }} />
      <Stack.Screen name="Quiz2" component={Quiz2} options={{ headerShown: false }} />
      <Stack.Screen name="Quiz3" component={Quiz3} options={{ headerShown: false }} />
      <Stack.Screen name="Score" component={Score} options={{ headerShown: false }} />
      <Stack.Screen name="Post" component={Post} options={{ headerShown: false }} />
      <Stack.Screen name="CreatePost" component={CreatePost} options={{ headerShown: false }} />
      <Stack.Screen name="Achievement" component={Achievement} options={{ headerShown: false }} />
      <Stack.Screen name="Progress" component={Progress} options={{ headerShown: false }} />
      <Stack.Screen name="QuizScore" component={QuizScore} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
