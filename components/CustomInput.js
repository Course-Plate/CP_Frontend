// components/CustomInput.js
import React from 'react';
import { TextInput } from 'react-native';
import common from '../styles/common';

export default function CustomInput({ style, ...props }) {
    return <TextInput style={[common.input, style]} {...props} />;
}
