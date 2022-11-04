import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

import { Feather } from '@expo/vector-icons';

import Header from '../../components/Header';

export default function Help(){
    return (
    <View style={styles.container}>
        <Header/>
        <View style={styles.iconView}>
            <Feather name="help-circle" size={24} color="#FF7F50" />
            <Text style={styles.textHelp}>Tela Help</Text>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#131313',
    },
    textHelp:{
        color: '#FF7F50',
        fontSize: 30,
        fontWeight: 'bold',
        paddingStart: '5%'
    },
    iconView:{
        flexDirection:'row',
        marginTop: 28,
        marginBottom: 12,
        paddingStart: '5%'
    }
})