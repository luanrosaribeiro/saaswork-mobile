import { useState } from 'react';
import { Text, View, KeyboardAvoidingView, TouchableOpacity, ImageBackground, Alert} from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { auth, firestore } from '../firebase';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Instituicao } from '../model/Instituicao';
import styles from '../assets/style/estilo';

export default function RegisterInstituicao() {
  const [formInstituicao, setFormInstituicao] = useState<Partial<Instituicao>>({})
  const refInstituicao = firestore.collection("Instituicao");
  const [loadingCep, setLoadingCep] = useState(false);

  const navigation = useNavigation()

  const buscarCep = async (cep: string) => {
    if(cep.length < 8){
        Alert.alert('Cep Inválido','Cep menor que o tamanho esperado!');
        return;
    }
    setLoadingCep(true);
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        setFormInstituicao({
            ...formInstituicao,
            endereco: data.logradouro + ',' + data.bairro + ',' + data.cidade + '-' + data.uf
        });
    } catch (err) {
        Alert.alert('Cep Inválido', 'Cep inválido para busca.')
    } finally {
        setLoadingCep(false);
    }
  }

  const registrar = () => {
    const instituicao = new Instituicao(formInstituicao);
    const idInstituicao = refInstituicao.doc();
    instituicao.id = idInstituicao.id;
    idInstituicao.set(instituicao.toFirestore())
    .then(() => {
        alert("Instituicao Adicionada!");
        setFormInstituicao({});
    })
    .catch( error => alert(error.message));
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <ImageBackground source={require('../assets/images/back_home.png')} resizeMode='stretch' style={styles.container}>
        <Text style={styles.titulo}>CADASTRO DE INSTITUIÇÃO</Text>

        <View style={styles.inputView}>
          <TextInput 
            label='Nome' 
            mode='outlined'
            onChangeText={valor => setFormInstituicao({
              ...formInstituicao,
              nome: valor
            })}
            value={formInstituicao.nome}
          />
          <TextInput 
            label='Cep' 
            mode='outlined'
            onChangeText={valor => setFormInstituicao({
              ...formInstituicao,
              cep: valor
            })}
            keyboardType='numeric'
            value={formInstituicao.cep}
          />

          <TextInput 
            label='Endereço'
            mode='outlined' 
            onChangeText={valor => setFormInstituicao({
              ...formInstituicao,
              endereco: valor
            })}value={formInstituicao.endereco}
          />
          <TextInput 
            label='Número' 
            mode='outlined'
            onChangeText={valor => setFormInstituicao({
              ...formInstituicao,
              numero: valor
            })}
            keyboardType='numeric'
            value={formInstituicao.numero}
          />
          <TextInput 
            label='Telefone' 
            mode='outlined'
            onChangeText={valor => setFormInstituicao({
              ...formInstituicao,
              telefone: valor
            })}
            onBlur={() => buscarCep(formInstituicao.cep)}
            right={<TextInput.Icon icon={loadingCep ? 'loading' : 'map-search'} />}
            keyboardType='numeric'
            value={formInstituicao.telefone}
          />
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={registrar}>
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.buttonSec]} onPress={() => navigation.replace('Home')}>
            <Text style={[styles.buttonText, styles.buttonSecText]}>Voltar</Text>
          </TouchableOpacity>
        </View>

      </ImageBackground>
    </KeyboardAvoidingView>
  );
}