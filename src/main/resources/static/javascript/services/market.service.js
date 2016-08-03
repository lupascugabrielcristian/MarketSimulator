angular.module('app').service('market', market);

function market(citiesManager) {
    var commoditiesByName = {}

    return {
        getSellPriceForCommodity: getSellPriceForCommodity,
        getBuyPriceForCommodity: getBuyPriceForCommodity
    };


    function getSellPriceForCommodity(commodity, city) {
        /* Vreau sa fac in asa fel incat sell price (pretul cu care o nava vinde in oras) sa depinda de:
        - daca orasul ala are sau nu deja ce vand eu(chiar daca nu are fabrica)(needCoeficient)
        - de populatia orasului (populationCoeficient)
        - daca are fabrica sau nu (factoryCoeficient)
        - cat de rar este in general (rarityCoeficient)
        - cat de greu se produce (productionCoeficient)
        */

        updateCommoditiesByName();
        var needCoeficient = calculateNeedCoeficient(commodity, city);
        var populationCoeficient = calculatePopulationCoefficient(commodity, city);
        var factoryCoeficient = calculateFactoryCoefficient(commodity, city);
        var rarityCoeficient = calculateRarityCoefficient(commodity, city);
        var productionCoeficient = calculateProductionCoefficient(commodity, city);

        var sellPrice = commodity.defaultPrice * needCoeficient * populationCoeficient * factoryCoeficient * rarityCoeficient * productionCoeficient;
        commodity.currentPrice = Math.round(sellPrice * 100) / 100;
        return commodity.currentPrice;
    }

    function getBuyPriceForCommodity(commodity, city) {
        /* Vreau sa fac in asa fel incat buy price (pretul cu care o nava cumpara din oras) sa depinda de:
        - cat de multe rezerve are orasul, respectiv la populatie (rezerveCoeficient)
        - cat de rar este in general ( scarceCoeficient )
        - cat de greu se produce ( productionCoeficient )
        - daca are fabrica in oras (factoryCoeficient )
        */

        updateCommoditiesByName();
        var scarceCoeficient = calculateScarceCoefficient(commodity, city);
        var productionCoeficient = calculateProductionCoefficient(commodity, city);
        var factoryCoeficient = calculateFactoryCoefficient(commodity, city);

        var buyPrice = commodity.defaultPrice * scarceCoeficient * productionCoeficient * factoryCoeficient
        commodity.currentPrice = Math.round(buyPrice * 100) / 100;
        return commodity.currentPrice;
    }


    // Implementation
    function calculateNeedCoeficient(commodity, city) {
        var quantityInCity = citiesManager.getCommodityInCity(commodity, city);
        var unitsPerPopulation = 1; // Aici sa fac sa iau de pe server, sau ca marfa respectiva sa contine si un astfel de field. Sau sa aiba o functie de populatie
        // As putea sa fac o pagina in care sa editez marfurile si proprietatile lor. Sa creez marfuri.
        if (!city.population) city.population = 1;
        var necessaryQuantity = city.population * unitsPerPopulation;
        var satisfiedRatio = (quantityInCity * 100) / necessaryQuantity;

        // Formula de aici este ca qc = 1(adica nu are nici un efect) atunci cand quantityInCity este 200% din necesar
        // formula este f(x)=x2/20000 - x/40 + 4
        var result = satisfiedRatio * satisfiedRatio / 20000 - satisfiedRatio / 40 + 4;
        return result;
    }

    function calculatePopulationCoefficient(commodity, city) {
        return 1;
    }

    function calculateFactoryCoefficient(commodity, city) {
        var thereIsFactory = hasFactoryFor(commodity, city);
        if (thereIsFactory) {
            return 1;
        }
        else {
            return 1.5;
        }
    }

    function calculateRarityCoefficient(commodity, city) {
        var totalQuantity = commoditiesByName[commodity.name];
        if (!totalQuantity) totalQuantity = 0;

        var totalPopulation = citiesManager.getTotalPopulation();
        if (!commodity.unitsPerPopulation) commodity.unitsPerPopulation = 1;
        var overallSatisfaction = totalPopulation * commodity.unitsPerPopulation;

        // Formula pentru asta este
        // 2.67857×10^-17 x^6-9.97024×10^-14 x^5+1.44494×10^-10 x^4-1.02098×10^-7 x^3+0.0000369274 x^2-0.00780655 x+1.5
        var result = 2.67857  * Math.pow(10, -17) * Math.pow(overallSatisfaction, 6) -
                    9.97024 * Math.pow(10, -14) * Math.pow(overallSatisfaction, 5) +
                    1.44494 * Math.pow(10, -10) * Math.pow(overallSatisfaction, 4) -
                    1.02098 * Math.pow(10, -7) * Math.pow(overallSatisfaction, 3) +
                    0.0000369274 * Math.pow(overallSatisfaction, 2) -
                    0.00780655 * overallSatisfaction + 1.5;

         return result;
    }

    function calculateProductionCoefficient(commodity, city) {
        return 1;
    }

    function calculateScarceCoefficient(commodity, city) {
        // Vreau ca, cu cat este mai mare satisfiedRatio cu atat sa fie mai rezultatul
        // result = 1 nu face nici o diferenta, < 1 scade pretul, >1 creste pretul

        // Pentru ca deocamdata seamana cu coeficientul de raritate, returnez acelasi rezultat
        return calculateRarityCoefficient(commodity, city);
    }

    function hasFactoryFor(commodity, city) {
        try {
            city.factories.forEach(function(factory){
                if (factory.commodity.name == commodity.name) {
                    throw factory;
                }
            });
        }
        catch (foundFactory) {
            return {
                have: true,
                factory: foundFactory
            }
        }
        return {
            have: false
        }
    }

    function updateCommoditiesByName(){
        function addCommodity(commodity) {
            if (commodity.name in commoditiesByName){
                commoditiesByName[commodity.name] += commodity.quantity;
            }
            else {
                commoditiesByName[commodity.name] = commodity.quantity;
            }
        }

        citiesManager.getCities().forEach(addCommodity);
    }

}
