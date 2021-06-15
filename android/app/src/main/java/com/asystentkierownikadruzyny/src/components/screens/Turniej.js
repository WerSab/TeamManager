import React from 'react';
import {connect} from 'react-redux';
import CustomFlatList from '../CustomFlatList';
import Header from '../Header';
import {View} from 'react-native'



const Turniej = ({turnieje}) => {
  //turniej to kategoria , a turnieje to cała baza danych
  const turniej = turnieje.filter(item => item.category === 'turniej'); //do zmiennej turniej przypinamy funkcje filtrująca bazę po kategorii
  const {category} = turniej[0];
  return (
    <View
    style={{
      flex: 2,
      justifyContent: 'center',
            backgroundColor: 'black',
    }}>
      <Header category={category} textColor="#f2f4f7" />
      <CustomFlatList
        data={turniej}
        category={category}
        backgroundColor="#212933"
        textColor="white"
        withSearchbar={false}
      />
      </View>
   
  );
};

const mapState = state => ({
  turnieje: state.turnieje
});


export default connect(mapState)(Turniej);
