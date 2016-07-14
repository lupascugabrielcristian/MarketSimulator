angular.module('app').service('events', events);

function events(){
    return {
        pointClicked: "point_clicked",
        nextDay: "next_day",
        shipBought: "ship_is_bought",
        message: "message_to_show",
        modal: "switch_modal_visibility"
    }
}