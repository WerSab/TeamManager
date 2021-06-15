import React, {useState} from 'react';
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
import {turniejeActions} from '../../store';

const modalAddGame = ({turnieje, addTurniej}) => {
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
        backgroundColor: 'white',
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
              <Picker.Item label="Turniej" value="turniej" />
              <Picker.Item label="Olimpiada" value="olimpiada" />
              <Picker.Item label="Liga" value="liga" />
              <Picker.Item label="Mistrzostwa" value="mistrzostwa" />
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
    </View>
  );
};

const mapDispatch = dispatch => ({
  
  addTurnieje: data => dispatch(turniejeActions.addTurniej(data)),
});

const styles = StyleSheet.create({
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
    elevation: 2,
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: '90%',
    marginLeft: 4,
  },
});
const addConnect=connect(null, mapDispatch)(modalAddGame);
export default addConnect; //wyciąganie danych z mapState
