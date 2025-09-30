import * as SecureStore from 'expo-secure-store'

export const saveKey = async (key: any, value: any) => {
    await SecureStore.setItemAsync(key, value)
}