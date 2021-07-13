const getYieldForPlant = (object) => {
    let soilClayFactor = 100;
    let sunFactor = 100;
    let windFactor = 100;
    if (typeof object.crop != "undefined") {
        let o = object.crop.factors;
        if (typeof o.sun !== 'undefined') {
            for (var prop in o.sun) {
                if (prop == object.sun) {
                    sunFactor = o.sun[prop];
                }
            }
        };
        if (typeof o.wind !== 'undefined') {
            for (var prop in o.wind) {
                if (prop == object.wind) {
                    windFactor = o.wind[prop];
                }
            }
        };
        if (typeof o.soilClay !== 'undefined')
            for (var prop in o.soilClay) {
                if (prop == object.soilClay) {
                    soilClayFactor = o.soilClay[prop];
                }
            }
        return (object.crop.yield * sunFactor * windFactor * soilClayFactor) / 1000000;
    }
    else {
        return object.yield
    }
};

const getYieldForCrop = (object) => {
    let soilClayFactor = 100;
    let sunFactor = 100;
    let windFactor = 100;
    if (typeof object.crop != "undefined") {
        let o = object.crop.factors;
        if (typeof o !== 'undefined') {
            for (var prop in o.sun) {
                if (prop == object.sun) {
                    sunFactor = o.sun[prop];
                }
            }
        };
        if (typeof o !== 'undefined') {
            for (var prop in o.wind) {
                if (prop == object.wind) {
                    windFactor = o.wind[prop];
                }
            }
        };
        if (typeof o !== 'undefined')
            for (var prop in o.soilClay) {
                if (prop == object.soilClay) {
                    soilClayFactor = o.soilClay[prop];
                }
            }
        return ((object.crop.yield * object.numCrops) * sunFactor * windFactor * soilClayFactor) / 1000000;
    }
    else {
        return object.crop.yield * object.numCrops;
    }
};


const getTotalYield = (object) => {
    let totalYield = 0;
    for (i = 0; i < object.crops.length; i++) {
        totalYield = totalYield + (object.crops[i].crop.yield * object.crops[i].numCrops);
    }
    return totalYield;
};

const getCostsForCrop = (object) => (object.crop.costs * object.numCrops);

const getRevenueForCrop = (object) => (getYieldForCrop(object) * object.crop.salePrice);

const getProfitForCrop = (object) => {
    return (getYieldForCrop(object) * object.crop.salePrice) - (getCostsForCrop(object));
};

const getTotalProfit = (object) => {
    let totalProfit = 0;
    for (i = 0; i < object.length; i++) {
        totalProfit = totalProfit + getProfitForCrop(object[i]);
    }
    return totalProfit;
};

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
};