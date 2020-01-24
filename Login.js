import React, { Component }from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, StatusBar, Keyboard, SafeAreaView } from 'react-native';
import AuthInput from './components/AuthInput'
import ifoodLogo from './assets/ifood.png'

export default class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
    keyboardOpen: false,
    loginFail: false
  }

  login = () => {
   if(this.state.email=='teste@teste.com' && this.state.password==123456){
     this.props.navigation.navigate('Home')
     this.setState({ email: null, password: null })
   } else {
      this.setState({ loginFail: true, keyboardOpen: false })
   }
   Keyboard.dismiss()
  }

  loginUp = () => {
    this.setState({ keyboardOpen: true })
  }

  loginDown = () => {
    this.setState({ keyboardOpen: false })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={[styles.container, {justifyContent: this.state.keyboardOpen?'flex-start':'center'}]}>
        <StatusBar barStyle="light-content" />

        <Text style={{  fontSize: 30, color: 'white'}}>Test</Text>
        <Image source={ifoodLogo} style={{marginBottom: 20, width: 190, height: 100}}></Image>
        
          <View style={styles.formContainer}>
            <AuthInput icon='at' autoCapitalize = 'none' placeholder='E-mail' style={styles.input} 
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })} 
                        onFocus={() => this.loginUp()}
                        onBlur={() => this.loginDown()}
                        accessible={true} accessibilityLabel="email"
                        />
            <AuthInput icon='lock' secureTextEntry={true} placeholder='Senha' style={styles.input} 
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })} 
                        onFocus={() => this.loginUp()}
                        onBlur={() => this.loginDown()}
                        accessible={true} accessibilityLabel="senha"
                        />
            {/* <TouchableOpacity onPress={() => navigate('Profile')} > */}
            <TouchableOpacity onPress={() => this.login()} >
                <View style={[styles.button, {backgroundColor: '#C43A3A' }]} accessible={true} accessibilityLabel="entrar">
                    <Text style={styles.buttonText}>Entrar</Text>
                </View>
            </TouchableOpacity>
            
          </View>
          {this.state.loginFail && 
            <Text accessible={true} accessibilityLabel="lognFail"
              style={{color: 'red', fontSize: 20, margin: 10}}>Erro no login! :(</Text>
          }
      </SafeAreaView>    
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
  },
  input: {
    marginTop: 10,
    backgroundColor: '#FFF',
  },
  formContainer: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 20,
    width: '90%',
  },
  button: {
    backgroundColor: '#080',
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
},
  buttonText: {
    color: '#FFF',
    fontSize: 20,
  }

});
