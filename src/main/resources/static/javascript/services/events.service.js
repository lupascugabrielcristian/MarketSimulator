angular.module('app').service('events', events);

function events(){
    return {
        pointClicked: "point_clicked",
        nextDay: "next_day",
        shipBought: "ship_is_bought",
        message: "message_to_show", // Ar trebui sa fie de forma {message: "msg"}
        alert:"alert", // ar trebui sa fie de forma $rootScope.$broadcast(events.alert, "Test de alert");
        modal: "switch_modal_visibility" // O folosesc pe asta in map.html ca sa arat unul din modal-urile alea
                                        // si in cargoOperations2.html. Ii dau la args pr map.html modal, closeOthers si ship.
                                        // La cargoOperations.controller ii dau id-ul modalului care vreau sa il afisez, commodity, ship
    }
}
