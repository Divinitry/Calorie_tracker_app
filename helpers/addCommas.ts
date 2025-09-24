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

export default addCommas