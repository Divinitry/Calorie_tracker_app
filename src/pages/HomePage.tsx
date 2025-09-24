import { SafeAreaView } from "react-native-safe-area-context"

import CaloriesProgression from "../components/CaloriesProgression"
import Macros from "../components/Macros"
import StepsToday from "../components/StepsToday"

const HomePage = () => {
    return (
        <SafeAreaView edges={['right','left','bottom']} style={{paddingBottom: 20}}>
            <CaloriesProgression/>
            <Macros/>
            <StepsToday/>
        </SafeAreaView>
    )
}

export default HomePage