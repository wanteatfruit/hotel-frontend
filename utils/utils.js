export default function handleIntroduction(roomInfo, returnIndex) {
    let intro = roomInfo.introduction
    const intro_array = intro.split(",")
    let intro_after_proc = [false, false, false]
    for (const key in intro_array) {
        if (Object.hasOwnProperty.call(intro_array, key)) {
            const element = intro_array[key];
            // console.log(element)
            const yesorno = element.split("|")
            yesorno[1] == '有' ? intro_after_proc[key] = true : intro_after_proc[key] = false
        }
    }
    // console.log(intro_after_proc)

    return intro_after_proc[returnIndex]
}
