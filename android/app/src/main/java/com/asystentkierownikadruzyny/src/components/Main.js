import React, {useState, useEffect} from 'react';

import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  Text,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import CustomFlatList from './CustomFlatList';
import {turniejeActions} from '../store';
import addIcon from '../../assets/icons/add.png';
import moreIcon from '../../assets/icons/more.png';
import logo from '../../assets/pictures/logo.png';

const Main = ({turnieje, addTurniej, navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [linkInput, setLinkInput] = useState('');
  const [selectedValue, setSelectedValue] = useState('Turniej');

  const clearInputs = () => {
    setNameInput('');
    setDateInput('');
    setCityInput('');
    setLinkInput('');
  };

  const setTurniejToDB = () => {
    let itemToSet = {
      id: turnieje.length,
      category: selectedValue,
      date: dateInput,
      city: cityInput,
      name: nameInput,
      link: linkInput,
    };
    addTurniej(itemToSet);
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}>
      {isModalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
          onBackdropPress={() => setIsModalVisible(false)}
          onBackButtonPress={() => setIsModalVisible(false)}>
          <View style={styles.centeredView}>
            <Picker
              selectedValue={selectedValue}
              style={{height: 50, width: 150}}
              onValueChange={itemValue => setSelectedValue(itemValue)}>
              <Picker.Item label="Turnieje" value="turniej" />
            </Picker>
            <TextInput
              style={styles.input}
              onChangeText={setDateInput}
              value={dateInput}
              placeholder="Termin turnieju..."
            />
            <TextInput
              style={styles.input}
              onChangeText={setNameInput}
              value={nameInput}
              placeholder="Nazwa turnieju..."
            />
            <TextInput
              style={styles.input}
              onChangeText={setCityInput}
              value={cityInput}
              placeholder="Miejsce turnieju..."
            />
            <TextInput
              style={styles.input}
              onChangeText={setLinkInput}
              value={linkInput}
              placeholder="Link do strony..."
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
              }}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setIsModalVisible(!isModalVisible);
                  setNameInput('');
                }}>
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonSafe]}
                onPress={() => {
                  setIsModalVisible(!isModalVisible);
                  clearInputs();
                  setTurniejToDB();
                }}>
                <Text style={styles.textStyle}>Safe</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      <View style={styles.buttonLogo}>
        <TouchableOpacity>
          <Image style={styles.icon} source={logo} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.textTeam}>KS CRACOVIA 1906 - SZACHY</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Image style={styles.icon} source={moreIcon} />
        </TouchableOpacity>
        

        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Image style={styles.icon} source={addIcon} />
        </TouchableOpacity>
      </View>
      <CustomFlatList
        data={turnieje}
        borderRadius="20"
        category="Kategoria"
        backgroundColor="#212933"
        textColor="#FFFFFF"
        withSearchbar={true}
      />
    </View>
  );
};
const mapState = state => ({
  //wyci??gamy dane ze store
  turnieje: state.turnieje,
});

const mapDispatch = dispatch => ({
  addTurnieje: data => dispatch(turniejeActions.addTurniej(data)),
});

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#33383C',
    width: '100%',
    borderRadius: 10,
  },
  buttonLogo: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#141518',
    width: '100%',
  },
  icon: {
    height: 40,
    width: 40,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    margin: '10%',
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    //elevation: 2,
    width: 120,
  },
  buttonClose: {
    backgroundColor: '#CCCCCC',
  },
  buttonSafe: {
    backgroundColor: '#94B444',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textTeam: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 10,
    elevation: 2,
    textAlign: 'center',
    letterSpacing: 4,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: '90%',
    marginLeft: 4,
  },
  picture: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: '70%',
    marginLeft: 4,
  },
});
export default connect(mapState, mapDispatch)(Main); //wyci??ganie danych z mapState
