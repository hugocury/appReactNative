import React, { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'

import { AuthContext } from '../../contexts/auth';

export default function CustomDrawer(props) {
    const { user, signOut } = useContext(AuthContext);
 return (
   <DrawerContentScrollView {...props} >
    <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 25}}>

      <Image
      source={require('../../assets/logo1.jpg')}
      style={{width: 95, height: 95}}
      resizeMode="contain"
      />

      <Text style={{color: '#FFF', fontSize: 25, marginTop: 5}}>
        Bem-vindo
      </Text>

      <Text style={{color: '#FFF', fontSize: 22, fontWeight: 'bold', paddingBottom: 25}}>
      {user && user.nome}
      </Text>
    </View>

    <DrawerItemList {...props} />

    <DrawerItem
      {...props}
      label="Sair"
      inactiveBackgroundColor="rgba(119, 136, 153, 1)"
      onPress={ () => signOut() }
      />

   </DrawerContentScrollView>
  );
}