import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {turniejeActions} from '../store';
import deleteIcon from '../../assets/icons/delete.png/';
import addIcon from '../../assets/icons/add.png';
import moreIcon from '../../assets/icons/more.png';
import modalAddGame from '../components/modals/modalAddGame';

const CustomFlatList = ({
  //propsy do flatlisty
  data,
  category,
  backgroundColor,
  textColor,
  deleteElement,
  withSearchbar,
}) => {
  const [flatListData, setFlatListData] = useState(data);
  const [searchInputValue, setSearchInputValue] = useState('');

  const deleteAlert = (id, name) => {
    //wyskakujące okienko po naciśnięciu ikony kosza
    Alert.alert('Delete alert', 'Do you want to delete &{name}?', [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
      {text: 'Ok', onPress: () => deleteElement(id)}, //funkcja deleteelement która usuwa element po wskazanym id
    ]);
  };

  const renderSearchBar = () => {
    //formularz wyszukiwania
    return (
      //return do searchBaru
      <TextInput
        inlineImageLeft="search_icon"
        inlineImagePadding={5}
        clearButtonMode="while-editing"
        value={searchInputValue}
        onChangeText={text => {
          searchFilterFunction(text); //podpięta funkcja wyszukiwania
        }}
        placeholder="Wyszukaj..."
        placeholderTextColor="gray"
      />
    );
  };
  const searchFilterFunction = text => {
    //funkcja wyszukiwania
    const newData = data?.filter(item => {
      const itemData = item.name.toLowerCase().trim(); //zamian tekstu na małe litery
      const textData = text.toLowerCase();
      return itemData.includes(textData);
    });
    setSearchInputValue(text); //funkcje przejmujące dane z searchBar
    setFlatListData(newData);
  };
  const renderItem = element => {
    //element to item tylko inaczej nazwany
    //wyświetl element - wyswietlenie pojedynczego elementu naszej flatlisty
    return (
      <View style={styles.itemContainer} key={element.id.toString()}>
        <TouchableOpacity //data turnieju
          style={styles.buttonBreak}></TouchableOpacity>
        <TouchableOpacity //data turnieju
          style={[styles.button, styles.buttonDate]}>
          <Text numberOfLines={1} style={[styles.date]}>
            {element.date}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity //data turnieju
          style={styles.buttonBreak}></TouchableOpacity>

        <TouchableOpacity //miasto turnieju
          style={styles.buttonCity}>
          <Text numberOfLines={1} style={[styles.city, {color: textColor}]}>
            {element.city}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity //data turnieju
          style={styles.buttonBreak}></TouchableOpacity>
        <TouchableOpacity //nazwa turnieju z linkiem
          onPress={() => Linking.openURL(element.link)}
          style={styles.nameContainer}>
          <Text numberOfLines={1} style={[styles.name, {color: textColor}]}>
            {element.name}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity //data turnieju
          style={styles.buttonBreak}></TouchableOpacity>
        <TouchableOpacity //ikona z koszem
          //onPress={() => } //podpięta funkcja z wyskakującym okienkiem
          style={[styles.buttonJoin]}>
          <Text style={styles.textStyle}>Join</Text>
        </TouchableOpacity>
        <TouchableOpacity //data turnieju
          style={styles.buttonBreak}></TouchableOpacity>
        <TouchableOpacity //ikona z koszem
          //onPress={() => } //podpięta funkcja z wyskakującym okienkiem
          style={[styles.buttonConfirm]}>
          <Text style={styles.textStyle}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity //ikona z koszem
          //onPress={() => deleteAlert(element.id, element.name} //podpięta funkcja z wyskakującym okienkiem
          style={styles.imageContainer}>
          <Image /*source={deleteIcon} style={styles.icon} */ />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    //return do flatListy
    <View style={[{backgroundColor: backgroundColor}, styles.container]}>
      {withSearchbar ? renderSearchBar() : null}
      <FlatList
        data={flatListData} //przekazujemy do data wartosc new data z searchbar
        renderItem={({item}) => renderItem(item)} //do renderItem przekazujemy wartośc funkcji renderItem
        keyExtractor={(item, index) => index.toString()}
        style={{flex: 4}}
      />
    </View>
  );
};

const mapDispatch = dispatch => ({
  deleteElement: id => dispatch(turniejeActions.deleteElement(id)),
});

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flex: 4,
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    flex: 5,
    //alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: '100%',
  },
  nameContainer: {
    flexBasis: '40%',
    backgroundColor: '#2a343f',
    borderRadius: 5,
    justifyContent: 'flex-end',
  },
  imageContainer: {
    flexBasis: '10%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    borderRadius: 5,
    paddingVertical: 1,
    paddingHorizontal: 1,
    justifyContent: 'flex-end',
    elevation: 2,
    width: 70,
  },
  buttonBreak: {
    width: 6,
  },
  buttonJoin: {
    borderRadius: 5,
    paddingVertical: 1,
    paddingHorizontal: 1,
    justifyContent: 'flex-end',
    elevation: 2,
    width: 30,
    backgroundColor: '#f8fc05',
    justifyContent: 'flex-end',
  },
  buttonConfirm: {
    borderRadius: 5,
    paddingVertical: 1,
    paddingHorizontal: 1,
    justifyContent: 'flex-end',
    elevation: 2,
    width: 55,
    backgroundColor: '#32fc05',
    justifyContent: 'flex-end',
  },
  buttonDate: {
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  buttonCity: {
    borderRadius: 5,
    paddingVertical: -5,
    paddingHorizontal: -5,
    elevation: 1,
    width: 50,
    backgroundColor: '#b20505',
    justifyContent: 'flex-end',
  },
  textStyle: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
  date: {
    color: 'black',
    fontSize: 12,
    fontWeight: '200',
    textAlign: 'center',
  },
  name: {
    fontSize: 12,
    letterSpacing: 1,
    paddingHorizontal: 5,
  },

  city: {
    fontSize: 12,
    letterSpacing: 1,
    paddingHorizontal: 1,
  },

  icon: {
    height: 20,
    width: 20,
    justifyContent: 'flex-end',
  },
});
export default connect(null, mapDispatch)(CustomFlatList);
