/**
 * Created by chrisramsey on 1/4/15.
 */

$(document).ready(function() {

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
        $(this).prop('disabled', true);


        var add = parseFloat($(this).data('add'));
        var cost = parseFloat($(this).data('cost'));

        //console.log(cost);

        if (evo.totalPoints > cost) {
            evo.multiplier = evo.multiplier + add;
            evo.totalPoints = evo.totalPoints - cost;
            evo.roundPoints();

            $('.totalPoints').text(evo.totalPoints);
            $('.multiplier').text(evo.multiplier);

            evo.increaseCost(e.currentTarget.dataset.name);
        } else {
            //fail purchase
        }

        if ($(this).hasClass('reproduce')) {
            evo.makeGerm();
        }

        //console.log(e);
    })
});