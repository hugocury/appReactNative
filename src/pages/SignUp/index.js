import React, {useState, useContext} from 'react';
import { Platform, ActivityIndicator, TouchableOpacity } from 'react-native';

import { AuthContext } from '../../contexts/auth';

import { FontAwesome5 } from '@expo/vector-icons';

import { Background, Container, AreaInput, Input, PasswordText, PasswordTitle, View, Image,SubmitButtonContainer, SubmitButton, SubmitText} from '../SignIn/styles';

import IconCheck from '../../assets/icon-check.png'



export default function SignUp() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passNumber, setPassNumber] = useState(false);
  const [passCase, setPassCase] = useState(false);
  const [passLength, setPassLength] = useState(false);
  const [passEspecial, setPassEspecial] = useState(false);
  const [hidePass, setHidePass] = useState(true);

  const secureText = (validateInput) => {
    const regexUppercase = new RegExp(/^(?=.*[A-Z]).+$/)
    const regexLowercase = new RegExp(/^(?=.*[a-z]).+$/)
    const regexNumber = new RegExp(/^(?=.*[0-9]).+$/)
    const regexEspecial = new RegExp(/[^a-zA-Z0-9]+/g)
    const length = validateInput.length >= 8

    if (regexNumber.test(validateInput)) {
      setPassNumber(true);
    } else {
      setPassNumber(false);
    }

    if (regexUppercase.test(validateInput) && regexLowercase.test(validateInput)) {
      setPassCase(true);
    } else {
      setPassCase(false);
    }

    if (regexEspecial.test(validateInput)) {
      setPassEspecial(true);
    } else {
      setPassEspecial(false);
    }

    if (length) {
      setPassLength(true);
    } else {
      setPassLength(false);
    }

    if (validateInput.length == 0) {
      resetPassHandler();
    }
    
    setPassword(validateInput);
}

  const { signUp, loadingAuth } = useContext(AuthContext);

  function handleSignUp(){
    resetPassHandler();
    signUp(email, password, nome);
  }

  function resetPassHandler(){
    setPassNumber(false);
    setPassCase(false);
    setPassLength(false);
    setPassEspecial(false);
  }

 return (
   <Background>
      <Container
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      enabled
      >
        
        <AreaInput>
          <Input
          placeholder="Nome"
          autoCorrect={false}
          autoCapitalize="none"
          value={nome}
          onChangeText={ (text) => setNome(text) }
          />
        </AreaInput>

        <AreaInput>
          <Input
          placeholder="Email"
          autoCorrect={false}
          autoCapitalize="none"
          value={email}
          onChangeText={ (text) => setEmail(text) }
          />
        </AreaInput>

        <AreaInput>
          <Input
          placeholder="Senha"
          secureTextEntry={hidePass}
          autoCorrect={false}
          autoCapitalize="none"
          value={password}
          onChangeText={ (validateInput) => secureText(validateInput) }
          />
          <TouchableOpacity onPress={() => setHidePass(!hidePass) }>
              {
                hidePass === true ? 
                <FontAwesome5 name="eye" size={22} color="rgba(240, 255, 255, 1)" />
                :
                <FontAwesome5 name="eye-slash" size={22} color="rgba(240, 255, 255, 1)" />
              }
          </TouchableOpacity>
        </AreaInput>
      </Container>
      
      <PasswordTitle>Sua senha deve ter:</PasswordTitle>

      <View>
        <Image source={passLength ? IconCheck : IconClose}/>
        <PasswordText>8 carcteres</PasswordText>
      </View>
      
      <View>
        <Image source={passNumber ? IconCheck : IconClose}/>
        <PasswordText>Números</PasswordText>
      </View>

      <View>
        <Image source={passEspecial ? IconCheck : IconClose}/>
        <PasswordText>Caracteres especiais</PasswordText>
      </View>

      <View>
        <Image source={passCase ? IconCheck : IconClose}/>
        <PasswordText>Letra maiúscula e letra minúscula</PasswordText>
      </View>

      <SubmitButtonContainer>
        <SubmitButton onPress={handleSignUp}>

        {
          loadingAuth ? (
            <ActivityIndicator size={20} color="#FFF" />
          ) : (
            <SubmitText>Cadastrar</SubmitText>
          )
        }
          
        </SubmitButton>
      </SubmitButtonContainer>
   </Background>
  );
}