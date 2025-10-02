import { View, Text, StyleSheet } from "react-native"
import { Card } from "react-native-paper"
import { AppColors } from "../../theme/AppColors"
import { FontAwesome5 } from "@expo/vector-icons"
import addCommas from "../../../helpers/addCommas"
import { ProgressBar } from "react-native-paper"

const StepsToday = () => {
  const colors = AppColors
  const stepGoal: number = 10000
  const currentSteps: number = 7891
  const percentage: number = currentSteps / stepGoal

  return (
    <Card mode="elevated" style={[styles.card, { backgroundColor: colors.cardBackgroundWhite, shadowOpacity: 0 }]}>
      <Card.Content style={styles.content}>
        <View style={{ marginBottom: 16 }}>
          <Text style={styles.title}>Steps Today</Text>
        </View>

        <View style={styles.row}>
          <View style={[styles.half, { borderRadius: 12 }]}>
            <Text style={styles.stepGoal}>
                <Text style={styles.currentSteps}>
                    {addCommas(currentSteps)}
                </Text>
                / {addCommas(stepGoal)}
            </Text>
            <Text style={{color: colors.lightGreen, fontWeight: 600, fontSize: 15}}>{percentage * 100}% to goal</Text>
          </View>
          <View style={[styles.half, { borderRadius: 12, alignItems: "flex-end", paddingRight: 15}]}>
            <Text><FontAwesome5 name="walking" size={50}/></Text>
          </View>
        </View>

        <View style={[styles.fullWidth, { borderRadius: 12, marginTop: 12 }]}>
          <ProgressBar progress={percentage} color={colors.lightGreen} style={{marginTop: 10, borderRadius: 20, backgroundColor: "#f0f0f0ff", height: 15}}/>
        </View>
      </Card.Content>
    </Card>
  )
}

const colors = AppColors

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    margin: 16,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 25,
    fontWeight: "600",
    color: "#000000ff",
    textAlign: 'left',
  },
  currentSteps: {
    fontSize: 40,
    color: colors.headerGreen,
    fontWeight: 700,
  },
  stepGoal: {
    color: "#8d8d8dff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  half: {
    flex: 1,
    marginHorizontal: 2,
  },
  fullWidth: {
    width: "100%",
  },
})

export default StepsToday
