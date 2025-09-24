import { View, Text, StyleSheet } from "react-native"
import AddFoodButton from "./AddFoodButton"
import addCommas from "../../helpers/addCommas"

interface calorieInfoProps {
    calorieInfo: {
        daily_calories: number,
        calories_consumed: number,
    }
}

const CaloricDisplay = ({calorieInfo} : calorieInfoProps) => {
    const { daily_calories, calories_consumed } = calorieInfo

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