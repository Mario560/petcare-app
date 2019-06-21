const cropOnlyTime = (stringDateTime: string) => {
    const time = stringDateTime.substring(11, 19);
    return time;
};

export default cropOnlyTime;