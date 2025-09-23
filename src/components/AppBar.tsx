import { SafeAreaView } from "react-native-safe-area-context"
import { Appbar } from "react-native-paper"
import { AppColors } from "../theme/AppColors"
import { FontAwesome5 } from "@expo/vector-icons"
import { View, Text } from "react-native"

const AppBar = () => {
  const colors = AppColors
  const current_time = new Date()
  const day = current_time.toLocaleDateString()

  return (
    <SafeAreaView edges={["right", "left"]}>
      <Appbar.Header
        style={{
          backgroundColor: colors.headerGreen,
          borderBottomRightRadius: 25,
          borderBottomLeftRadius: 25,
          overflow: "hidden",
          height: 100,
          marginBottom: 10,
        }}
      >
        <View style={{ flex: 1, marginLeft: 15}}>
            <Text style={{ color: colors.whiteText, fontSize: 25, fontWeight: "900", marginBottom: 5 }}>
            Good Morning! 👋
            </Text>
            <Text style={{ color: colors.whiteText, fontSize: 16, marginBottom: 4 }}>
            Let’s track your nutrition today
            </Text>
            <Text style={{ color: colors.whiteText, fontSize: 14, opacity: 0.8 }}>
                {day}
            </Text>
        </View>

        <Appbar.Action
          icon={() => <FontAwesome5 name="running" size={22} color="#FFFFFF"/>}
          onPress={() => {}}
          style={{shadowColor: "#000", shadowOffset: { width: 2, height: 2 }, shadowOpacity: .5, shadowRadius: 4, elevation: 1}}
        />
      </Appbar.Header>
    </SafeAreaView>
  )
}

export default AppBar
