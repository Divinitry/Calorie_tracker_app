import { Card, ProgressBar } from "react-native-paper"
import { View, Text, StyleSheet } from "react-native"
import { AppColors } from "../../theme/AppColors"

interface macroInfoProps {
    macro: {
        name: string,
        currentAmount: number,
        goalAmount: number,
        color: string,
        backgroundColor: string,
        progressAmount: number,
    }
}

const MacroBox = (macroInfo: macroInfoProps) => {
    const colors = AppColors
    const { macro } = macroInfo

    function hexToRGBA(hex: string, alpha: number) {
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }

    return(
        <Card mode="outlined" style={[styles.card, { backgroundColor: macro.backgroundColor, borderColor: hexToRGBA(macro.color, 0.4)}]}>
          <Card.Content>
            <View style={styles.titleRow}>
              <View style={[styles.circle, { backgroundColor: macro.color }]} />
              <Text style={[styles.macroTitle, { color: macro.color }]}>{macro.name}</Text>
            </View>
            <Text style={[styles.macroInfo, {color: macro.color}]}>{macro.currentAmount}<Text style={[styles.grams, {color: macro.color}]}>g</Text></Text>
            <Text style={{color: macro.color}}>{macro.goalAmount}</Text>
            <ProgressBar progress={macro.progressAmount} color={macro.color} style={{marginTop: 10, borderRadius: 20, backgroundColor: "white", height: 8}}/>
          </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 16,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  macroTitle: {
    fontWeight: "800",
    fontSize: 17,
  },
  macroInfo: {
    fontWeight: "600",
    fontSize: 30,
    marginVertical: 5
  },
  grams: {
    fontSize: 15,
  }
})

export default MacroBox