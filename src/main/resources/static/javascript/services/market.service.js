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


        city.population;
        var thereIsFactory = hasFactoryFor(commodity, city);

        var productionRate = thereIsFactory.factory.productionRate;
        var totalCommototiesOfThisType = commoditiesByName[commodity.name];


        var needCoeficient = calculateNeedCoeficient(commodity, city);
        var finalPrice = commodity.defaultPrice * needCoeficient * populationCoeficient * factoryCoeficient * rarityCoeficient * productionCoeficient;

    }

    function getBuyPriceForCommodity(commodity, city) {
        /* Vreau sa fac in asa fel incat buy price (pretul cu care o nava cumpara din oras) sa depinda de:
        - cat de multe rezerve are orasul, respectiv la populatie (rezerveCoeficient)
        - cat de rar este in general ( scarceCoeficient )
        - cat de greu se produce ( productionCoeficient )
        - daca are fabrica in oras (factoryCoeficient )
        */
    }


    // Implementation
    function calculateNeedCoeficient(commodity, city) {
        var quantityInCity = citiesManager.getCommodityInCity(commodity, city);
        var unitsPerPopulation = 1; // Aici sa fac sa iau de pe server, sau ca marfa respectiva sa contine si un astfel de field. Sau sa aiba o functie de populatie
        // As putea sa fac o pagina in care sa editez marfurile si proprietatile lor. Sa creez marfuri.

        // Formula de aici este ca qc = 1(adica nu are nici un efect) atunci cand quantityInCity este 200% din necesar
        // formula este f(x)=0.0001x2−0.035x+4
        var necessaryQuantity = city.population * unitsPerPopulation;
        var satisfiedRatio = (quantityInCity * 100) / necessaryQuantity;
        return 0.0001 * satisfiedRatio * satisfiedRatio - 0.035 * satisfiedRatio + 4;
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
