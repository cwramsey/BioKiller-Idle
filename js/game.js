/**
 * Created by chrisramsey on 1/4/15.
 */

$(document).ready(function() {

    var dev = 0;

    if (dev != 1) {
        $('.dev').remove();
    }

    evo.getButtons();
    evo.makeGerm();

    var gameLoop = setInterval(function() {

        evo.totalPoints = evo.totalPoints + 1 * evo.multiplier;
        evo.roundPoints();
        $('.totalPoints').text(evo.totalPoints);
        $('.multiplier').text(evo.multiplier);

        evo.setButtonStates();
    }, 1000);

    //add the multiplier
    $('.addMultiplier').click(function(e) {
        e.preventDefault();

        evo.addMultiplier($(this).data('name'));

    })
});