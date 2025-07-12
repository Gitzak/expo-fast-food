import { router } from 'expo-router'
import { Button, Text, View } from 'react-native'

const signIn = () => {
  return (
    <View>
      <Text>signIn</Text>
      <Button title="Sign up" onPress={() => router.push('/sign-up')} />
    </View>
  )
}

export default signIn