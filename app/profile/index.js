import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import common from "../../styles/common";
import PrimaryButton from '../../components/PrimaryButton';
import CustomInput from "../../components/CustomInput";
import { useFont } from "../../context/FontContext";

export default function Profile() {

    const { fontsLoaded } = useFont();  // 폰트 로드 상태 가져오기

    if (!fontsLoaded) {
        return null; // 폰트가 로드될 때까지 아무것도 렌더링하지 않음
    }

    return (
        <View style={common.startContainer}>

            <Image
                source={require('../../assets/logo/Logo.png')}
                style={[common.logo, {width: 300, height: 300}]}
            />

            {/* TODO: 정보 불러오기 */}

            {/* 전화번호 */}
            <Text style={[common.headerText2, {color: 'black', fontSize: 25, marginLeft: 0, marginBottom: 5}]}>Phone</Text>
            <View style={common.view}><Text style={[common.buttonText, {color: 'black'}]}>010-1234-5678</Text></View>

            {/* 비밀번호 */}
            <Text style={[common.headerText2, {color: 'black', fontSize: 25, marginLeft: 0, marginBottom: 5}]}>Password</Text>

            {/* TODO: 비밀번호 해시화 */}
            <View style={common.view}><Text style={[common.buttonText, {color: 'black'}]}>abcdefghijklmnop</Text></View>

            {/* 리뷰 포인트 */}
            <Text style={[common.headerText2, {color: 'black', fontSize: 25, marginLeft: 0, marginBottom: 5}]}>Review Point</Text>
            <View style={common.view}><Text style={[common.buttonText, {color: 'black'}]}>50 P</Text></View>

        </View>
    );
}