import { View, StyleSheet, Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { AntDesign } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const NavBar = () => {
  return (
      <View style={styles.container}>
        <AntDesign name="home" size={28} color="gray" />
        <AntDesign name="plus" size={28} color="gray" />
        <AntDesign name="user" size={28} color="gray" />
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: SCREEN_WIDTH * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 25,
    paddingVertical: 12,
    marginBottom: 25,
    alignSelf: 'center',
  },
});

export default NavBar;
