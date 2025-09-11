import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  containerHome: {
    flex: 1,
    backgroundColor: '#52796f',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  titulo: {
    fontSize: 20,
    fontWeight: 700,
    color: '#ffffffff',
    marginTop: 80,  
    marginBottom: 40
  },
  inputView: {
    width: '80%',
    marginBottom: 40
  },
  input: {
    backgroundColor: '#edededff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },
  buttonView: {
    width: '80%'
  },
  button: {
    backgroundColor: '#354f52',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 700,
    fontSize: 15
  },
  buttonSec: {
    backgroundColor: '#fff',
    borderColor: '#354f52',
    borderWidth: 2
  },
  buttonSecText: {
    color: '#354f52'
  }
});
