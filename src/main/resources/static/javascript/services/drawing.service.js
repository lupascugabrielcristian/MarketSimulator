angular.module('app').service('drawingService', drawingService);

function drawingService($rootScope, events){

    return {
        drawPoints: drawPoints,
        removePoints: removePoints,
        drawCities: drawCities,
        drawShips: drawShips,
        drawMessage: drawMessage,
        removeMessage: removeMessage,
        drawLines: drawLines,
        removeLines: removeLines
    };

    function drawPoints(points){
        var svg = d3.select("#mainSvgArea");
        var circle = svg.selectAll("circle").data(points);
        circle.attr("cx", function(point) {return point.x;});
        circle.attr("cy", function(point) {return point.y;});


        circle.enter().append("circle")
            .attr("cx", function(point) {return point.x;})
            .attr("cy", function(point) {return point.y;})
            .attr("r", function(point) {return point.r;})
            .style("fill", "red")
            .on('click' , changePointColor);

    }

    function drawCities(cities) {
        var svg = d3.select("#mainSvgArea");
        var circle = svg.selectAll("circle").data(cities);
        circle.attr("cx", function(city) {return city.longitude;});
        circle.attr("cy", function(city) {return city.latitude;});


        circle.enter().append("circle")
            .attr("cx", function(city) {return city.longitude;})
            .attr("cy", function(city) {return city.latitude;})
            .attr("r", 4)
            .style("fill", "black")
            .on('click' , changePointColor);
    }

    function drawShips(ships){
        var svg = d3.select("#mainSvgArea");
        var shipObjects = svg.selectAll("rect").data(ships);


        shipObjects.attr("x", function(ship){return ship.position.x});
        shipObjects.attr("y", function(ship){return ship.position.y});


        shipObjects.enter().append("rect")
            .attr("x", function(ship){return ship.position.x})
            .attr("y", function(ship){return ship.position.y})
            .attr("width", 5)
            .attr("height", 5)
            .attr("fill", "yellow");

    }

    function drawMessage(message, x, y){
        var drawingArea = d3.select("#mainSvgArea");
        drawingArea.append("text")
            .attr("x", x)
            .attr("y", y)
            .attr("dy", ".45em")
            .text(message);
    }

    function removeMessage(){
        d3.select("#mainSvgArea")
            .selectAll("text").remove();
    }

    function removeLines() {
        var svg = d3.select("#mainSvgArea");
        svg.selectAll("line").remove();
    }

    function removePoints(){
        var svg = d3.select("#mainSvgArea");
        svg.selectAll("circle").remove();
    }

    function drawLines(points) {
        points.forEach(function(point, index, allPoints) {
            if (index < allPoints.length - 1) {
                drawLine(point, allPoints[index + 1]);
            }
        });
    }


    function changePointColor(point){

        // var svg = d3.select("#mainSvgArea");
        // var circle = svg.selectAll("circle");
        // circle.style("fill", "red");
        $rootScope.$broadcast(events.pointClicked, point);
        point.selected = !point.selected;
        if (point.selected){
            d3.select(this).style("fill", "blue");
        }
        else {
            d3.select(this).style("fill", "black");
        }
    }



    function drawLine(point1, point2) {
        var svg = d3.select("#mainSvgArea");

        svg.append("line")
            .attr("x1", point1.x)
            .attr("y1", point1.y)
            .attr("x2", point2.x)
            .attr("y2", point2.y)
            .attr("stroke-width", 1)
            .attr("stroke", "rgb(187, 180, 180)");
    }

}