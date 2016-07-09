angular.module('app').service('events', events);

function events(){
    return {
        pointClicked: "point_clicked"
    }
}