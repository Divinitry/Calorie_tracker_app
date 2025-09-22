import { SafeAreaView } from "react-native-safe-area-context"
import { Text, StyleSheet } from "react-native"
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Card } from 'react-native-paper'
import { AppColors } from "../theme/AppColors"

const CaloriesProgression = () => {
  const colors = AppColors

  const daily_calories: number = 2000
  const calories_consumed: number = 700
  const percentage = (calories_consumed / daily_calories) * 100

  return (
    <SafeAreaView edges={['right','left','bottom']}>
      <Card mode="contained" style={[styles.card, {backgroundColor: colors.lime_background}]}>
        <Card.Content style={styles.content}>
          <Text style={styles.calories}>Daily Calories</Text>
          <AnimatedCircularProgress
            size={140}
            width={12}
            backgroundWidth={5}
            fill={percentage}
            tintColor="#6bfc9cff"
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#ffffffff"
            rotation={270}
            lineCap="round"
          >
            {(fill: number) => (
              <Text style={styles.progressText}>
                {`${Math.round(calories_consumed)}`} / 2000
              </Text>
            )}
          </AnimatedCircularProgress>
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
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  calories: {
    textAlign: "center",
    fontSize: 22,
    color: "#000000ff",
    marginBottom: 15,
  },
  progressText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000ff",
    textAlign: "center",
  },
})

export default CaloriesProgression
