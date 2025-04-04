import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from 'expo-router';
import SlideDrawer from '../../components/SlideDrawer';
import { useTheme } from '../../contexts/ThemeContext';
import {
    common,
    home,
    lightColors,
    darkColors,
} from '../../styles';
import drawer from '../../styles/drawer';


export default function HomeScreen() {
    const [userName, setUserName] = useState('사용자');
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState('region');
    const router = useRouter();
    const { isDarkMode } = useTheme();

    const colors = isDarkMode ? darkColors : lightColors;

    useEffect(() => {
        const loadUser = async () => {
            const name = await AsyncStorage.getItem('userName');
            if (name) setUserName(name);
        };
        loadUser();
    }, []);

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

            {/* 탭 버튼 */}
            <View style={home.tabRow}>
                {['region', 'preference'].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => setSelectedTab(tab)}
                        style={[
                            home.tabButton,
                            selectedTab === tab
                                ? home.tabActive
                                : { backgroundColor: isDarkMode ? '#444' : '#eee' },
                        ]}
                    >
                        <Text
                            style={[
                                selectedTab === tab
                                    ? home.tabTextActive
                                    : { color: isDarkMode ? '#aaa' : '#333', fontWeight: 'bold' },
                            ]}
                        >
                            {tab === 'region' ? '여행 지역' : '음식 취향'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* 카드 */}
            <View style={[common.cardBox, { backgroundColor: colors.card }]}>
                <Text style={[home.cardText, { color: colors.text }]}>
                    {selectedTab === 'region'
                        ? '지역을 설정하지 않았습니다'
                        : '취향 설문을 하지 않았습니다'}
                </Text>
                <TouchableOpacity
                    style={[common.button, { backgroundColor: colors.accent }]}
                    onPress={() =>
                        selectedTab === 'preference' &&
                        router.push('/preference')
                    }
                >
                    <Text style={[common.buttonText, { color: '#fff' }]}>
                        {selectedTab === 'region' ? '설정하기' : '취향 설문하기'}
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
                    onPress={() => router.push('/search')}
                >
                    <Image
                        source={require('../../assets/home/search.png')}
                        style={home.bottomIcon}
                    />
                </TouchableOpacity>
            </View>

            {/* 슬라이드 메뉴 */}
            <SlideDrawer
                visible={menuOpen}
                onClose={() => setMenuOpen(false)}
                backgroundColor={colors.background}
            >
                <Text style={[drawer.drawerTitle, { color: colors.text }]}>
                    설정 메뉴
                </Text>

                <TouchableOpacity
                    style={[
                        drawer.drawerItem,
                        {
                            borderBottomColor: isDarkMode ? '#333' : '#ddd',
                            borderBottomWidth: 1,
                        },
                    ]}
                    onPress={() => router.push('/home_slider/setting')}
                >
                    <Text style={[drawer.drawerItemText, { color: colors.text }]}>
                        설정
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        drawer.drawerItem,
                        {
                            borderBottomColor: isDarkMode ? '#333' : '#ddd',
                            borderBottomWidth: 1,
                        },
                    ]}
                >
                    <Text style={[drawer.drawerItemText, { color: colors.text }]}>
                        알림
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLogout} style={drawer.drawerItem}>
                    <Text style={[drawer.drawerItemText, { color: colors.text }]}>
                        로그아웃
                    </Text>
                </TouchableOpacity>
            </SlideDrawer>

        </View>
    );
}
