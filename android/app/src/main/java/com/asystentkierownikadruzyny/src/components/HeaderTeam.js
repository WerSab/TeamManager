import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import addIcon from '../../assets/icons/add.png';
import moreIcon from '../../assets/icons/more.png';
import logo from '../../assets/pictures/logo.png';

const HeaderTeam = ({category}) => {
  return (
    <View >
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
        <Text style={[styles.textStyle]}>
        Drużyna
      </Text>
        
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Image style={styles.icon} source={addIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    backgroundColor: '#141518',
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
    letterSpacing: 4,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
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
export default HeaderTeam ;
