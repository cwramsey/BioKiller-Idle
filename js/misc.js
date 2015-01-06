/**
 * Created by chrisramsey on 1/6/15.
 */

misc = {

    saveName: "biokiller-game-data",
    isReturning: false,

    secondsTimeSpanToHMS: function (s) {
        var h = Math.floor(s / 3600); //Get whole hours
        s -= h * 3600;
        var m = Math.floor(s / 60); //Get remaining minutes
        s -= m * 60;
        return h + ":" + (m < 10 ? '0' + m : m) + ":" + (s < 10 ? '0' + s : s); //zero padding on minutes and seconds
    },

    saveGame: function () {


        var gameData = {
            totalPoints: evo.totalPoints,
            multiplier: evo.multiplier,
            time: evo.time,
            totalGerms: evo.totalGerms,
            contaminateChance: evo.contaminateChance,
            prices: evo.prices
        };

        $.jStorage.set(misc.saveName, gameData, {
            TTL: 100000000
        });

        $.growl({
            title: "Game Saved",
            message: "Your game has been saved."
        }, {
            template: "<div data-growl='container' class='alert' role='alert'>\
                        <button type='button' class='close' data-growl='dismiss'>\
                        <span aria-hidden='true'>×</span>\
                        <span class='sr-only'>Close</span>\
                        </button>\
                        <span data-growl='icon'></span>\
                        <span class='growl-title' data-growl='title'></span><br />\
                        <span data-growl='message'></span>\
                        <a href='#' data-growl='url'></a>\
                        </div>",
            delay: 3000,
            placement: {
                from: "bottom",
                align: "right"
            },
            animate: {
                enter: 'animated fadeInRight',
                exit: 'animated fadeOutRight'
            }
        });
    },

    restoreGame: function () {
        var save = $.jStorage.get(misc.saveName);

        if (save != null) {
            misc.isReturning = true;
            evo.totalPoints = save.totalPoints;
            evo.multiplier = save.multiplier;
            evo.time = save.time;
            evo.totalGerms = save.totalGerms;
            evo.contaminateChance = save.contaminateChance;
            evo.prices = save.prices;
        }
    }
}