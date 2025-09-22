import { SafeAreaView } from "react-native-safe-area-context"
import { Appbar } from "react-native-paper"

const AppBar = () => {
    const current_time = new Date()
    const day = current_time.toLocaleDateString()

    return(
        <SafeAreaView edges={['right','left','bottom']}>
            <Appbar.Header style={{backgroundColor:"#f5f5f5ff"}}>
                <Appbar.Action icon="cog" />
                <Appbar.Content title={String(day)} />
                <Appbar.Action icon="calendar" />
            </Appbar.Header>
        </SafeAreaView>
    )
}

export default AppBar