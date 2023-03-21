import React, { useEffect, useState } from 'react';
import {
  Button,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList

} from 'react-native';

import styles from './style';

export default function Store() {

  const [data_store, set_data_store] = useState()

  // useEffect(
  //   () => {
  //     async function get_product() {
  //       await fetch('http://192.168.1.106:3000/price_product')
  //         .then(res => res.json())
  //         .then(res => {
  //           set_data_store(res[0])
  //         })
  //       console.log(data_store)
  //     }
  //     get_product()
  //   }, []
  // )

  return (
    <View style={{flex: 1, backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

      <Text>Seja Bem-Vindo a nossa Loja ONE HEART!</Text>

      <FlatList style={{ width: '90%', height: '90%'}}
        data={data_store}
        renderItem={({ item }) => (
          <ScrollView>
          <View style={{width: '100%', height: 300, backgroundColor: 'green', marginBottom: 50}}>
            <Text>{item.price_product}</Text>
              <Image source={{ uri: item.img_product }} style={{width: '100%', height: '100%'}}/>
          </View>
          </ScrollView>
        )}
      />
    </View>
  )
}


