import { useState } from 'react';
import { Text, View, KeyboardAvoidingView, TouchableOpacity, ImageBackground, Alert, ScrollView} from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { auth, firestore } from '../firebase';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Usuario } from '../model/Usuario';
import styles from '../assets/style/estilo';

export default function RegisterUsuario() {
  const [formUsuario, setFormUsuario] = useState<Partial<Usuario>>({})
  const [confSenha, setConfSenha] = useState('')
  const [visivel, setVisivel] = useState(false);
  const [showSenha, setShowSenha] = useState(false);
  const refUsuario = firestore.collection("Usuario");

  const navigation = useNavigation()

  const visibilidade = () => {
    setVisivel(!visivel);

  }

  const formatarData = (data) => {
    visibilidade();
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const dia = data.getDate().toString().padStart(2, "0");
    const valor = dia + "/" + mes + "/" + ano;
    setFormUsuario({
      ...formUsuario,
      dt_nascimento: valor
    })
  }

  const dataMax = () => {
    const max = new Date();
    max.setDate(max.getDate());
    return max;
  }

  const registrar = () => {
    if(confSenha == formUsuario.senha){
      auth
      .createUserWithEmailAndPassword(formUsuario.email,formUsuario.senha)
      .then( 
          userCredentials => {
            const idUsuario = refUsuario.doc(auth.currentUser.uid)
            const novoUsuario = new Usuario(formUsuario);
            novoUsuario.id = auth.currentUser.uid
            idUsuario.set(novoUsuario.toFirestore())
            navigation.replace('Página Inicial')
          }
        )
        .catch(erro => alert(erro.message))
    } else {
      alert("As senhas não coincidem, por favor valide os campos.")
    }
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <ImageBackground source={require('../assets/images/back_login.png')} resizeMode='stretch' style={styles.container}>
          <View style={styles.login}>
            <Text style={styles.titulo}>CADASTRO DE USUÁRIOS</Text>

            <View style={styles.inputView}>
              <TextInput 
                label='Nome' 
                onChangeText={valor => setFormUsuario({
                  ...formUsuario,
                  nome: valor
                })}
                style={styles.input}
                activeUnderlineColor='#354f52'
              />
              <TextInput 
                label='Email' 
                onChangeText={valor => setFormUsuario({
                  ...formUsuario,
                  email: valor
                })}
                style={styles.input}
                activeUnderlineColor='#354f52'
              />

              <TextInput 
                label='Fone' 
                onChangeText={valor => setFormUsuario({
                  ...formUsuario,
                  fone: valor
                })}
                style={styles.input}
                activeUnderlineColor='#354f52'
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
                  <Picker.Item label='Empresa' value='empresa'/>
                </Picker>
              </View>
              {formUsuario.tipo === 'estudante' && (
                <>
                  <DateTimePicker
                    isVisible={visivel}
                    mode="date"
                    onConfirm={formatarData}
                    onCancel={visibilidade}
                    maximumDate={dataMax()}
                  />              
                  <TextInput
                    label="Data de Nascimento"
                    onChangeText={valor =>
                      setFormUsuario({
                        ...formUsuario,
                        dt_nascimento: valor
                      })
                    }
                    onPress={()=> visibilidade()}
                    style={styles.input}
                    activeUnderlineColor='#354f52'
                    value={formUsuario.dt_nascimento}
                  />
                  <TextInput
                    label="CPF"
                    onChangeText={valor =>
                      setFormUsuario({
                        ...formUsuario,
                        cpf: valor
                      })
                    }
                    style={styles.input}
                    activeUnderlineColor='#354f52'
                  />
                </>
              )}

              {formUsuario.tipo === 'empresa' && (
                <TextInput
                  label="CNPJ"
                  onChangeText={valor =>
                    setFormUsuario({
                      ...formUsuario,
                      cnpj: valor
                    })
                  }
                  style={styles.input}
                  activeUnderlineColor='#354f52'
                />
              )}

              <TextInput 
                label='Senha' 
                onChangeText={valor => setFormUsuario({
                  ...formUsuario,
                  senha: valor
                })}
                secureTextEntry={!showSenha}
                right={
                  <TextInput.Icon
                    icon={showSenha ? 'eye-off' : 'eye'}
                    onPress={() => setShowSenha(!showSenha)}
                  />
                }
                style={styles.input}
                activeUnderlineColor='#354f52'
              />
              <TextInput
                label='Confirme sua Senha'
                onChangeText={valor => setConfSenha(valor)}
                secureTextEntry={!showSenha}
                right={
                  <TextInput.Icon
                    icon={showSenha ? 'eye-off' : 'eye'}
                    onPress={() => setShowSenha(!showSenha)}
                  />
                }
                style={styles.input}
                activeUnderlineColor='#354f52'
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
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}