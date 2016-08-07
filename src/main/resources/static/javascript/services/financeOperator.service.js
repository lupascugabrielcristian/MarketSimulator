angular.module('app').service('financeOperator', financeOperator);

function financeOperator(player) {
    return  {
        canBuyCommodity: canBuyCommodity,
        makePaymentToCity: makePaymentToCity,
        makeSellTransaction: makeSellTransaction
    };


    function canBuyCommodity(commodity) {
        var unitPrice = commodity.currentPrice;
        if (!unitPrice) {
            unitPrice = commodity.defaultPrice;
        }
        var price = unitPrice * commodity.quantity;
        var playerMoney = player.getPlayerData().money;

        return playerMoney >= price;
    }

    function makePaymentToCity(city, commodity) {
        var price = commodity.currentPrice;
        if (!price) {
            price = commodity.defaultPrice;
        }

        var value = price * commodity.quantity;
        player.justPay(value);
    }

    function makeSellTransaction(cargo) {
        var commodity = cargo.commodity;
        var moneyToReceive;

        var unitValue = commodity.currentPrice;
        if (!unitValue) {
            unitValue = commodity.defaultPrice;
        }

        moneyToReceive = unitValue * commodity.quantity;
        if (!moneyToReceive) {
            console.log("Money to receive is 0!");
        }

        player.receivePayment(moneyToReceive);
    }
}
