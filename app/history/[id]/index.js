import React, { useState, useMemo, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTheme } from '../../../context/ThemeContext';
import * as NaverMap from '@mj-studio/react-native-naver-map';
import { common, lightColors, darkColors, home } from '../../../styles';

export default function HistoryDetailScreen() {
    const { id } = useLocalSearchParams();
    const { isDarkMode } = useTheme();
    const colors = isDarkMode ? darkColors : lightColors;

    const [selectedPlace, setSelectedPlace] = useState(null);
    const [reservationVisible, setReservationVisible] = useState(false);
    const mapRef = useRef(null);

    const mockPlaces = [
        { id: 'a', name: '조선면옥', lat: 37.571, lng: 126.98, type: '아침', info: '한식 전문점' },
        { id: 'b', name: '떡볶이공방', lat: 37.572, lng: 126.981, type: '점심', info: '분식 맛집' },
        { id: 'c', name: '이탈리안라운지', lat: 37.573, lng: 126.982, type: '저녁', info: '이탈리안 레스토랑' },
    ];

    // 중심 마커 계산
    const centerMarker = useMemo(() => {
        const centerPoint = {
            lat: mockPlaces.reduce((sum, p) => sum + p.lat, 0) / mockPlaces.length,
            lng: mockPlaces.reduce((sum, p) => sum + p.lng, 0) / mockPlaces.length,
        };

        const getDistance = (a, b) => {
            const dLat = a.lat - b.lat;
            const dLng = a.lng - b.lng;
            return Math.sqrt(dLat * dLat + dLng * dLng);
        };

        return mockPlaces.reduce((closest, current) => {
            const currentDist = getDistance(current, centerPoint);
            const closestDist = getDistance(closest, centerPoint);
            return currentDist < closestDist ? current : closest;
        });
    }, []);

    //  지도 초기화 후에 지연을 두고 카메라 이동
    useEffect(() => {
        if (!mapRef.current) return;
        // 500ms 정도 지연을 줘야 native view가 완전히 준비됩니다.
        const id = setTimeout(() => {
            mapRef.current.animateCameraTo({
                lat: centerMarker.lat,
                lng: centerMarker.lng,
                zoom: 18,
            });
        }, 500);
        return () => clearTimeout(id);
    }, [centerMarker]);

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <Stack.Screen options={{ title: `코스 상세 ${id}` }} />

            {/* 네이버 지도 */}
            <NaverMap.NaverMapView
                style={{ flex: 1 }}
                initialCamera={{
                    latitude: centerMarker.lat,
                    longitude: centerMarker.lng,
                    zoom: 15,
                }}
            >
                {mockPlaces.map((place) => (
                    <NaverMap.NaverMapMarkerOverlay
                        key={place.id}
                        latitude={place.lat}      // 반드시 latitude, longitude 사용 :contentReference[oaicite:1]{index=1}
                        longitude={place.lng}
                        image={{ symbol: place.id === centerMarker.id ? 'red' : 'green' }}
                        onTap={() => setSelectedPlace(place)}  // 이벤트명도 onTap 으로 :contentReference[oaicite:2]{index=2}
                    />
                ))}
            </NaverMap.NaverMapView>

            {/* 음식점 정보 카드 리스트 */}
            <ScrollView style={{ padding: 10, maxHeight: 220 }}>
                {mockPlaces.map((place) => (
                    <View key={place.id} style={[common.cardBox, {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: colors.card,
                        paddingVertical: 20,
                        minHeight: 0,
                        marginBottom: 10,
                    }]}>
                        <Text style={{ color: colors.text }}>{place.type}: {place.name}</Text>
                        <TouchableOpacity onPress={() => setSelectedPlace(place)}>
                            <Text style={[home.tabButton, { color: colors.text, backgroundColor: '#F57C00', paddingVertical: 10 }]}>음식점 정보</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setReservationVisible(true)}>
                            <Text style={[home.tabButton, { color: colors.text, backgroundColor: '#F57C00', paddingVertical: 10 }]}>예약</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            {/* 음식점 정보 모달 */}
            {selectedPlace && (
                <Modal visible={true} transparent animationType="slide">
                    <View style={[common.modal, { backgroundColor: '#fff' }]}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{selectedPlace.name}</Text>
                        <Text>{selectedPlace.info}</Text>
                        <TouchableOpacity onPress={() => setSelectedPlace(null)}>
                            <Text style={{ color: 'blue', marginTop: 20 }}>닫기</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            )}

            {/* 예약 모달 */}
            {reservationVisible && (
                <Modal visible={true} transparent animationType="fade">
                    <View style={[common.modal, { backgroundColor: '#fff' }]}>
                        <Text style={{ fontSize: 18 }}>예약</Text>
                        <Text>날짜: 2025-01-01</Text>
                        <Text>시간: 09:00</Text>
                        <Text>인원: 2명</Text>
                        <TouchableOpacity onPress={() => setReservationVisible(false)}>
                            <Text style={{ color: 'green', marginTop: 20 }}>예약 완료</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            )}
        </View>
    );
}
