import { View, StyleSheet, Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { AntDesign } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const NavBar = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['right','left','bottom']}>
      <View style={styles.container}>
        <AntDesign name="home" size={28} color="gray" />
        <AntDesign name="plus" size={28} color="gray" />
        <AntDesign name="user" size={28} color="gray" />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: 'black',
    borderRadius: 25,
    paddingVertical: 12,
    marginBottom: 8,
  },
});

export default NavBar;
