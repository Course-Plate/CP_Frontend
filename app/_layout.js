// app/_layout.js
import { Stack, usePathname, useRouter } from 'expo-router';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

function LayoutInner() {
    const pathname = usePathname();
    const router = useRouter();
    const { isDarkMode } = useTheme();

    const hideHeaderLogo = pathname === '/login' || pathname === '/signup';
    const headerBgColor = isDarkMode ? '#1e1e1e' : '#fff';
    const logoColor = isDarkMode ? '#fff' : '#000';

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                headerTitle: () =>
                    hideHeaderLogo ? null : (
                        <TouchableOpacity onPress={() => router.push('/home')}>
                            <Text style={styles.logo}>
                                <Text style={[styles.course, { color: logoColor }]}>Course</Text>
                                <Text style={styles.plate}>Plate</Text>
                            </Text>
                        </TouchableOpacity>
                    ),
                headerTitleAlign: 'left',
                headerStyle: {
                    backgroundColor: headerBgColor,
                },
                contentStyle: {
                    backgroundColor: headerBgColor,
                },
                animation: 'fade',
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
        // 동적으로 색상 지정
    },
    plate: {
        color: '#F57C00',
    },
});
