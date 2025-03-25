import { Stack, usePathname, useRouter } from 'expo-router';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Layout() {
    const pathname = usePathname();
    const router = useRouter();

    const hideHeaderLogo = pathname === '/login' || pathname === '/signup';

    return (
        <Stack
            screenOptions={{
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
                    backgroundColor: '#fff',
                },
            }}
        />
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
