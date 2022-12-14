import React, { useContext, useState, useEffect } from 'react';
import { Alert, TouchableOpacity, Platform } from 'react-native';
import { format, isBefore } from 'date-fns';

import firebase from '../../services/firebaseConnection';
import { AuthContext } from '../../contexts/auth';
import HistoricoList from '../../components/HistoricoList';
import DatePicker from '../../components/DatePicker';
import Header from '../../components/Header';

import { FontAwesome } from '@expo/vector-icons'; 

import { Background, Container, Nome, Saldo, Title, List, Area} from './styles';

export default function Home() {
  const [historico, setHistorico] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const { user } = useContext(AuthContext);
  const uid = user && user.uid;
  const [newDate, setNewDate] = useState(new Date());
  const [show, setShow] = useState(false);

  useEffect(()=>{
    async function loadList(){
      await firebase.database().ref('users').child(uid).on('value', (snapshot)=>{
        setSaldo(snapshot.val().saldo);
      });

      await firebase.database().ref('historico')
      .child(uid)
      .orderByChild('date').equalTo(format(newDate, 'dd/MM/yyyy'))
      .limitToLast(10).on('value', (snapshot)=>{
        setHistorico([]);

        snapshot.forEach((childItem) => {
          let list = {
            key: childItem.key,
            tipo: childItem.val().tipo,
            valor: childItem.val().valor,
            date: childItem.val().date,
          };
          
          setHistorico(oldArray => [...oldArray, list].reverse());
        })
      })

    }

    loadList();
  }, [newDate]);

  function handleDelete(data){

    const [diaItem, mesItem, anoItem] = data.date.split('/');
    const dateItem = new Date(`${anoItem}/${mesItem}/${diaItem}`);

    const formatDiaHoje = format(new Date(), 'dd/MM/yyyy');
    const [diaHoje, mesHoje, anoHoje] = formatDiaHoje.split('/');
    const dateHoje = new Date(`${anoHoje}/${mesHoje}/${diaHoje}`);

    if( isBefore(dateItem, dateHoje) ) {
      alert('Registro com mais de 24 horas n??o podem ser exclu??dos');
      return;
    }
    Alert.alert(
      'ATEN????O!!!',
      `Voc?? deseja excluir a ${data.tipo} no valor de: ${data.valor} ?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Confirmar',
          onPress: () => handleDeleteSucess(data)
        }
      ]
    )
  }

  async function handleDeleteSucess(data){
    await firebase.database().ref('historico')
    .child(uid).child(data.key).remove()
    .then( async ()=>{
      let saldoAtual = saldo;
      data.tipo === 'despesa' ? saldoAtual += parseFloat(data.valor) : saldoAtual -= parseFloat(data.valor);

      await firebase.database().ref('users').child(uid)
      .child('saldo').set(saldoAtual);
    })
    .catch((error)=>{
      alert(error)
    })
  }

  function handleShowPicker(){
    setShow(true);
  }

  function handleClose(){
    setShow(false);
  }

  const onChange = (date) => {
    setShow(Platform.OS === 'ios');
    setNewDate(date);
  } 

 return (
    <Background>
      <Header/>
      <Container>
        <Nome>{user && user.nome}</Nome>
        <Title>Saldo dispon??vel:</Title>
        <Saldo>R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Saldo>
      </Container>

      <Area>
        <TouchableOpacity onPress={handleShowPicker}>
          <FontAwesome name="calendar" size={24} color="#FFF" />
        </TouchableOpacity>
        <Title>Ultimas movimenta????es</Title>
      </Area>

      <List
      showsVerticalScrollIndicator={false}
      data={historico}
      keyExtractor={ item => item.key}
      renderItem={ ({ item }) => ( <HistoricoList data={item} deleteItem={handleDelete} /> )}
      />

      {show && (
        <DatePicker
        onClose={handleClose}
        date={newDate}
        onChange={onChange}
        />
      )}

    </Background>
  );
}