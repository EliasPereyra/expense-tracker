export default (date) => {
    const currentDate = new Date(date);
    let month =`${currentDate.getMonth() + 1}`
    let day = `${currentDate.getDate()}`
    const year = currentDate.getFullYear();

    if (month.length < 2) { month = `0${month}`}
    if (day.lenght < 2) { day = `0${day}`}

    return [month,day,year].join('-')
}