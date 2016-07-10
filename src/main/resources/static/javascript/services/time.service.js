angular.module('app').service('timeService', timeService);

function timeService(citiesManager, $interval, $rootScope, events) {
    var days = 0;
    var timeInterval;

    return {
        stop: stop,
        start: start,
        getDayNumber: getDayNumber,
        setDayNumber: setDayNumber
    };

    function start() {
        timeInterval = $interval(function() {
            citiesManager.nextDay();
            days += 1;
            $rootScope.$broadcast(events.nextDay, days);
        }, 1000);
    }

    function stop() {
        $interval.cancel(timeInterval);
    }

    function setDayNumber(_days) {
        days = _days;
    }

    function getDayNumber() {
        return days;
    }
}