import { SafeAreaView } from "react-native-safe-area-context"
import CaloriesProgression from "./CaloriesProgression.tsx"
import Macros from "./Macros.tsx"
import StepsToday from "./StepsToday.tsx"

const HomeDashboard = () => {
    return (
        <SafeAreaView edges={['right','left','bottom']} style={{paddingBottom: 20}}>
            <CaloriesProgression/>
            <Macros/>
            <StepsToday/>
        </SafeAreaView>
    )
}

export default HomeDashboard