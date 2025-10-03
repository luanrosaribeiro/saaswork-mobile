import { useEffect, useState } from 'react';
import { Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, ImageBackground, Alert, FlatList} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Competencia } from '../model/Competencias';
import styles from '../assets/style/estilo';
import { auth, firestore } from '../firebase';

export default function RegisterCompetencia() {

    useEffect( () => {
        listar();
    });

    const [competencias, setCompetencias] = useState<Competencia[]>([]);
    const [expandido, setExpandido] = useState <String | null>(null);
    const refCompetencia = firestore.collection("Usuario").doc(auth.currentUser?.uid).collection("Competencia");

    const listar = () => {
        const retorno = refCompetencia.onSnapshot( (query) => {
            const competencias = [];
            query.forEach( (documento) => {
                competencias.push({
                    ...documento.data(),
                    key: documento.id
                });
            });
            setCompetencias(competencias);
        });
        return () => retorno();
    }

    const mostrarDetalhes = (id) => {
        setExpandido(expandido === id ? null : id);
    }
 

    return (
    
        <View style={styles.container}>
            <FlatList
                data={competencias}
                renderItem={ ({item}) => (
                    <View style={styles.cardLista}>
                        <TouchableOpacity onPress={() => mostrarDetalhes(item.id)}>
                            <Text>{item.nome}</Text>
                        </TouchableOpacity>

                        {expandido == item.id && (
                            <View>
                                <Text>{item.instituicao}</Text>
                                <Text>{item.dt_final}</Text>
                                <Text>{item.dt_inicio}</Text>
                                <Text>{item.carga_horaria}</Text>
                                <Text>{item.tipo}</Text>
                            </View>

                        )}
                    </View>
                )}
            />
        </View>
    );
}