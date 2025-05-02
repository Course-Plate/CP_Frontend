import React from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import NaverMap from '../../components/NaverMap';
import {View} from "react-native";

export default function SearchScreen() {
    const router = useRouter();


    return (
        <View style={{ flex: 1 }}>
            <NaverMap />
        </View>
    );
}
