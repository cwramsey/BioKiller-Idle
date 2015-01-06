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
    }

    evo.getButtons();
    evo.start();
    evo.makeGerm();

    var gameLoop = setInterval(function () {

        evo.totalPoints = evo.roundIt(evo.totalPoints + 1 * evo.multiplier);
        $('.totalPoints').text(evo.totalPoints);
        $('.multiplier').text(evo.multiplier);

        evo.setButtonStates();
    }, evo.time * 1000);

    //add the multiplier
    $('.addMultiplier').click(function (e) {
        e.preventDefault();

        evo.addMultiplier($(this).data('name'));

    });

    $('.start-modal').on('hidden.bs.modal', function () {

    })

    $('.addPoints').click(function() {
        evo.addPoints();
    })
});