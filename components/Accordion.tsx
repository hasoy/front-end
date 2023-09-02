import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Title } from './Title';
import { COLORS } from '../constants/Colors';

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePress = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.accordion}>
      <TouchableOpacity onPress={handlePress} >
        <View style={{ flexDirection: 'row', alignItems:'center', gap:10}}>
          <Title label={title} level='3'></Title>
          <AntDesign name={isOpen ? 'caretup' : 'caretdown'} size={12} />
        </View>
      </TouchableOpacity>
      {isOpen && children}
    </View>
  );
};

const styles = StyleSheet.create({
  accordion: {
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Accordion;
