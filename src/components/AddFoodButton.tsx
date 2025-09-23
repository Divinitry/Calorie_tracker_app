import { View } from "react-native"
import { Button } from "react-native-paper"
import { AppColors } from "../theme/AppColors"
import { FontAwesome5 } from "@expo/vector-icons"

const AddFoodButton = () => {
    const colors = AppColors
    return(
        <View>
            <Button mode="contained" onPress={() => console.log('Pressed')} buttonColor={colors.lightGreen} style={{borderRadius: 15, alignSelf: 'flex-start', paddingHorizontal: 70, paddingVertical: 4, marginTop: 8}} labelStyle={{fontSize: 18, fontWeight: 600}}>
                <FontAwesome5 name="plus" size={16} /> Add food
            </Button>
        </View>
    )
}

export default AddFoodButton