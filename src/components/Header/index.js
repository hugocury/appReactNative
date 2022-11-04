import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import {Container, ButtonMenu} from './styles';

export default function Header() {
 const navigation = useNavigation();

 return (
   <Container>
       <ButtonMenu onPress={ () => navigation.toggleDrawer() }>
         <Feather name="menu" color="#FF7F50" size={30} />
       </ButtonMenu>
   </Container>
  );
}