import {Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import colorsGuide from '../config/colorsGuide';

const CustomButton = ({
  title,
  color,
  icon,
  backgroundColor,
  iconSize,
  style,
  width,
  facebookIconStyle,
  ...otherProps
}) => {
  return (
    <TouchableOpacity
      style={[styles.btnContainer, {backgroundColor, width}, style]}
      {...otherProps}>
      <Image
        style={[
          styles.icon,
          {height: iconSize, width: iconSize},
          facebookIconStyle,
        ]}
        source={icon}
      />
      <Text style={[styles.btnText, {color}]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btnContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 7,
    paddingVertical: 16,
    flexDirection: 'row',
    borderRadius: 10,
  },

  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colorsGuide.white,
  },
  icon: {
    marginRight: 10,
  },
  faceBookIcon: {
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
