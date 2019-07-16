const cropOnlyTime = (stringDateTime: string) => {
    if(stringDateTime.length > 10) {
        let dateInUTC = new Date(stringDateTime);
        dateInUTC.setHours(dateInUTC.getHours() + 2);
        const time = dateInUTC.toLocaleTimeString('en-GB', {hour12: false });
        return time.substring(0, 9);
    }
    return stringDateTime;
};

export default cropOnlyTime;
