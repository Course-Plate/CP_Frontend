// /history/index.js

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import { common, lightColors, darkColors } from '../../styles';

export default function HistoryScreen() {
    const router = useRouter();
    const { isDarkMode } = useTheme();
    const colors = isDarkMode ? darkColors : lightColors;

    const historyList = [
        { id: '1', date: '2025-01-01', region: '서울 종로구' },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <Stack.Screen options={{ title: '코스 검색 기록' }} />
            <ScrollView style={{ padding: 20 }}>
                {historyList.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => router.push(`/history/${item.id}`)}
                        style={[common.cardBox, {
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            backgroundColor: colors.card,
                            minHeight: 50,
                            marginHorizontal: 0,
                            marginBottom: 15,
                        }]}
                    >
                        <Text style={{ color: colors.text, fontWeight: 'bold', fontSize: 20 }}>{item.date}</Text>
                        <Text style={{ color: colors.text, fontSize: 18 }}>여행 지역: {item.region}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}
