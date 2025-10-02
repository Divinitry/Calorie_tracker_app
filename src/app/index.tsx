import { SafeAreaView } from "react-native-safe-area-context"
import NavBar from "../components/home_page/NavBar.tsx";
import HomeDashboard from "../components/home_page/HomeDashboard.tsx"
import AppBar from '../components/home_page/AppBar.tsx';
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