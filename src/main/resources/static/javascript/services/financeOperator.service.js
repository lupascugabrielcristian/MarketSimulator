angular.module('app').service('financeOperator', financeOperator);

function financeOperator(player) {
    return  {
        canPay: canPay,
        makePaymentToCity: makePaymentToCity,
        makeSellTransaction: makeSellTransaction
    };


    function canPay(sum) {
        console.log("Not implemented");
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
