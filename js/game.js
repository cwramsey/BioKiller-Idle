/**
 * Created by chrisramsey on 1/4/15.
 */

$(document).ready(function () {

    var dev = 0;

    if (dev != 1) {
        $('.dev').remove();
    } else {
        $('.dev').show();
        evo.totalPoints = 2000;
        evo.time = 0.3;
        evo.contaminateChance = 10;
        evo.canContaminateAfter = 20;
    }

    misc.restoreGame();

    evo.getButtons();
    evo.start();

    var gameLoop = setInterval(function () {

        var doContaminate = Math.floor((Math.random() * evo.contaminateChance) + 1);
        evo.contaminateWait++;

        evo.totalPoints = evo.roundIt(evo.totalPoints + 1 * evo.multiplier);
        $('.totalPoints').text(evo.totalPoints);
        $('.totalPoints').digits();
        $('.multiplier').text(evo.multiplier);
        $('.multiplier').digits();
        $('.contaminationChance').text(Math.round(((evo.time / evo.contaminateChance) * 100) * 100) / 100 + '%');

        evo.setButtonStates();

        if (doContaminate == (evo.contaminateChance - 1) && evo.totalPoints > 1000 && evo.contaminateWait > evo.canContaminateAfter && evo.totalGerms > 5) {
            evo.contaminate();
            evo.contaminateWait = 0;
        }

    }, evo.time * 1000);

    //save game every 30 seconds
    var saveGame = setInterval(function() {
        misc.saveGame();
    }, 60 * 1000);

    //add the multiplier
    $('.addMultiplier').click(function (e) {
        e.preventDefault();
        evo.addMultiplier($(this).data('name'));
    });

    //add euipment
    $('.addEquipment').click(function (e) {
        e.preventDefault();
        evo.addEquipment('.' + $(this).data('name'));
    });

    $('.reset').click(function(e) {
        e.preventDefault();
        $.jStorage.flush();
        location.reload();
    })

    $('.start-modal').on('hidden.bs.modal', function () {

    })

    $('.addPoints').click(function() {
        evo.addPoints();
    })
});