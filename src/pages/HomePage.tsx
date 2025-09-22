import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text } from "react-native"

import CaloriesProgression from "../components/CaloriesProgression"

const HomePage = () => {
    return (
        <SafeAreaView edges={['right','left','bottom']}>
            <View>
                <Text></Text>
                <CaloriesProgression/>
            </View>
        </SafeAreaView>
    )
}

export default HomePage