import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import common from '../../styles/common';

export default function LoginScreen() {
    const router = useRouter();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!phone || !password) {
            Alert.alert('입력 오류', '전화번호와 비밀번호를 입력해주세요.');
            return;
        }

        // TODO: 실제 로그인 API 연동
        console.log('로그인 시도:', { phone, password });

        Alert.alert('로그인 성공', `${phone}님 환영합니다!`);
        router.push('/home'); // 로그인 성공 시 이동
    };

    return (
        <View style={common.container}>
            <Image
                source={require('../../assets/logo/logo.png')}
                style={common.logo}
            />

            <TextInput
                style={common.input}
                placeholder="전화번호 (- 없이)"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                autoCapitalize="none"
            />

            <TextInput
                style={common.input}
                placeholder="비밀번호"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={common.button} onPress={handleLogin}>
                <Text style={common.buttonText}>로그인</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/signup')}>
                <Text style={common.linkText}>회원가입</Text>
            </TouchableOpacity>
        </View>
    );
}
