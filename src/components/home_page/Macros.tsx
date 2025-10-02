import { View, StyleSheet } from "react-native"
import { AppColors } from "../../theme/AppColors"

import MacroBox from "./MacroBox"

const Macros = () => {
  const colors = AppColors

  const macros = [
    {
      name: "Protein",
      currentAmount: 120,
      goalAmount: 200,
      color: colors.protein,
      backgroundColor : colors.proteinBackground,
      progressAmount: 120 / 200,
    },
    {
      name: "Carbs",
      currentAmount: 200,
      goalAmount: 250,
      color: colors.carbs,
      backgroundColor : colors.carbsBackground,
      progressAmount: 200 / 250,
    },
    {
      name: "Fats",
      currentAmount: 120,
      goalAmount: 160,
      color: colors.fats,
      backgroundColor : colors.fatsBackground,
      progressAmount: 120 / 160,
    }
  ]

  return (
    <View>
      <View style={styles.container}>
        {macros.map((macro, index) => (
          <MacroBox key={index} macro={macro}/>
        )
        )}
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
})

export default Macros