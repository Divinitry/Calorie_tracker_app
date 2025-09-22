import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import NavBar from "./src/components/NavBar";
import HomePage from './src/pages/HomePage';
import AppBar from './src/components/AppBar';

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider >
        <SafeAreaView style={{flex: 1, backgroundColor: "#f9fffa"}} edges={['right','left','bottom']}>
          <AppBar />
          <HomePage />
          <NavBar />
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}