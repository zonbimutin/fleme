/* eslint-disable curly */

import React, {useCallback, useEffect} from 'react'
import {launchImageLibrary, launchCamera} from 'react-native-image-picker'
import {Alert, View, StyleSheet} from 'react-native'
import _View from '../components/View'
import Button from '../components/Button'
import Hero from '../components/Hero'
import useOrc from '../hooks/useOrc'

const styles = StyleSheet.create({
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 50,
  },
})

export default function Home({navigation}) {
  const {orc, setOrc} = useOrc()

  const hero = {
    title: '',
    subtitle: 'A Simple Optical Character Recognition',
    text: '',
  }

  const showAlert = msg =>
    Alert.alert('Alert', msg, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ])

  const updateOrcImage = useCallback(
    async response => {
      try {
        const {assets} = response
        if (assets.length < 1) return

        const [image] = assets
        const _orc = {
          image: image,
        }
        setOrc(_orc)
        navigation.navigate('Detail')
      } catch (error) {
        const {errorCode} = response
        if (errorCode === 'camera_unavailable') showAlert('camera unavailable')
      }
    },
    [setOrc, navigation],
  )

  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    }
    launchImageLibrary(options, updateOrcImage)
  }, [updateOrcImage])

  const onCameraPress = useCallback(() => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    }
    launchCamera(options, updateOrcImage)
  }, [updateOrcImage])

  // useEffect(() => {
  //   console.log(orc)
  // }, [orc])
  return (
    <_View>
      <Hero hero={hero} />
      <View style={styles.buttons}>
        <Button
          title={'Select from galery'}
          onPress={() => onImageLibraryPress()}
        />
        <Button title={'Take a picture'} onPress={() => onCameraPress()} />
      </View>
    </_View>
  )
}
