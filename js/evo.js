/**
 * Created by chrisramsey on 1/4/15.
 */
var evo = {

    //variables
    totalPoints: 0,
    multiplier: 0.5,
    barWidth: 0,
    totalGerms: 0,
    germX: [],
    germY: [],
    buttons: [],
    germInterval: null,

    getButtons: function () {
        $('.addMultiplier').each(function (key, val) {
            $(this).find('.cost').text($(this).data('cost'));
            $(this).find('.add').text($(this).data('add'));

            evo.buttons.push($(this).data('name'));
        });
    },

    //set the state of the buttons based on how many points the user has
    setButtonStates: function () {
        evo.buttons.forEach(function (val, key, array) {
            //get cost of button
            var cost = parseFloat($('.addMultiplier.' + val).data('cost'));

            if (evo.totalPoints < cost) {
                //enable the button
                $('.addMultiplier.' + val).prop('disabled', true).css('opacity', '0.5');
            } else {
                //disable the button
                $('.addMultiplier.' + val).prop('disabled', false).css('opacity', '1');
            }
        })
    },

    //increase the cost of the button purchase by 0.3%
    increaseCost: function (btn) {
        var oldCost = parseFloat($('.' + btn).data('cost'));
        var newCost = oldCost + (oldCost * 0.3);

        //round to 2 decimals
        newCost = Math.round((newCost + 0.00001) * 100) / 100;

        $('.' + btn).data('cost', newCost);
        $('.' + btn + ' .cost').text(newCost);

        if (evo.totalPoints < newCost) {
            $('.' + btn).prop('disabled', true).css('opacity', '0.5');
        } else {
            $('.' + btn).prop('disabled', false);
        }
    },

    roundPoints: function () {
        evo.totalPoints = Math.round((evo.totalPoints + 0.00001) * 100) / 100;
    },

    makeGerm: function () {
        setTimeout(function() {
            evo.totalGerms++;
            var thisGerm = evo.totalGerms -1;

            if (evo.totalGerms == 1) {
                evo.germX[0] = 50;
                evo.germY[0] = 50;
            } else {
                evo.germX[thisGerm] = evo.germX[thisGerm - 1];
                evo.germY[thisGerm] = evo.germY[thisGerm - 1];

            }

            var germ = $('canvas').drawImage({
                source: 'images/germ.png',
                layer: true,
                name: 'germ' + thisGerm,
                x: evo.germX[thisGerm],
                y: evo.germY[thisGerm],
                scale: 0.5
            });

            clearInterval(evo.germInterval);

            evo.germInterval = setInterval(function () {
                evo.nextGermStep();

                evo.germX.forEach(function (val, key) {
                    $('canvas')
                        .animateLayer('germ' + key, {
                            x: evo.germX[key],
                            y: evo.germY[key]
                        }, 200);
                });
            }, 200);
        }, 10);
    },

    nextGermStep: function () {
        var canvasWidth = $('canvas').width();
        var canvasHeight = $('canvas').height();
        var forwardOrBackward = Math.floor((Math.random() * 2) + 1);

        evo.germX.forEach(function (val, key) {
            var x = evo.germX[key];
            var y = evo.germY[key];

            if (x < canvasWidth - 50 && x >= 50) {
                if (forwardOrBackward == 1) {
                    evo.germX[key] = evo.germX[key] + Math.floor((Math.random() * 10) + 1);
                } else {
                    evo.germX[key] = evo.germX[key] - Math.floor((Math.random() * 10) + 1);
                }
            } else {
                if (x >= canvasWidth - 50) {
                    evo.germX[key] = evo.germX[key] - Math.floor((Math.random() * 10) + 1);
                } else if (x <= 50) {
                    evo.germX[key] = evo.germX[key] + Math.floor((Math.random() * 10) + 1);
                }
            }

            if (y < canvasHeight - 50 && y >= 50) {
                if (forwardOrBackward == 1) {
                    evo.germY[key] = evo.germY[key] + Math.floor((Math.random() * 10) + 1);
                } else {
                    evo.germY[key] = evo.germY[key] - Math.floor((Math.random() * 10) + 1);
                }
            } else {
                if (y >= canvasHeight - 50) {
                    evo.germY[key] = evo.germY[key] - Math.floor((Math.random() * 10) + 1);
                } else if (y <= 50) {
                    evo.germY[key] = evo.germY[key] + Math.floor((Math.random() * 10) + 1);
                }
            }
        });
    }
};