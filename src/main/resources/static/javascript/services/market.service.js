angular.module('app').service('market', market);

function market(citiesManager) {
    return {
        getSellPriceForCommodity: getSellPriceForCommodity,
        getBuyPriceForCommodity: getBuyPriceForCommodity
    };


    function getSellPriceForCommodity(commodity, city) {
        /* Vreau sa fac in asa fel incat sell price (pretul cu care o nava vinde in oras) sa depinda de:
        - daca orasul ala are sau nu deja ce vand eu(chiar daca nu are fabrica)(needCoeficient)
        - de populatia orasului (populationCoeficient)
        - daca are fabrica sau nu (factoryCoeficient)
        - cat de rar este in general
        - cat de greu se produce
        */

        commodity.price
    }

    function getBuyPriceForCommodity(commodity, city) {
        /* Vreau sa fac in asa fel incat buy price (pretul cu care o nava cumpara din oras) sa depinda de:
        - cat de multe rezerve are orasul, respectiv la populatie (rezerveCoeficient)
        - cat de rar este in general ( scarceCoeficient )
        - cat de greu se produce ( productionCoeficient )
        - daca are fabrica in oras (factoryCoeficient )
        */
    }


}
