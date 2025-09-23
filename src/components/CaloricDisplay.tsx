import { View, Text, StyleSheet } from "react-native"
import AddFoodButton from "./AddFoodButton"

interface calorieInfoProps {
    calorieInfo: {
        daily_calories: number,
        calories_consumed: number,
    }
}

const CaloricDisplay = ({calorieInfo} : calorieInfoProps) => {
    const { daily_calories, calories_consumed } = calorieInfo

    const addCommas = (num: number | string): string => {
        const str = num.toString()
        let result = ''
        let count = 0

        for (let i = str.length - 1; i >= 0; i--) {
            result = str[i] + result
            count++
            if (count % 3 === 0 && i !== 0) {
                result = ',' + result
            }
        }

        return result
    }

    return(
        <View style={styles.container}>
            <Text style={styles.calories}><Text style={styles.eaten}>{addCommas(calories_consumed.toString())}</Text><Text style={styles.calsLeft}> / {addCommas(daily_calories)} kcal</Text></Text>
            <AddFoodButton/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems:"center",
        marginVertical: 15,
    },
    calories: {
        marginVertical: 10,
    },
    eaten: {
        fontWeight: 500,
        fontSize: 40,
    },
    calsLeft: {
        fontWeight: 200,
        fontSize: 18,
    }
})

export default CaloricDisplay