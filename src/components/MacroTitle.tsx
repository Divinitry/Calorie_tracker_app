import { View, Text, StyleSheet } from "react-native"

const MacroTitle = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Macro Breakdown</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "300",
    color: "#212121",
  },
})

export default MacroTitle