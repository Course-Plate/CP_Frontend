// app/home/index.js

import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Modal } from 'react-native';
import common from "../../styles/common";
import PrimaryButton from '../../components/PrimaryButton';
import { usePreferences } from "../../context/PreferencesContext";
import { Search, History, User } from 'lucide-react-native';
import { useFonts, Candal_400Regular } from '@expo-google-fonts/candal';
import * as SplashScreen from 'expo-splash-screen';


// 알림창 알림문구 설정 함수
const setModalMessage = (isLocationSet, isTasteSurveyCompleted) => {
    if (!isLocationSet && !isTasteSurveyCompleted) {
        return "여행 지역 설정과 음식 취향 설문을 완료하세요";
    } else if (!isLocationSet) {
        return "여행 지역을 설정하세요";
    } else if (!isTasteSurveyCompleted) {
        return "음식 취향 설문을 완료하세요";
    } else {
        return "모든 설정이 완료되었습니다!";
    }
}


export default function HomeScreen() {

    const [selectedButton, setSelectedButton] = useState('travel');   // 현재 선택된 버튼 상태
    const [modalVisible, setModalVisible] = useState(false);    // 알림창 활성화 상태
    const { isLocationSet, isTasteSurveyCompleted } = usePreferences();
    const [ModalMessage, setModalMessageState] = useState(setModalMessage(isLocationSet, isTasteSurveyCompleted));   // 알림창 알림문구


    // isLocationSet과 isTasteSurveyCompleted가 변경될 때마다 ModalMessage를 업데이트
    useEffect(() => {
        setModalMessageState(setModalMessage(isLocationSet, isTasteSurveyCompleted));
    }, [isLocationSet, isTasteSurveyCompleted]);



    SplashScreen.preventAutoHideAsync(); // 폰트 로드 중 스플래시 화면 유지

    const [fontsLoaded] = useFonts({
        Candal: Candal_400Regular,    // Candal 폰트 로드
    });

    if (!fontsLoaded) {
        return null;      // 폰트가 로드될 때까지 아무것도 렌더링하지 않음
    }
    SplashScreen.hideAsync();      // 폰트 로드 완료 후 스플래시 화면 숨기기



    return (
        <View style={common.MainContainer}>

            {/* 헤더이미지 */}
            <ImageBackground
                source={{uri : 'https://images.unsplash.com/photo-1504674900247-0877df9cc836'}}
                style={common.headerImage}>

                {/* 이미지 반투명 */}
                <View style={common.overlay} />

                <Text style={common.headerText1}>Course Plate</Text>
                <Text style={common.headerText2}>Find your favorite food!</Text>
            </ImageBackground>


            {/* 중간 부분 */}
            <View style={common.section}>
                <View style={common.section_top}>

                    {/* 여행 지역 버튼 */}
                    <TouchableOpacity
                        style={[
                            common.verifyButton,
                            selectedButton === 'food' && common.non_clicked,
                            { borderRadius: 30, paddingHorizontal: 30 }
                        ]}
                        onPress={() => setSelectedButton('travel')} // 버튼 클릭 시 상태 변경
                    >
                        <Text
                            style={[
                                common.verifyText,
                                {
                                    fontSize: 20,
                                    color: selectedButton === 'food' ? 'black' : 'white'
                                }
                            ]}
                        >
                            여행 지역
                        </Text>
                    </TouchableOpacity>

                    {/* 음식 취향 버튼 */}
                    <TouchableOpacity
                        style={[
                            common.verifyButton,
                            selectedButton === 'travel' && common.non_clicked,
                            { borderRadius: 30, paddingHorizontal: 30 }
                        ]}
                        onPress={() => setSelectedButton('food')} // 버튼 클릭 시 상태 변경
                    >
                        <Text
                            style={[
                                common.verifyText,
                                {
                                    fontSize: 20,
                                    color: selectedButton === 'travel' ? 'black' : 'white'
                                }
                            ]}
                        >
                            음식 취향
                        </Text>
                    </TouchableOpacity>

                </View>

                {/* travel 상태일 때와 food 상태일 때 각각 다른 내용 렌더링 */}
                {selectedButton === 'travel' ? (
                    <View style={common.section_bottom}>
                        <Text style={common.title}>지역을 설정하지 않았습니다.</Text>
                        <TouchableOpacity style={[common.verifyButton, {borderRadius: 25, paddingHorizontal: 30}]}>
                            <Text style={[common.verifyText, {fontSize: 18}]}>설정하기</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={common.section_bottom}>
                        <Text style={common.title}>취향 설문을 하지 않았습니다.</Text>
                        <TouchableOpacity style={[common.verifyButton, {borderRadius: 25, paddingHorizontal: 30}]}>
                            <Text style={[common.verifyText, {fontSize: 18}]}>설문하기</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>


            {/* 하단 부분 */}
            <View style={common.footer}>

                {/* History 버튼 */}
                <TouchableOpacity style={common.footerButton}>
                    <History size={40} color='black'></History>
                    <Text style={[common.headerText2, {color: 'black', textAlign: 'center', marginLeft: 0}]}>History</Text>
                </TouchableOpacity>



                {/* Search 버튼 */}
                <TouchableOpacity
                    style={common.footerButton}
                    onPress={() => setModalVisible(true)}
                >
                    <Search size={40} color='black'></Search>
                    <Text style={[common.headerText2, {color: 'black', textAlign: 'center', marginLeft: 0}]}>Search</Text>
                </TouchableOpacity>


                {/* 알림창 */}
                <Modal
                    animationType="fade" // 모달 애니메이션 설정
                    transparent={true}  // 모달의 배경을 투명하게 설정
                    visible={modalVisible}  // 모달의 visible 상태가 true일 때만 보이게
                    onRequestClose={() => setModalVisible(false)}  // 안드로이드에서 뒤로 가기 버튼 눌렀을 때 모달 닫기
                >
                    <View style={common.modal}>

                        <Text style={[
                            common.verifyText,
                            {fontSize: 20, lineHeight: 30, textAlign: 'center', color: 'black', padding: 25}
                        ]}>{ModalMessage}</Text>

                        <PrimaryButton
                            title="확인"
                            onPress={() => setModalVisible(false)}
                            style={{width: 100}}
                            disabled={false}
                        />
                    </View>
                </Modal>




                {/* Profile 버튼 */}
                <TouchableOpacity style={common.footerButton}>
                    <User size={40} color='black'></User>
                    <Text style={[common.headerText2, {color: 'black', textAlign: 'center', marginLeft: 0}]}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
