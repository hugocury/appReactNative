import React, {useState, useContext} from 'react';
import { Platform, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../contexts/auth';

import { FontAwesome5 } from '@expo/vector-icons';

import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText, Link, LinkText} from './styles';

  export default function SignIn() {
    const navigation = useNavigation();
  
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, loadingAuth } = useContext(AuthContext);
    const [hidePass, setHidePass] = useState(true);
  
  
    function handleLogin(){
      signIn(email, password);
    }
  
   return (
     <Background>
        <Container
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
        >

          <Logo source={require('../../assets/logo1.jpg')}/>
          
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
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            onChangeText={ (text) => setPassword(text) }
            secureTextEntry={hidePass}
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
  
        <SubmitButton onPress={handleLogin}>

        {
          loadingAuth ? (
            <ActivityIndicator size={20} color="#FFF" />
          ) : (
            <SubmitText>Acessar</SubmitText>
          )
        }
          
        </SubmitButton>
  
        <Link onPress={ () => navigation.navigate('SignUp')}>
          <LinkText>Não é cliente? Crie uma conta agora!</LinkText>
        </Link>

        <Link>
          <LinkText>Esqueci minha senha</LinkText>
        </Link>

        <Link>
          <LinkText>Fale conosco</LinkText>
        </Link>


  
        </Container>
     </Background>
    );
  }