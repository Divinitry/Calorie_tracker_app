import { View, StyleSheet } from "react-native"
import { Card, Text } from "react-native-paper"
import MacroTitle from "./MacroTitle"


const Macros = () => {
  return (
    <View>
      <MacroTitle/>
      <View style={styles.container}>
        <Card mode="contained" style={[styles.card, { backgroundColor: "#c3e1faff" }]}>
          <Card.Content>
            <Text style={styles.macroTitle} variant="titleMedium">Protein</Text>
            <Text style={styles.macroInfo} variant="headlineSmall">120g</Text>
          </Card.Content>
        </Card>

        <Card mode="contained" style={[styles.card, { backgroundColor: "#fcddaeff" }]}>
          <Card.Content>
            <Text style={styles.macroTitle} variant="titleMedium">Carbs</Text>
            <Text style={styles.macroInfo} variant="headlineSmall">250g</Text>
          </Card.Content>
        </Card>

        <Card mode="contained" style={[styles.card, { backgroundColor: "#fcc9daff" }]}>
          <Card.Content>
            <Text style={styles.macroTitle} variant="titleMedium">Fats</Text>
            <Text style={styles.macroInfo} variant="headlineSmall">70g</Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
  card: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 16,
  },
  macroTitle: {
    fontWeight: "800",
    textAlign: "center"
  },
  macroInfo: {
    fontWeight: "300",
    textAlign: "center"
  }
})

export default Macros
