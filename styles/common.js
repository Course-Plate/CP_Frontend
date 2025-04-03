// styles/common.js

import {Dimensions, StyleSheet} from 'react-native';

const { width, height } = Dimensions.get('window');     // 화면 크기 가져오기

export default StyleSheet.create({
    startContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    MainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        position: 'absolute',
        top: height * 0.35,
        left: width * 0.1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF8E1',
        width: width * 0.8,
        height: height * 0.4,
        borderRadius: 20,
        elevation: 2
    },
    logo: {
        width: 350,
        height: 350,
        resizeMode: 'contain',
        marginBottom: 40,
    },
    headerImage: {
        width: '100%',
        flex: 0.3,
        justifyContent: 'flex-end',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject, // 이미지 위에 전체 덮기
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // 검정색 반투명
    },
    headerText1: {
        fontSize: 40,
        fontFamily: 'Candal',
        color: '#fff',
        marginLeft: 10,
    },
    headerText2: {
        fontSize: 16,
        fontFamily: 'Candal',
        color: '#fff',
        marginLeft: 10,
        marginBottom: 10,
    },
    section: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#C3C3C3',
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    section_top: {
        flex: 0.1,
        width: '100%',
        paddingBottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#C3C3C3',
    },
    section_bottom: {
        flex: 0.8,
        width: '100%',
        paddingTop: 25,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#C3C3C3',
    },
    footer: {
        flex: 0.2,
        flexDirection: 'row',
        width: '100%',
        height: 50,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    footerButton: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    view: {
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 30,
        backgroundColor: '#fff',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    button: {
        width: '100%',
        backgroundColor: '#F57C00',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        elevation: 2,
        marginBottom: 12,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    linkText: {
        color: '#F57C00',
        fontSize: 14,
        fontWeight: '600',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    flex: {
        flex: 1,
    },
    noMargin: {
        marginBottom: 0,
    },
    verifyButton: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F57C00',
        borderRadius: 8,
        paddingHorizontal: 16,
        minWidth: 80,
    },
    verifyText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    non_clicked: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#C3C3C3',
    }
});
