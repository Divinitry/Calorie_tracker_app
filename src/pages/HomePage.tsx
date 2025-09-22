import { SafeAreaView } from "react-native-safe-area-context"
import { View } from "react-native"

import CaloriesProgression from "../components/CaloriesProgression"
import Macros from "../components/Macros"

const HomePage = () => {
    return (
        <SafeAreaView edges={['right','left','bottom']}>
            <View>
                <CaloriesProgression/>
                <Macros/>
            </View>
        </SafeAreaView>
    )
}

export default HomePage