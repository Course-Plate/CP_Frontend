import { Stack, usePathname, useRouter } from 'expo-router';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext'; // ✅ useTheme 추가

function LayoutInner() {
    const pathname = usePathname();
    const router = useRouter();
    const { isDarkMode } = useTheme(); // ✅ 다크모드 상태 가져오기

    const hideHeaderLogo = pathname === '/login' || pathname === '/signup';
    const headerBgColor = isDarkMode ? '#1e1e1e' : '#fff';

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                headerTitle: () =>
                    hideHeaderLogo ? null : (
                        <TouchableOpacity onPress={() => router.push('/home')}>
                            <Text style={styles.logo}>
                                <Text style={styles.course}>Course</Text>
                                <Text style={styles.plate}>Plate</Text>
                            </Text>
                        </TouchableOpacity>
                    ),
                headerTitleAlign: 'left',
                headerStyle: {
                    backgroundColor: headerBgColor, // ✅ 다크모드 반영
                },
                contentStyle: {
                    backgroundColor: headerBgColor, // ✅ 전환 중 배경색 적용
                },
                animation: 'fade', // ✨ 자연스러운 전환
            }}
        />
    );
}

export default function Layout() {
    return (
        <ThemeProvider>
            <LayoutInner />
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    logo: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    course: {
        color: '#000',
    },
    plate: {
        color: '#F57C00',
    },
});
