import { useState } from 'react';
import { Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, ImageBackground, Alert} from 'react-native';
import { auth, firestore } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { Usuario } from '../model/Usuario';
import styles from '../estilo';

export default function Register() {
  const [formUsuario, setFormUsuario] = useState<Partial<Usuario>>({})
  const [confSenha, setConfSenha] = useState('')
  const refUsuario = firestore.collection("Usuario");

  const navigation = useNavigation()

  const registrar = () => {
    if(confSenha == formUsuario.senha){
      auth
      .createUserWithEmailAndPassword(formUsuario.email,formUsuario.senha)
      .then( 
          userCredentials => {
            console.log("Logado como: " + userCredentials.user?.email)
            const idUsuario = refUsuario.doc(auth.currentUser.uid)
            idUsuario.set({
              id: idUsuario,
              nome: formUsuario.nome,
              email: formUsuario.email,
              fone: formUsuario.fone
            })
            navigation.replace('Home')
          }
        )
        .catch(erro => alert(erro.message))
    } else {
      alert("As senhas não coincidem, por favor valide os campos.")
    }
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <ImageBackground source={require('../assets/back2.png')} resizeMode='stretch' style={styles.container}>
        <Text style={styles.titulo}>CADASTRO DE USUÁRIOS</Text>

        <View style={styles.inputView}>
          <TextInput 
            placeholder='Nome' 
            onChangeText={valor => setFormUsuario({
              ...formUsuario,
              nome: valor
            })}
            style={styles.input}
          />
          <TextInput 
            placeholder='Email' 
            onChangeText={valor => setFormUsuario({
              ...formUsuario,
              email: valor
            })}
            style={styles.input}      
          />

          <TextInput 
            placeholder='Fone' 
            onChangeText={valor => setFormUsuario({
              ...formUsuario,
              fone: valor
            })}
            style={styles.input}
          />
          <TextInput 
            placeholder='Senha' 
            onChangeText={valor => setFormUsuario({
              ...formUsuario,
              senha: valor
            })}
            secureTextEntry={true}
            style={styles.input}
          />
          <TextInput
            placeholder='Confirme sua Senha'
            onChangeText={valor => setConfSenha(valor)}
            secureTextEntry={true}
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