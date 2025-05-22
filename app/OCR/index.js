import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import TextRecognition from 'react-native-text-recognition';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import { lightColors, darkColors } from '../../styles';
import LoadingOverlay from '../../components/LoadingOverlay'; // ✅ 로딩 오버레이

export default function OCRScreen() {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false); // ✅ 로딩 상태
    const router = useRouter();
    const { isDarkMode } = useTheme();
    const colors = isDarkMode ? darkColors : lightColors;

    const handleImageSelect = async (fromCamera = false) => {
        try {
            const result = fromCamera
                ? await ImagePicker.launchCameraAsync({ quality: 1 })
                : await ImagePicker.launchImageLibraryAsync({ quality: 1 });

            if (result.canceled) return;

            const uri = result.assets[0].uri;
            setImage(uri);
            setLoading(true); // ✅ 로딩 시작

            const ocrResult = await TextRecognition.recognize(uri);
            const textCombined = ocrResult.join(' ');
            console.log('🧾 OCR 결과:', textCombined);

            const data = await AsyncStorage.getItem('review_eligible');
            if (!data) {
                setLoading(false);
                Alert.alert('오류', '리뷰 대상 정보가 없습니다.');
                return;
            }

            const parsed = JSON.parse(data);
            const storeName = parsed.title?.replace(/<[^>]+>/g, '');
            if (textCombined.includes(storeName)) {
                setLoading(false);
                router.push('/review');
            } else {
                setLoading(false);
                Alert.alert('인증 실패', `"${storeName}" 가게명이 영수증에서 인식되지 않았습니다.`);
            }
        } catch (err) {
            setLoading(false);
            console.error('OCR 오류:', err);
            Alert.alert('오류', 'OCR 처리 중 문제가 발생했습니다.');
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>영수증 OCR 인증</Text>

            {image && (
                <Image source={{ uri: image }} style={styles.preview} resizeMode="contain" />
            )}

            <TouchableOpacity
                onPress={() => handleImageSelect(true)}
                style={[styles.button, { backgroundColor: colors.accent }]}
            >
                <Text style={styles.buttonText}>📸 사진 찍기</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => handleImageSelect(false)}
                style={[styles.button, { backgroundColor: colors.border }]}
            >
                <Text style={[styles.buttonText, { color: colors.text }]}>🖼️ 갤러리에서 선택</Text>
            </TouchableOpacity>

            {/* ✅ 로딩 중이면 오버레이 표시 */}
            {loading && (
                <LoadingOverlay visible={true} color={colors.accent} message="OCR 인증 중..." />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 16,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    preview: {
        width: '100%',
        height: 300,
        marginBottom: 20,
    },
});
