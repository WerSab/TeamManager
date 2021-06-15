import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';

import {connect} from 'react-redux';
import {playerActions} from '../store';

const CustomFlatList_2 = (team, category) => {
  const [flatListData, setFlatListData] = useState(team);
  const [searchInputValue, setSearchInputValue] = useState('');

  const deleteAlert = (id, name) => {
    Alert.alert('Delete alert', `Do You want to delete ${name}?`, [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
      {text: 'Ok', onPress: () => deleteElement(id)},
    ]);
  };

  const renderSearchBar = () => {
    return (
      <TextInput
        inlineImageLeft="search_icon"
        inlineImagePadding={5}
        clearButtonMode="while-editing"
        value={searchInputValue}
        onChangeText={text => {
          searchFilterFunction(text);
        }}
        placeholder="Wyszukaj..."
        placeholderTextColor="gray"
      />
    );
  };

  const searchFilterFunction = text => {
    const newTeam = team?.filter(item => {
      const itemTeam = item.name.toLowerCase().trim();
      const textTeam = text.toLowerCase();
      return itemTeam.includes(textTeam);
    });
    setSearchInputValue(text);
    setFlatListData(newTeam);
  };

  const renderItem = element => {
    return (
      <View style={styles.itemContainer} key={element.id.toString()}>
        <TouchableOpacity //imie i nazwisko
          style={[styles.button, styles.buttonTeam]}>
          <Text numberOfLines={1} style={[styles.name, {color: textColor}]}>
            {element.name}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity //ranking
          style={styles.buttonRanking}>
          <Text numberOfLines={1} style={[styles.ranking, {color: textColor}]}>
            {element.ranking}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteAlert(element.id, element.name)}
          style={styles.imageContainer}>
          <Image source={deleteIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={[styles.container]}>
      <FlatList
        team={flatListData} //przekazujemy do data wartosc new data z searchbar
        renderItem={({item}) => renderItem(item)} //do renderItem przekazujemy wartośc funkcji renderItem
        keyExtractor={(item, index) => index.toString()}
        style={{flex: 1}}
      />
    </View>
  );
};

const mapDispatch = dispatch => ({
  deleteElement: id => dispatch(playerActions.deleteElement(id)),
});
export default connect(null, mapDispatch)(CustomFlatList_2);

const styles = StyleSheet.create({
  ontainer: {
    flex: 1,
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: '100%',
  },
  image: {height: 70, width: 110, flexBasis: '20%'},
  textContainer: {
    textAlign: 'center',
    flexBasis: '70%',
  },
  name: {
    fontSize: 20,
    letterSpacing: 1,
    paddingHorizontal: 5,
  },
  imageContainer: {
    flexBasis: '10%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  icon: {
    height: 25,
    width: 25,
    tintColor: 'black',
  },
});
