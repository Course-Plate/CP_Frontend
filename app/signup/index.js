import React, { useState } from 'react';
import common from '../../styles/common';

import {
    View,
    Text,
    Alert,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import CustomInput from '../../components/CustomInput';
import PrimaryButton from '../../components/PrimaryButton';

export default function SignupScreen() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isVerified, setIsVerified] = useState(false); // ✅ 인증 완료 여부

    const handleRequestVerification = () => {
        if (!phone) {
            Alert.alert('오류', '전화번호를 입력해주세요.');
            return;
        }

        // TODO: 인증번호 요청 API
        console.log('📤 인증번호 요청:', phone);
        Alert.alert('인증번호 전송됨');
        setIsVerified(true); // ✅ 실제 요청 성공 시 처리
    };

    const handleSignup = () => {
        if (!name || !phone || !password || !confirmPassword) {
            Alert.alert('입력 오류', '모든 항목을 입력해주세요.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('비밀번호 불일치', '비밀번호가 일치하지 않습니다.');
            return;
        }

        console.log('👤 회원가입 요청:', { name, phone, password });
        Alert.alert('회원가입 완료', `${name}님, 환영합니다!`);
        router.push('/login');
    };

    // ✅ 모든 필수 값이 입력됐고, 인증까지 완료되었는지 확인
    const isFormValid =
        name.trim() &&
        phone.trim() &&
        password.trim() &&
        confirmPassword.trim() &&
        password === confirmPassword &&
        isVerified;

    return (
        <View style={common.startContainer}>
            {/* 로고 이미지 */}
            <Image
                source={require('../../assets/logo/logo_clean.png')}
                style={common.logo}
            />

            <Text style={common.title}>회원가입</Text>

            <CustomInput
                placeholder="이름"
                value={name}
                onChangeText={setName}
            />

            {/* 전화번호 + 인증요청 */}
            <View style={common.row}>
                <CustomInput
                    placeholder="전화번호 (- 없이)"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    style={[common.flex, common.noMargin]}
                />
                <TouchableOpacity
                    style={common.verifyButton}
                    onPress={handleRequestVerification}
                >
                    <Text style={common.verifyText}>인증요청</Text>
                </TouchableOpacity>
            </View>

            <CustomInput
                placeholder="비밀번호"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <CustomInput
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />

            {/* ✅ 완료 버튼 - 비활성화 상태 적용 */}
            <PrimaryButton
                title="완료"
                onPress={handleSignup}
                disabled={!isFormValid}
            />
        </View>
    );
}
