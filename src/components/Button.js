import React from 'react'
import {Text, StyleSheet, TouchableOpacity} from 'react-native'

export default function ({onPress, title}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title ?? 'Press Here'}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#fd4766',
    marginLeft: 5,
    marginRight: 5,
    width: 150,
  },
  text: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center',
  },
})
