import {Text, View, StyleSheet, Image} from 'react-native'

const styles = StyleSheet.create({
  view: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 64,
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
  },
})

const Hero = ({hero}) => {
  const {title, subtitle, text} = hero
  return (
    <View style={styles.view}>
      <Image style={styles.logo} source={require('../assets/logo.webp')} />
      {title && <Text style={styles.title}>{title}</Text>}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  )
}

export default Hero
