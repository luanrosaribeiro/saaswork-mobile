import { useState } from 'react';
import { Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, ImageBackground, Alert} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Competencia } from '../model/Competencias';
import styles from '../assets/style/estilo';
import { auth, firestore } from '../firebase';

export default function RegisterCompetencia() {
  const [formCompetencia, setFormCompetencia] = useState<Partial<Competencia>>({})
  const navigation = useNavigation()
  const [visivel, setVisivel] = useState(false);
  const [tipoData, settipoData] = useState('');
  const refCompentencia = firestore
    .collection("Usuario")
    .doc(auth.currentUser?.uid)
    .collection("Competencia");

  const visibilidade = (tipo) => {
    settipoData(tipo);
    setVisivel(!visivel);

  }

  const formatarData = (data) => {
    visibilidade();
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const dia = data.getDate().toString().padStart(2, "0");
    const valor = dia + "/" + mes + "/" + ano;
    
    if (tipoData == 'inicio'){
      setFormCompetencia({
        ...formCompetencia,
        dt_inicio: valor
      })
    } else {
      setFormCompetencia({
        ...formCompetencia,
        dt_final: valor
      })
    }
  }

  const dataMax = () => {
    const max = new Date();
    max.setDate(max.getDate());
    return max;
  }

  const salvar = () => {
    const competencia = new Competencia(formCompetencia);
    const idCompetencia = refCompentencia.doc();
    competencia.id = idCompetencia.id;
    idCompetencia.set(competencia.toFirestore())
    .then(() => {
      alert("Competência Adicionada!");
      setFormCompetencia({});
    })
    .catch( error => alert(error.message));
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.containerHome}>
        <Text style={styles.titulo}>Cadastre Seus Cursos e Projetos</Text>

        <View style={styles.inputView}>
          <TextInput 
            placeholder='Titulo' 
            onChangeText={valor => setFormCompetencia({
              ...formCompetencia,
              nome: valor
            })}
            value={formCompetencia.nome}
            style={styles.input}
          />

          <DateTimePicker
            isVisible={visivel}
            mode="date"
            onConfirm={formatarData}
            onCancel={visibilidade}
            maximumDate={dataMax()}
          />

          <TextInput 
            placeholder='Data de Início' 
            value={formCompetencia.dt_inicio}
            style={styles.input}   
            onPress={()=> visibilidade('inicio')}   
          />

          <TextInput 
            placeholder='Data de Finalização' 
            value={formCompetencia.dt_final}
            style={styles.input}   
            onPress={()=> visibilidade('final')} 
          />

          <TextInput 
            placeholder='Carga Horária' 
            onChangeText={valor => setFormCompetencia({
              ...formCompetencia,
              carga_horaria: valor
            })}
            value={formCompetencia.carga_horaria}
            keyboardType='numeric'
            style={styles.input}
          />

          <View style={styles.picker}>
            <Picker 
              mode='dropdown' 
              style={styles.inputPicker}
              onValueChange={valor => setFormCompetencia({
                ...formCompetencia,
                tipo: valor
              })}
            >
              <Picker.Item label='Curso' value='Curso'/>
              <Picker.Item label='Evento' value='Evento'/>
              <Picker.Item label='Workshop' value='Workshop'/>
              <Picker.Item label='Palestra' value='Palestra'/>
              <Picker.Item label='Projeto' value='Projeto'/>
            </Picker>
          </View>

          <View style={styles.picker}>
            <Picker 
              mode='dropdown' 
              style={styles.inputPicker} 
              onValueChange={valor => setFormCompetencia({
                ...formCompetencia,
                instituicao: valor
              })}
            >
              <Picker.Item label='IFSul' value='IFSul'/>
              <Picker.Item label='Alura' value='Alura'/>
              <Picker.Item label='Udemy' value='Udemy'/>
              <Picker.Item label='Data Scienci Academy' value='Data Scienci Academy'/>
              <Picker.Item label='Outra' value='Outra'/>
            </Picker>
          </View>
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={salvar}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.buttonSec]} onPress={() => navigation.navigate('ListarCompetencia')}>
            <Text style={[styles.buttonText, styles.buttonSecText]}>Voltar</Text>
          </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  );
}