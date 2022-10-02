/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useEffect} from 'react'
import {Animated} from 'react-native'

export default ({children}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])
  return (
    <Animated.View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        paddingHorizontal: 20,
        backgroundColor: '#101010',
        opacity: fadeAnim,
      }}>
      {children}
    </Animated.View>
  )
}
