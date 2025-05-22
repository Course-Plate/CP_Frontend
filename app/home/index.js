import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from 'expo-router';
import SlideDrawer from '../../components/SlideDrawer';
import { useTheme } from '../../contexts/ThemeContext';
import { common, home, lightColors, darkColors } from '../../styles';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen() {
    const [userName, setUserName] = useState('사용자');
    const [menuOpen, setMenuOpen] = useState(false);
    const [region, setRegion] = useState(null);
    const [receiptStore, setReceiptStore] = useState(null);

    const router = useRouter();
    const { isDarkMode } = useTheme();
    const colors = isDarkMode ? darkColors : lightColors;

    useEffect(() => {
        const loadUserData = async () => {
            const name = await AsyncStorage.getItem('userName');
            if (name) setUserName(name);

            const regionData = await AsyncStorage.getItem('selectedRegion');
            if (regionData) setRegion(JSON.parse(regionData));
        };

        loadUserData();
    }, []);

    useFocusEffect(
        useCallback(() => {
            const checkReceiptEligibility = async () => {
                const data = await AsyncStorage.getItem('review_eligible');
                if (data) {
                    const parsed = JSON.parse(data);
                    if (parsed.expiresAt > Date.now()) {
                        setReceiptStore(parsed);
                    } else {
                        await AsyncStorage.removeItem('review_eligible');
                        setReceiptStore(null);
                    }
                } else {
                    setReceiptStore(null);
                }
            };

            checkReceiptEligibility();
        }, [])
    );

    const handleLogout = async () => {
        await AsyncStorage.clear();
        setMenuOpen(false);
        router.replace('/login');
    };

    return (
        <View style={[{ flex: 1, backgroundColor: colors.background }]}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* 상단 배경 */}
            <View style={home.header}>
                <Image
                    source={require('../../assets/main-bg.png')}
                    style={home.backgroundImage}
                />
                <View style={home.topRow}>
                    <View style={home.leftProfile}>
                        <TouchableOpacity onPress={() => router.push('/profile')}>
                            <View style={common.avatarCircle} />
                        </TouchableOpacity>
                        <Text style={[home.nameText]}>{userName}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setMenuOpen(true)}>
                        <Image
                            source={require('../../assets/home/slider.png')}
                            style={{ width: 28, height: 28 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* 지역 카드 */}
            <View style={[common.cardBox, { backgroundColor: colors.card }]}>
                <Text style={[home.cardText, { color: colors.text }]}>
                    {region
                        ? `${region.province} ${region.city}`
                        : '지역을 설정하지 않았습니다'}
                </Text>
                <TouchableOpacity
                    style={[common.button, { backgroundColor: colors.accent }]}
                    onPress={() => router.push('/preference/region')}
                >
                    <Text style={[common.buttonText, { color: '#fff' }]}>
                        {region ? '재선택' : '설정하기'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* 하단 버튼 */}
            <View style={home.bottomRow}>
                <TouchableOpacity
                    style={[home.bottomButton, { backgroundColor: colors.card }]}
                    onPress={() => router.push('/history')}
                >
                    <Image
                        source={require('../../assets/home/history.png')}
                        style={home.bottomIcon}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[home.bottomButton, { backgroundColor: colors.card }]}
                    onPress={() => {
                        if (!region) {
                            Alert.alert('지역 미설정', '검색을 하기 위해 먼저 지역을 설정해주세요.');
                        } else {
                            router.push('/search');
                        }
                    }}
                >
                    <Image
                        source={require('../../assets/home/search.png')}
                        style={home.bottomIcon}
                    />
                </TouchableOpacity>
            </View>

            {/* 영수증 스캔 버튼 */}
            {receiptStore && (
                <View style={{ alignItems: 'center', marginTop: 16 }}>
                    <TouchableOpacity
                        onPress={() => router.push('/review')}
                        style={[common.button, { backgroundColor: colors.accent, paddingHorizontal: 40 }]}
                    >
                        <Text style={[common.buttonText, { color: '#fff' }]}>📝 리뷰 작성</Text>
                    </TouchableOpacity>

                </View>
            )}

            {/* 슬라이드 메뉴 */}
            <SlideDrawer
                visible={menuOpen}
                onClose={() => setMenuOpen(false)}
                backgroundColor={colors.background}
            >
                <Text style={[common.drawerTitle, { color: colors.text }]}>설정 메뉴</Text>

                <TouchableOpacity
                    style={[common.drawerItem, {
                        borderBottomColor: colors.border,
                        borderBottomWidth: 1,
                        paddingVertical: 14,
                    }]}
                    onPress={() => router.push('/home_slider/setting')}
                >
                    <Text style={{ fontSize: 16, color: colors.text }}>설정</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[common.drawerItem, {
                        borderBottomColor: colors.border,
                        borderBottomWidth: 1,
                        paddingVertical: 14,
                    }]}
                >
                    <Text style={{ fontSize: 16, color: colors.text }}>알림</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleLogout}
                    style={[common.drawerItem, { paddingVertical: 14 }]}
                >
                    <Text style={{ fontSize: 16, color: colors.text }}>로그아웃</Text>
                </TouchableOpacity>
            </SlideDrawer>
        </View>
    );
}
