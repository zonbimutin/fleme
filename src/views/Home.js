import { View, Text, Button } from 'react-native'

function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Take a photo"
        onPress={() => navigation.navigate('Camera')}
      />
    </View>
  )
}

export default Home
