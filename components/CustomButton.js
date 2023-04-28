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
      <Text style={[styles.btnText, {color}]}>{title}</Text>
      <Image
        style={[
          styles.icon,
          {height: iconSize, width: iconSize},
          facebookIconStyle,
        ]}
        source={icon}
      />
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btnContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 15,
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 5,
  },

  btnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colorsGuide.white,
  },
  icon: {
    marginLeft: 10,
  },
  faceBookIcon: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
