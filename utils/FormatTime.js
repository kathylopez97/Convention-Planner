function FormatTime (time) {
    let formattedTime = time.split(":");

    if (parseInt(formattedTime[0]) === 0) {
        return `${parseInt(formattedTime[0] + 12)}:${formattedTime[1]}AM`
    } else if (parseInt(formattedTime[0]) < 12) {
        return `${parseInt(formattedTime[0])}:${formattedTime[1]}AM`
    } else if (parseInt(formattedTime[0]) === 12) {
        return `${parseInt(formattedTime[0])}:${formattedTime[1]}PM`
    } else {
        return `${parseInt(formattedTime[0]) - 12}:${formattedTime[1]}PM`
    }
}

module.exports = FormatTime;