import { useState } from 'react';
import { Text, View, KeyboardAvoidingView, TouchableOpacity, ImageBackground, Alert} from 'react-native';
import { TextInput } from 'react-native-paper';
import { auth, firestore } from '../firebase';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Usuario } from '../model/Usuarios';
import styles from '../assets/style/estilo';

export default function RegisterUsuario() {
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
              fone: formUsuario.fone,
              tipo: formUsuario.tipo
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
      <ImageBackground source={require('../assets/images/back2.png')} resizeMode='stretch' style={styles.container}>
        <Text style={styles.titulo}>CADASTRO DE USUÁRIOS</Text>

        <View style={styles.inputView}>
          <TextInput 
            placeholder='Nome' 
            onChangeText={valor => setFormUsuario({
              ...formUsuario,
              nome: valor
            })}
          />
          <TextInput 
            placeholder='Email' 
            onChangeText={valor => setFormUsuario({
              ...formUsuario,
              email: valor
            })}
          />

          <TextInput 
            placeholder='Fone' 
            onChangeText={valor => setFormUsuario({
              ...formUsuario,
              fone: valor
            })}
          />
          <View style={styles.picker}>
            <Picker 
              mode='dropdown' 
              style={styles.inputPicker}
              onValueChange={valor => setFormUsuario({
                ...formUsuario,
                tipo: valor
              })}
            >
              <Picker.Item label='Você é empresa ou estudante?' value=''/>
              <Picker.Item label='Estudante' value='estudante'/>
              <Picker.Item label='Empresa' value='Empresa'/>
            </Picker>
          </View>
          <TextInput 
            placeholder='Senha' 
            onChangeText={valor => setFormUsuario({
              ...formUsuario,
              senha: valor
            })}
            secureTextEntry={true}
          />
          <TextInput
            placeholder='Confirme sua Senha'
            onChangeText={valor => setConfSenha(valor)}
            secureTextEntry={true}
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