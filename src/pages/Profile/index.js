import React, { useContext }  from 'react';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons'; 

import Header from '../../components/Header';
import { AuthContext } from '../../contexts/auth';
import {Container, Nome, NewLink, NewText, Logout, LogoutText} from './styles';

export default function Profile() {
 const navigation = useNavigation();

 const { user, signOut } = useContext(AuthContext);

 return (
   <Container>   
    <Header/>
    <Ionicons name="person" size={50} color="white" />
    <Nome> Olá, {user && user.nome} </Nome>
    
    <NewLink onPress={ () => navigation.navigate('Registrar') } >
      <NewText>Registrar receitas/despesas</NewText>
    </NewLink>

    <Logout onPress={ () => signOut()}>
      <LogoutText>Sair</LogoutText>
    </Logout>

   </Container>
  );
}