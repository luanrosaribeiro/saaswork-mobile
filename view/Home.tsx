import { Button, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import styles from '../assets/style/estilo';

export default function Home() {

  const navigation = useNavigation()

  const logout = () =>{
    auth
    .signOut()
    .then( () => {
      navigation.replace('Login')
    })
  }

  return (
    <ImageBackground source={require('../assets/images/back_login.png')} resizeMode='stretch' style={styles.container}>
        <Text style={styles.titulo}>Bem vindo!</Text>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={logout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
    </ImageBackground>
  );
}

