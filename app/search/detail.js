// app/search/detail.js
import React from 'react';
import { Text, StyleSheet, SafeAreaView, ScrollView, Linking, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import { lightColors, darkColors } from '../../styles';

export default function StoreDetailScreen() {
    const { title, desc, address, tel, link, category, image } = useLocalSearchParams();
    const { isDarkMode } = useTheme();
    const colors = isDarkMode ? darkColors : lightColors;

    const openLink = () => {
        if (link) Linking.openURL(link);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {image && (
                    <Image
                        source={{ uri: image }}
                        style={styles.thumbnail}
                        resizeMode="cover"
                    />
                )}

                <Text style={[styles.title, { color: colors.text }]}> {title?.replace(/<[^>]+>/g, '')} </Text>

                {category && (
                    <Text style={[styles.category, { color: colors.accent }]}>[{category}]</Text>
                )}

                <Text style={[styles.description, { color: colors.text }]}> {desc || '설명이 없습니다.'} </Text>

                <Text style={[styles.address, { color: colors.text }]}>📍 {address || '주소 정보 없음'} </Text>

                {tel && (
                    <Text style={[styles.tel, { color: colors.text }]}>📞 {tel}</Text>
                )}

                {link && (
                    <Text
                        style={[styles.link, { color: colors.accent }]}
                        onPress={openLink}
                    >
                        🔗 웹사이트 바로가기
                    </Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        padding: 24,
    },
    thumbnail: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginBottom: 16,
        backgroundColor: '#ccc',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    category: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        marginBottom: 16,
    },
    address: {
        fontSize: 14,
        marginBottom: 12,
    },
    tel: {
        fontSize: 14,
        marginBottom: 12,
    },
    link: {
        fontSize: 16,
        marginTop: 12,
        textDecorationLine: 'underline',
    },
});
