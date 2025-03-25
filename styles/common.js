// styles/common.js

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 350,
        height: 350,
        resizeMode: 'contain',
        marginBottom: 40,
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
});
