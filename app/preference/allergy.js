import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../contexts/ThemeContext';
import { common, allergy, lightColors, darkColors } from '../../styles';

const ALLERGY_OPTIONS = [
    '우유', '계란', '땅콩', '대두(콩)', '견과류', '밀', '감귤류',
    '복숭아', '토마토', '조개류', '생선', '소고기', '돼지고기',
    '닭고기', '갑각류', '메밀', '잔탄검'
];

export default function AllergyScreen() {
    const router = useRouter();
    const { isDarkMode } = useTheme();
    const colors = isDarkMode ? darkColors : lightColors;

    const [selected, setSelected] = useState([]);

    useEffect(() => {
        const loadSelected = async () => {
            const stored = await AsyncStorage.getItem('allergy');
            if (stored) setSelected(JSON.parse(stored));
        };
        loadSelected();
    }, []);

    const toggleSelect = (item) => {
        setSelected((prev) =>
            prev.includes(item)
                ? prev.filter((i) => i !== item)
                : [...prev, item]
        );
    };

    const removeTag = (item) => {
        setSelected((prev) => prev.filter((i) => i !== item));
    };

    const saveSelection = async () => {
        await AsyncStorage.setItem('allergy', JSON.stringify(selected));
        router.back();
    };

    const renderItem = ({ item }) => {
        const isSelected = selected.includes(item);
        return (
            <TouchableOpacity onPress={() => toggleSelect(item)}>
                <View
                    style={{
                        paddingVertical: 14,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.divider,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            color: isSelected ? colors.accent : colors.text,
                            fontWeight: isSelected ? 'bold' : 'normal',
                        }}
                    >
                        {item}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={[allergy.container, { backgroundColor: colors.background }]}>
            <Text style={[common.title, { color: colors.text, textAlign: 'center' }]}>
                알레르기 성분 선택
            </Text>

            {selected.length > 0 && (
                <View style={allergy.tagWrap}>
                    {selected.map((item) => (
                        <View key={item} style={allergy.tag}>
                            <Text style={allergy.tagText}>{item}</Text>
                            <TouchableOpacity onPress={() => removeTag(item)}>
                                <Text style={allergy.removeBtn}> ✕ </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            )}

            <FlatList
                data={ALLERGY_OPTIONS}
                keyExtractor={(item) => item}
                renderItem={renderItem}
                contentContainerStyle={{ paddingTop: 24, paddingBottom: 80 }}
            />

            <View style={allergy.fixedBottom}>
                <TouchableOpacity
                    style={[allergy.completeBtn, { backgroundColor: colors.accent }]}
                    onPress={saveSelection}
                >
                    <Text style={allergy.completeText}>선택 완료</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
