import { Text, StyleSheet } from "react-native"
import { Appbar } from "react-native-paper"
import StepBar from "./StepBar"

const StepProgress = () => {
    return(
        <Appbar.Header style={styles.header} statusBarHeight={10}>
            <Appbar.BackAction onPress={() => {}} />
            <StepBar/>
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "transparent",
        elevation: 0,
        shadowOpacity: 0,
    }
})

export default StepProgress