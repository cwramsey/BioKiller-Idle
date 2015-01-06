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
    },

    getCommits: function() {
        var url = 'https://api.github.com/repos/cwramsey/biokiller-idle/commits?sha=gh-pages';
        var element = "";

        $.getJSON(url, function(data) {
            console.log(data);

            data.forEach(function(val, key) {
                element += "<li>" + val.commit.message + " - " + misc.when(val.commit.committer.date) + "</li>";
            });

            $('.show-changes').html(element);
        })
    },

    when: function(commitDate) {
        var commitTime = new Date(commitDate).getTime();
        var todayTime = new Date().getTime();

        var differenceInDays = Math.floor(((todayTime - commitTime)/(24*3600*1000)));
        if (differenceInDays === 0) {
            var differenceInHours = Math.floor(((todayTime - commitTime)/(3600*1000)));
            if (differenceInHours === 0) {
                var differenceInMinutes = Math.floor(((todayTime - commitTime)/(600*1000)));
                if (differenceInMinutes === 0) {

                    return 'just now';
                }

                return 'about ' + differenceInMinutes + ' minutes ago';
            }

            return 'about ' + differenceInHours + ' hours ago';
        } else if (differenceInDays == 1) {
            return 'yesterday';
        }
        return differenceInDays + ' days ago';
    }
}