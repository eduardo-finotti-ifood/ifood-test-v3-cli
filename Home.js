import React, { Component }from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Keyboard, SafeAreaView} from 'react-native';
import { Input } from 'react-native-elements';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class HomeScreen extends Component {

  state={
    itens:[
      { chave: '12323', valor: 'Eduardo Finotti'},
      { chave: '98839', valor: 'Igor Resende'},
      { chave: '87673', valor: 'Caio Silva'},
      { chave: '55555', valor: 'Fernando José'},
      { chave: '11112', valor: 'Pedro Raniel'},
      { chave: '55552', valor: 'Lucas Dira'},
      { chave: '66525', valor: 'Clarise Falcão'},
    ],
    chave: null, 
    valor: null,
    haveCode: false
  }

  cancel = () => {
    Keyboard.dismiss()
    this.setState({ chave: null, valor: null })
  }

  save = () => {
    Keyboard.dismiss()
    if(this.state.chave==null || this.state.valor == null){
      Alert.alert('Os campos devem ser preenchidos!')
    } else {

      var item = [...this.state.itens]
      var exist = false;

      for (let index = 0; index < item.length; index++) {

        if(item[index].chave == this.state.chave){
          exist = true
          this.setState({ haveCode: true })
        } else{
          this.setState({ haveCode: false })
        }
      } 
      
      if(!exist){
          item.push({
            chave: this.state.chave, valor: this.state.valor
          })
          this.setState({ itens: item })
          this.setState({ chave: null, valor: null })
          
          showMessage({
            message: "Salvo",
            description: "Dados salvos!",
            type: "success",
            floating: true,
            position: "bottom",
            animationDuration: "400",
            duration: 5000
          });
      }
    }
  }

  logout = () => {
    this.props.navigation.navigate('Login')
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity  onPress={() => this.logout()} accessible={true} accessibilityLabel="logout">
          <Icon name="sign-out" size={30} color='#fff' style={{ marginLeft: '7%', marginTop: 30}} />
        </TouchableOpacity>

        <View style={{ marginLeft: '5%', width: '95%', flexDirection: 'row', marginTop: '5%'}}>
            <View style={{ width: '40%', marginTop: 20}}>
              <Input label='Código'
                inputStyle = {{ color: 'white'}}
                onChangeText={(chave) => this.setState({chave})}
                value={this.state.chave}
                accessible={true} accessibilityLabel="codigo"
              />
            </View>
            <View style={{width: '53%', marginTop: 20}}>
              <Input label='Aluno' 
                inputStyle = {{ color: 'white'}}
                onChangeText={(valor) => this.setState({valor})}
                value={this.state.valor}
                accessible={true} accessibilityLabel="aluno"
              />
            </View>
          </View>

          <View style={{ marginLeft: '5%', width: '95%', flexDirection: 'row'}}>
            <TouchableOpacity style={{alignContent: 'center', paddingLeft: 10, justifyContent: 'center'}} 
                              onPress={() => this.save()} 
                              accessible={true} accessibilityLabel="salvar">
              <View style={[styles.button, {backgroundColor: '#3239D1' }]}>
                  <Text style={styles.buttonText}>Salvar</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{alignContent: 'center', paddingLeft: 10, justifyContent: 'center'}} 
                              onPress={() => this.cancel()} 
                              accessible={true} accessibilityLabel="cancelar">
              <View style={[styles.buttonClear, {backgroundColor: '#C43A3A' }]}>
                  <Text style={styles.buttonText}>Cancelar</Text>
              </View>
            </TouchableOpacity>
          </View>
        
        
        {this.state.haveCode && 
            <View style={{marginLeft: 30}}>
              <Text accessible={true} accessibilityLabel="haveCode"
                style={{color: 'red', fontSize: 20, margin: 10}}>Já existe um aluno com este código!</Text>
            </View>
        }

        <View style={{ marginLeft: '10%', height: '60%', width: '80%', marginTop: 30}}>

          <FlatList data={this.state.itens} 
                      keyExtractor={item => `${item.chave}`}
                      renderItem={({ item }) =>  
                        <View style={styles.itemContainer} accessible={true} accessibilityLabel={item.chave}>
                          <Text style={styles.itemText}>{item.chave} - {item.valor}</Text>
                        </View>
                      } 
          />
        </View>
        <FlashMessage position="top" />

      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  itemContainer: {
    borderRadius: 5,
    marginTop: 10,
    padding: 20,
    height: 70,
    width: '100%',
    backgroundColor: '#fff',
    alignContent: "center",
    justifyContent: 'center'
  },
  itemText: {
    alignContent: "center",
    alignContent: 'center',
    justifyContent: 'center',
    fontSize: 20
  },
  text: {
    fontSize: 30,
    color: 'white'
  },
  button: {
    backgroundColor: '#080',
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
},
buttonClear: {
  backgroundColor: '#080',
  marginTop: 10,
  padding: 10,
  alignItems: 'center',
},
  buttonText: {
    color: '#000',
    fontSize: 20,
  }
})
