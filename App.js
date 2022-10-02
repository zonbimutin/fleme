import React, {useState, useMemo} from 'react'
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native'

import {Colors} from 'react-native/Libraries/NewAppScreen'
import Home from './src/screens/Home'
import TextDetection from './src/screens/TextDetection'
import OrcContext from './src/context/OrcContext'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

export default function App() {
  // CONTEXT
  const [orc, setOrc] = useState(null)

  // NAVIGATION STACK
  const Stack = createNativeStackNavigator()

  // COLOR SCHEMA
  const isDarkMode = useColorScheme() === 'dark'

  // OCR DATA
  const orcData = useMemo(
    () => ({
      orc,
      setOrc,
    }),
    [orc],
  )

  const backgroundStyle = {
    backgroundColor: Colors.darker,
    flex: 1,
  }

  return (
    <OrcContext.Provider value={orcData}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Detail"
              component={TextDetection}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </OrcContext.Provider>
  )
}
