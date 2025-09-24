import { SafeAreaView } from "react-native-safe-area-context"
import { Text, StyleSheet, View } from "react-native"
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Card } from 'react-native-paper'
import { AppColors } from "../theme/AppColors"
import { FontAwesome5 } from "@expo/vector-icons"
import CaloricDisplay from "./CaloricDisplay"

const CaloriesProgression = () => {
  const colors = AppColors
  const daily_calories: number = 2000
  const calories_consumed: number = 1200
  const percentage = (calories_consumed / daily_calories) * 100
  const calorieInfo = { daily_calories: daily_calories, calories_consumed: calories_consumed }

  const weightLbs: number = 160
  const weightKg: number = Math.round(weightLbs * 0.45359237)

  return (
    <SafeAreaView edges={['right', 'left']}>
      <Card mode="elevated" style={[styles.card, { backgroundColor: colors.cardBackgroundWhite, shadowOpacity: 0 }]}>
        <Card.Content style={styles.content}>
          <View style={styles.row}>

            <View style={[styles.column, { alignItems: 'flex-start', marginLeft: 15 }]}>
              <Text style={styles.calories}>Daily Calories</Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                <FontAwesome5 name="balance-scale-right" size={15} color={colors.gold} />
                <Text style={{ marginLeft: 6 }}>
                  {weightKg} kg <Text style={{ marginHorizontal: 4 }}>•</Text> {weightLbs} lbs
                </Text>
              </View>
            </View>

            <View style={[styles.column, { alignItems: 'flex-end' }]}>
              <AnimatedCircularProgress
                size={90}
                width={8}
                backgroundWidth={8}
                rotation={0}
                fill={percentage}
                tintColor={colors.progressBar}
                backgroundColor="#f7f7f7ff"
                lineCap="round"
                style={{ marginRight: 10 }}
              >
                {(fill: number) => (
                  <Text style={styles.progressText}>{`${percentage.toFixed(0)}%`}</Text>
                )}
              </AnimatedCircularProgress>
            </View>
          </View>
          <CaloricDisplay calorieInfo={calorieInfo} />
        </Card.Content>
      </Card>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    margin: 16,
  },
  content: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    justifyContent: 'center',
  },
  calories: {
    fontSize: 25,
    fontWeight: "600",
    color: "#000000ff",
    textAlign: 'left',
    marginBottom: 5,
  },
  number: {
    fontSize: 18,
    color: "#000000ff",
    textAlign: 'left',
  },
  progressText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000ff",
    textAlign: "center",
  },
})

export default CaloriesProgression
