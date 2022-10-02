import {useCallback, useEffect, useState} from 'react'
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import _View from '../components/View'
import Button from '../components/Button'
import useOrc from '../hooks/useOrc'
import MlkitOcr from 'react-native-mlkit-ocr'
import LoadingView from 'react-native-loading-view'

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: '#101010',
    alignItems: 'center',
    paddingTop: 20,
    width: '100%',
  },
  textView: {
    height: 'auto',
    flex: 1,
    width: '100%',
  },
  scrollView: {},
  textDetectionView: {
    // display: 'flex',
    // paddingBottom: 200,
  },
  text: {
    fontSize: 14,
    color: '#ebeaea',
    paddingBottom: 100,
  },
  image: {
    // width: 200,
    height: 200,
    aspectRatio: 1 / 1,
    resizeMode: 'contain',
  },
  imageButton: {
    // height: 300,
    // width: 100,
  },
  buttons: {
    paddingVertical: 20,
  },
  textViewContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fd4766',
    marginBottom: 10,
  },
})

const TextDetection = ({navigation}) => {
  const {orc, setOrc} = useOrc()
  const [detectedText, setDetectedText] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const detectText = useCallback(async uri => {
    try {
      const visionResp = await MlkitOcr.detectFromUri(uri)
      setDetectedText(visionResp)
    } catch (e) {
      console.warn(e)
    }
  }, [])

  useEffect(() => {
    const {image} = orc

    if (!image) {
      return
    }
    detectText(image.uri)
  })

  return (
    <View style={styles.mainView}>
      <View style={styles.textView}>
        <LoadingView loading={!detectedText}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.textViewContainer}>
              <View style={{marginBottom: 20}}>
                <Text style={styles.title}>Preview:</Text>
                <TouchableOpacity
                  style={styles.imageButton}
                  onPress={() => setShowModal(true)}>
                  <Image source={orc.image} style={styles.image} />
                </TouchableOpacity>
                {/* <Modal
                  animationType="slide"
                  transparent={true}
                  visible={showModal}
                  onRequestClose={() => {
                    setShowModal(!showModal)
                  }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <ImageViewer imageUrls={[orc.image.uri]} />
                    </View>
                    <Button title="Back" onPress={() => console.log('hey')} />
                  </View>
                </Modal> */}
              </View>
              <View>
                <Text style={styles.title}>Text detection:</Text>
                {detectedText?.length ? (
                  <>
                    <Text
                      style={styles.text}
                      selectable={true}
                      selectionColor="orange">
                      {detectedText.map(detection => {
                        return detection.text + '\n'
                      })}
                    </Text>
                  </>
                ) : (
                  <Text style={styles.text}>
                    There is no text found in the image.
                  </Text>
                )}
              </View>
            </View>
          </ScrollView>
        </LoadingView>
      </View>
      <View style={styles.buttons}>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    </View>
  )
}

export default TextDetection
