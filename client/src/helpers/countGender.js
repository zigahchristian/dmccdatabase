const countGender = (obj) => {
    return obj.reduce((acc, curVal) => {
        if (curVal.gender === 'Male') {
            acc.male++;
        }
        else {
            acc.female++;
        }
        return acc;
    }, {male: 0, female: 0});
}

export default countGender