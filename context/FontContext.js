// context/FontContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useFonts, Candal_400Regular } from '@expo-google-fonts/candal';
import * as SplashScreen from 'expo-splash-screen';

// 스플래시 화면을 유지
SplashScreen.preventAutoHideAsync();

const FontContext = createContext();

export function FontProvider({ children }) {
    const [fontsLoaded] = useFonts({
        Candal: Candal_400Regular, // Candal 폰트 로드
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync(); // 폰트 로드 완료 후 스플래시 화면 숨기기
        }
    }, [fontsLoaded]);

    return (
        <FontContext.Provider value={{ fontsLoaded }}>
            {children}
        </FontContext.Provider>
    );
}

// Context를 쉽게 사용하기 위한 Hook
export function useFont() {
    return useContext(FontContext);
}