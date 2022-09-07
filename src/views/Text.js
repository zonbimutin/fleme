import { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'

import MlkitOcr from 'react-native-mlkit-ocr'

function TextView({ route }) {
  const { source } = route.params
  const [result, setResult] = useState(null)

  console.log(MlkitOcr)

  const handleResult = async () => {
    const res = await MlkitOcr.detectFromUri(source.uri)
    console.log(await res)
  }

  console.log(source)
  console.log(result)

  useEffect(() => {
    if (!source) return
    handleResult()
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{ uri: source.uri }} style={{ width: 40, height: 40 }} />
      {result?.map((block) => {
        return block.lines.map((line) => {
          return (
            <View key={line.text}>
              <Text style={{ fontSize: 10 }}>{line.text}</Text>
            </View>
          )
        })
      })}
    </View>
  )
}

export default TextView
