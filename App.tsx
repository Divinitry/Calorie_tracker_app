import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import NavBar from "./src/components/NavBar";
import HomePage from './src/pages/HomePage';
import AppBar from './src/components/AppBar';
import { AppColors } from './src/theme/AppColors';

export default function App() {
  const colors = AppColors
  return (
    <PaperProvider>
      <SafeAreaProvider >
        <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundOffWhite}} edges={['right','left','bottom']}>
          <AppBar />
          <HomePage />
          <NavBar />
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}