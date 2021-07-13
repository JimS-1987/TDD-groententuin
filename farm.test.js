const { getYieldForPlant, getYieldForCrop, getTotalYield, getCostsForCrop, getRevenueForCrop, getProfitForCrop, getTotalProfit } = require("./farm");
//getYieldForPlant
describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
    };
    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn", yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23);
    });
    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});


//getCostsForCrop.
describe("getCostsForCrop", () => {
    test("Get costs for crop, simple", () => {
        const corn = {
            name: "corn",
            costs: 1,
        };
        const input = {
            crop: corn,
            numCrops: 30,
        };
        expect(getCostsForCrop(input)).toBe(30);
    });
    test("Get costs for crop, simple", () => {
        const tomatoes = {
            name: "tomatoes",
            costs: 1.5,
        };
        const input = {
            crop: tomatoes,
            numCrops: 30,
        };
        expect(getCostsForCrop(input)).toBe(45);
    });
    test("Get costs for crop, simple", () => {
        const avocados = {
            name: "avocados",
            costs: 2,
        };
        const input = {
            crop: avocados,
            numCrops: 20,
        };
        expect(getCostsForCrop(input)).toBe(40);
    });
});

// getRevenueForCrop
describe("getRevenueForCrop", () => {
    test("Get revenue for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 4,
            salePrice: 2
        };
        const input = {
            crop: corn,
            numCrops: 24,
        };
        expect(getRevenueForCrop(input)).toBe(192);
    });
    test("Get revenue for crop, simple with not.toBe", () => {
        const apples = {
            name: "apples",
            yield: 100,
            salePrice: 2
        };
        const input = { crop: apples, numCrops: 100 };
        expect(getRevenueForCrop(input)).not.toBe(2000);
    });
    test("Get revenue for crop, simple", () => {
        const tomatoes = {
            name: "tomatoes",
            yield: 15,
            salePrice: 1
        };
        const input = { crop: tomatoes, numCrops: 75 };
        expect(getRevenueForCrop(input)).toBe(1125);
    });
});

// getProfitForCrop
describe("getProfitForCrop", () => {
    test("Get profit for crop, simple", () => {
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            salePrice: 5,
            costs: 2
        };
        const input = {
            crop: pumpkin,
            numCrops: 33,
        };
        expect(getProfitForCrop(input)).toBe(594);
    });
    test("Get profit for crop, simple with not.toBe", () => {
        const apples = {
            name: "apples",
            yield: 100,
            salePrice: 2,
            costs: 50
        };
        const input = { crop: apples, numCrops: 20 };
        expect(getProfitForCrop(input)).not.toBe(300);
    });
    test("Get profit for crop, simple", () => {
        const tomatoes = {
            name: "tomatoes",
            yield: 4,
            salePrice: 3,
            costs: 1
        };
        const input = { crop: tomatoes, numCrops: 50 };
        expect(getProfitForCrop(input)).toBe(550);
    });
});

// getTotalProfit
describe("getTotalProfit", () => {
    test("Calculate total profit with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 5,
            salePrice: 3,
            costs: 1
        };
        const apples = {
            name: "apples",
            yield: 150,
            salePrice: 2,
            costs: 50
        };
        const tomatoes = {
            name: "tomatoes",
            yield: 7,
            salePrice: 4,
            costs: 1
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 17,
            salePrice: 3,
            costs: 2
        };
        const crops = [
            { crop: corn, numCrops: 100 },
            { crop: apples, numCrops: 80 },
            { crop: tomatoes, numCrops: 100 },
            { crop: pumpkin, numCrops: 5 },
        ];
        expect(getTotalProfit(crops)).toBe(24345);
    });
    test("Calculate total profit with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 8,
            salePrice: 3,
            costs: 4
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalProfit(crops)).toBe(0);
    });
    test("Calculate total profit with a string", () => {
        const pumpkin = {
            name: "pumpkin",
            yield: 13,
            salePrice: 5,
            costs: 3
        };
        const crops = [{ crop: pumpkin, numCrops: 10, }];
        expect(getTotalProfit(crops)).toStrictEqual(620);
    });
});

// getYieldForPlant.
describe("getYieldForPlantWithFactors", () => {
    test("Get yield for plant with an environment factor", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factors: {
                sun: {
                    low: 80,
                    medium: 100,
                    high: 50,
                },
            },
        };
        const environmentFactors = {
            crop: corn,
            sun: "low"
        };
        expect(getYieldForPlant(environmentFactors)).toBe(24);
    });
    test("Get yield for plant with an environment factor", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factors: {
                sun: {
                    low: 20,
                    medium: 100,
                    high: 50,
                },
            },
        };
        const environmentFactors = {
            crop: corn,
            sun: "medium",
        };
        expect(getYieldForPlant(environmentFactors)).toBe(30);
    });
    test("Get yield for plant with an environment factor", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factors: {
                sun: {
                    low: 20,
                    medium: 100,
                    high: 150,
                },
            },
        };
        const environmentFactors = {
            crop: corn,
            sun: "high",
        };
        expect(getYieldForPlant(environmentFactors)).toBe(45);
    });
});

//getYieldForPlant.
describe("getYieldForPlantWithFactors", () => {
    test("Get yield for plant with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factors: {
                sun: {
                    low: 80,
                    medium: 100,
                    high: 50,
                },
                wind: {
                    low: 100,
                    medium: 70,
                    high: 40,
                },
            },
        };
        const environmentFactors = {
            crop: corn,
            sun: "low",
            wind: "low",

        };
        expect(getYieldForPlant(environmentFactors)).toBe(24);
    });
    test("Get yield for plant with environment factors", () => {
        const avocados = {
            name: "avocados",
            yield: 50,
            factors: {
                sun: {
                    low: 80,
                    medium: 100,
                    high: 50,
                },
                wind: {
                    low: 100,
                    medium: 70,
                    high: 40,
                },
                soilClay: {
                    low: 110,
                    medium: 70,
                    high: 30,
                },
            },
        };
        const environmentFactors = {
            crop: avocados,
            sun: "low",
            wind: "low",
            soilClay: "low"
        };
        expect(getYieldForPlant(environmentFactors)).toBe(44);
    });
});

