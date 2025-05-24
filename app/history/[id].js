// /history/[id].js

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import { lightColors, darkColors } from '../../styles';

export default function HistoryDetailScreen() {
    const { id } = useLocalSearchParams();
    const { isDarkMode } = useTheme();
    const colors = isDarkMode ? darkColors : lightColors;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <Stack.Screen options={{ title: `기록 상세 (${id})` }} />
            <View style={styles.content}>
                <Text style={[styles.label, { color: colors.text }]}>기록 ID: {id}</Text>
                <Text style={[styles.label, { color: colors.text }]}>기록 세부 내용은 추후 구현 예정입니다.</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 12,
    },
});
