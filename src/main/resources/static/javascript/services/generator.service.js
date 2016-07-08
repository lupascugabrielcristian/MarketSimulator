angular.module('app').service('generatorService', generatorService);

function generatorService() {

    return {
        generatePoints: generatePoints
    };

    function generatePoints(howMany){
        var points = [];
        while (points.length < howMany) {
            // Vreau sa generez pt x valori intre 10 si 1100
            var x = 20 + Math.random() * 1200;
            x = Math.round(x);
            // Vreau sa generez pt y valori intre 10 si 690
            var y = 10 + Math.random() * 670;
            y = Math.round(y);
            points.push(new Point(x, y));
        }
        return points;
    }

}


function Point(x, y) {
    this.x = x;
    this.y = y;
    this.r = 5;
    this.selected = false;
}