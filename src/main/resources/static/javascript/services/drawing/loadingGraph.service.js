angular.module('app').service('loadingGraph', loadingGraph);

function loadingGraph($rootScope, events) {
    var loadingWidth = 450;
    var loadingHeight = 150;
    var downOffset = 20;

    return {
        drawInitialGraph: drawInitialGraph,
        updateGraph: updateGraph
    };

    function drawInitialGraph(ship) {
        var svg = d3.select("#svgArea");

        if (svg.empty()) {
            showError("Cannot find svgArea");
            return;
        }

        svg.append("rect")
            .attr("id", "total")
            .attr("x", 0)
            .attr("y", downOffset)
            .attr("width", loadingWidth)
            .attr("height", loadingHeight)
            .attr("style", "fill-opacity: 0;stroke-width:1;stroke:rgb(22, 29, 40)");

        svg.append("rect")
            .attr("id", "used")
            .attr("x", 1)
            .attr("y", loadingHeight - 1 + downOffset)
            .attr("width", loadingWidth - 2)
            .attr("height", 1)
            .attr("style", "fill-opacity: 0.5;stroke-width:1;stroke:rgb(0,0,0)");

        var full, current;
        if (ship) {
            full = "Full: "  + ship.capacity;
            current = ship.remainingVolume;
        }
        else {
            full = "No ship";
            current = "0";
        }
        svg.append("text")
            .text(full)
            .attr("x", 30)
            .attr("y", 10)
            .attr("font-size", 14)
            .style("color", "black");

        svg.append("text")
            .attr("id", "currentValue")
            .text(current)
            .attr("x", loadingWidth + 8)
            .attr("y", loadingHeight + downOffset)
            .attr("font-size", 14)
            .style("color", "black")

    }

    function updateGraph(ship, filledRatio) {
        if (!filledRatio && ship) {
            filledRatio = Math.round(ship.occupiedVolume / ship.capacity * 100);
        }

        if (!filledRatio) {
            filledRatio = 0;
        }


        var filledHeight = Math.round(filledRatio * loadingHeight / 100);

        if (filledHeight > 0) {
            var svg = d3.select("#used");

            if (svg.empty()) {
                showError("Cannot find used element");
                return;
            }

            svg.data([filledHeight])
                .attr("y", loadingHeight - filledHeight + downOffset)
                .attr("height", filledHeight)
                .attr("style", "fill-opacity: 0.5;stroke-width:1;stroke:rgb(0,0,0)");

            var value = ship.occupiedVolume;
            var currentValueElement = d3.select("#currentValue");

            if (currentValueElement.empty()) {
                showError("Cannot find currentValue element");
                return;
            }

            currentValueElement.data([value])
                .text(value)
                .attr("y", loadingHeight - filledHeight + downOffset)
        }
    }

    function showError(text) {
        $rootScope.$broadcast(events.alert, text);
    }
}