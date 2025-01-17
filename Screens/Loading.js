import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function LoadingScreen(){
    const styles = StyleSheet.create({
        container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        },
    });
    return (
        <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        </View>
    );
};
  