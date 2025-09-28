import { SafeAreaView } from "react-native-safe-area-context"
import NavBar from "../components/NavBar.tsx"
import HomeDashboard from "../components/HomeDashboard.tsx"
import AppBar from '../components/AppBar.tsx';
import { AppColors } from "../theme/AppColors.ts";
import { ScrollView } from 'react-native';

const HomePage = () => {
    const colors = AppColors
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundOffWhite}} edges={['right','left','bottom']}>
          <AppBar/>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <HomeDashboard/>
          </ScrollView>
          <NavBar/>
        </SafeAreaView>
    )
}

export default HomePage