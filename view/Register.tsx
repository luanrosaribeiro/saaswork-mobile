import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Button, TouchableOpacity, ImageBackground} from 'react-native';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import styles from '../estilo';

export default function Register() {
  const[nome,setNome]   = useState('')
  const[email,setEmail] = useState('')
  const[senha,setSenha] = useState('')
  const[fone,setFone]   = useState('')

  const navigation = useNavigation()

  const registrar = () => {
    auth
    .createUserWithEmailAndPassword(email,senha)
    .then( userCredentials => {
      console.log("Logado como: " + userCredentials.user?.email)
      navigation.replace('Home')
    })
    .catch(erro => alert(erro.message))
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <ImageBackground source={require('../assets/back2.png')} resizeMode='stretch' style={styles.container}>
        <Text style={styles.titulo}>CADASTRO DE USUÁRIOS</Text>

        <View style={styles.inputView}>
          <TextInput 
            placeholder='Nome' 
            onChangeText={valor => setNome(valor)}
            style={styles.input}
          />
          <TextInput 
            placeholder='Email' 
            onChangeText={valor => setEmail(valor)}  
            style={styles.input}      
          />
          <TextInput 
            placeholder='Senha' 
            onChangeText={valor => setSenha(valor)}
            secureTextEntry={true}
            style={styles.input}
          />
          <TextInput 
            placeholder='Fone' 
            onChangeText={valor => setFone(valor)}
            style={styles.input}
          />
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={registrar}>
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.buttonSec]} onPress={() => navigation.replace('Login')}>
            <Text style={[styles.buttonText, styles.buttonSecText]}>Voltar</Text>
          </TouchableOpacity>
        </View>

      </ImageBackground>
    </KeyboardAvoidingView>
  );
}