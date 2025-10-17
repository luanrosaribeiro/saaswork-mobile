import { useEffect, useState } from 'react';
import { Text, View, KeyboardAvoidingView, TouchableOpacity, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-paper';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import styles from '../assets/style/estilo';
import { browserLocalPersistence, setPersistence } from 'firebase/auth';

export default function Login() {
  const[email, setEmail] = useState('')
  const[senha, setSenha] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const logado = auth.onAuthStateChanged( user => {
      if(user) navigation.replace('Menu');
    })
  })

  const logar = () => {
    auth
    .signInWithEmailAndPassword(email, senha)
    .then( userCredentials => {
      console.log("Logado como: " + userCredentials.user?.email)
      navigation.replace('Menu')
      
    })
    .catch(erro => alert(erro.message))
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <ImageBackground source={require('../assets/images/back.png')} resizeMode='stretch' style={styles.container}>
        <Text style={styles.titulo}>TELA DE LOGIN</Text>

        <View style={styles.inputView}>
          <TextInput
            label='E-mail'
            onChangeText={texto => setEmail(texto)}
            style={styles.input}
          />

          <TextInput
            label='Senha'
            onChangeText={texto => setSenha(texto)}
            secureTextEntry={true}
            right={<TextInput.Icon icon="eye" />}
            style={styles.input}
          />
        </View>      

        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={logar}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.buttonSec]} onPress={() => navigation.replace('Register')}>
            <Text style={[styles.buttonText, styles.buttonSecText]}>Registrar</Text>
          </TouchableOpacity>
        </View>

      </ImageBackground>      
    </KeyboardAvoidingView>
  );
}
