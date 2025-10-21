import { useEffect, useState } from 'react';
import { View, KeyboardAvoidingView, TouchableOpacity, ImageBackground, Alert, FlatList} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Competencia } from '../model/Competencias';
import styles from '../assets/style/estilo';
import { auth, firestore } from '../firebase';
import { Icon } from 'react-native-paper';

export default function ListarCompetencia() {

    useEffect( () => {
        listar();
    });
    
    const navigation = useNavigation()
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
                style={styles.lista}
                data={competencias}
                renderItem={ ({item}) => (
                    <View style={styles.cardLista}>
                        <TouchableOpacity onPress={() => mostrarDetalhes(item.id)}>
                            <Text style={styles.cardListaTitulo}>{item.nome}</Text>
                        </TouchableOpacity>

                        {expandido == item.id && (
                            <View>
                                <View style={styles.alinharItens}>
                                    <Text style={styles.cardListaText}>Instituição: </Text>
                                    <Text>{item.instituicao}</Text>
                                </View>
                                <Text style={styles.cardListaText}>Data de Inicio: </Text><Text>{item.dt_inicio}</Text>
                                <Text style={styles.cardListaText}>Data de Finalização: </Text><Text>{item.dt_final}</Text>
                                <Text style={styles.cardListaText}>Carga Horária</Text><Text>{item.carga_horaria}</Text>
                                <Text style={styles.cardListaText}>Tipo: </Text><Text>{item.tipo}</Text>
                            </View>

                        )}
                    </View>
                )}
            />
            <View style={styles.buttonViewFloating}>
                <TouchableOpacity style={styles.buttonFloating} onPress={() => navigation.navigate('RegisterCompetencia')}>
                    <Icon 
                        source="plus"
                        color='#fff'
                        size={45}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}