//getYieldForCrop.
describe("getYieldForCropWithEnvironmentFactors", () => {
    test("Get yield for crop, with environmentfactors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factors: {
                sun: {
                    low: 80,
                    medium: 100,
                    high: 150,
                },
                wind: {
                    low: 100,
                    medium: 70,
                    high: 40,
                },
                soilClay: {
                    low: 110,
                    medium: 70,
                    high: 30,
                }
            }
        }
        const input = {
            crop: corn,
            numCrops: 30,
            sun: "high",
            wind: "medium",
            soilClay: "low"
        }
        expect(getYieldForCrop(input)).toBe(103.95);
    })
    test("Get yield for crop, with environmentfactors", () => {
        const pumpkin = {
            name: "pumpkin",
            yield: 5,
            factors: {
                wind: {
                    low: 110,
                    medium: 70,
                    high: 40,
                },
                soilClay: {
                    low: 100,
                    medium: 70,
                    high: 30,
                }
            }
        }
        const input = {
            crop: pumpkin,
            numCrops: 25,
            wind: "medium",
            soilClay: "high"
        }
        expect(getYieldForCrop(input)).toBe(26.25);
    })
});

//getProfitForCrop.
describe("getProfitForCropWithEnvironmentFactors", () => {
    test("Get profit for crop, with environmentfactors", () => {
        const pumpkin = {
            name: "pumpkin",
            yield: 6,
            salePrice: 4,
            costs: 2,
            factors: {
                sun: {
                    low: 80,
                    medium: 110,
                    high: 50,
                },
                wind: {
                    low: 100,
                    medium: 70,
                    high: 40,
                },
            }
        };
        const environmentFactors = {
            crop: pumpkin,
            numCrops: 33,
            sun: "medium",
            wind: "low"
        };
        expect(getProfitForCrop(environmentFactors)).toBe(805.2);
    });
    test("Get profit for crop, with environmentfactors", () => {
        const apples = {
            name: "apples",
            yield: 110,
            salePrice: 2,
            costs: 1,
            factors: {
                sun: {
                    low: 80,
                    medium: 10,
                    high: 50,
                },
                wind: {
                    low: 100,
                    medium: 70,
                    high: 40,
                },
                soilClay: {
                    low: 100,
                    medium: 70,
                    high: 10,
                }
            }
        };
        const environmentFactors = {
            crop: apples,
            numCrops: 100,
            sun: "medium",
            wind: "low",
            soilClay: "high"
        };
        expect(getProfitForCrop(environmentFactors)).toBe(120);
    });
});


// getTotalProfit.
describe("getTotalProfitForCropWithEnvironmentFactors", () => {
    test("Get Total profit for crop, with environmentfactors", () => {
        const pumpkin = {
            name: "pumpkin",
            yield: 25,
            salePrice: 7,
            costs: 2,
            factors: {
                sun: {
                    low: 80,
                    medium: 110,
                    high: 50,
                },
                wind: {
                    low: 100,
                    medium: 70,
                    high: 40,
                },
            }
        };
        const apples = {
            name: "apples",
            yield: 100,
            salePrice: 2,
            costs: 1,
            factors: {
                sun: {
                    low: 80,
                    medium: 110,
                    high: 150,
                },
                wind: {
                    low: 100,
                    medium: 70,
                    high: 40,
                }
            }
        };
        const environmentFactors = [{
            crop: pumpkin,
            numCrops: 40,
            sun: "medium",
            wind: "low"
        },
        {
            crop: apples,
            numCrops: 32,
            sun: "high",
            wind: "low"
        }
        ];
        expect(getTotalProfit(environmentFactors)).toBe(17188);
    });
    test("Get Total profit for crop, with environmentfactors", () => {
        const corn = {
            name: "corn",
            yield: 25,
            salePrice: 7,
            costs: 2,
            factors: {
                sun: {
                    low: 80,
                    medium: 110,
                    high: 50,
                },
                wind: {
                    low: 100,
                    medium: 70,
                    high: 40,
                },
            }
        };
        const apples = {
            name: "apples",
            yield: 100,
            salePrice: 2,
            costs: 1,
            factors: {
                sun: {
                    low: 80,
                    medium: 110,
                    high: 50,
                },
                wind: {
                    low: 100,
                    medium: 70,
                    high: 40,
                },
                soilClay: {
                    low: 100,
                    medium: 70,
                    high: 10,
                }
            }
        };
        const avocados = {
            name: "avocados",
            yield: 50,
            salePrice: 4,
            costs: 1,
            factors: {
                sun: {
                    low: 80,
                    medium: 100,
                    high: 50,
                },
                wind: {
                    low: 100,
                    medium: 70,
                    high: 40,
                },
                soilClay: {
                    low: 110,
                    medium: 70,
                    high: 30,
                },
            },
        };
        const environmentFactors = [{
            crop: corn,
            numCrops: 40,
            sun: "medium",
            wind: "low"
        },
        {
            crop: apples,
            numCrops: 50,
            sun: "medium",
            wind: "low",
            soilClay: "high"
        },
        {
            crop: avocados,
            numCrops: 40,
            sun: "medium",
            wind: "low",
            soilClay: "low"
        }];
        expect(getTotalProfit(environmentFactors)).toBe(17430);
    });
});