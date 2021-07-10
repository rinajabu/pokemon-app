$(() => {

    // sticky nav functionality
    const $navbar = $('#navbar');
    const $sticky = $navbar.offset().top;
    // console.log($sticky); = 24
    // console.log($(window).scrollTop()); = 0

    // window on scroll listener to make nav sticky
    $(window).on('scroll', () => {
        if ($(window).scrollTop() >= $sticky) {
            $navbar.addClass("sticky");
        } else {
            $navbar.removeClass("sticky");
        }
    })

    // window.onscroll = function () { myFunction() };

    // var navbar = document.getElementById("navbar");
    // var sticky = navbar.offsetTop;

    // function myFunction() {
    //     if (window.pageYOffset >= sticky) {
    //         navbar.classList.add("sticky")
    //     } else {
    //         navbar.classList.remove("sticky");
    //     }
    // }

    // .name and .id (name and ID)
    // .height and .weight (height and weight)
    // .sprites.back_default/back_shiny/front_default/front_shiny (IMG carousel 4 items)
    // .moves[array index].move.name (move list; will need for loop)
    // .stats[array index].stat.name (base stat name ex. hp, attack, etc.)
    // .stats[array index].base_stat (base stat number)
    // .types[array index].type.name (type of pokemon; bug, grass, etc.)

    /////////////// possible ///////////////////////
    // .location_area_encounters (encounter locations)
    // evolution chains

    // pokemon info button click event
    $('.btn').on('click', (event) => {

        event.preventDefault();

        // resetting the page after each search
        $('.name-imgs').children().remove();
        $('.stat-numbers').children().remove();

        // grabbing value from input box, putting value to lowercase
        let $grabPokemon = $('.input-value').val().toLowerCase();

        // to hide styling for stats section on each click
        $('.stats').removeClass('hide');

        // ajax query by pokemon name or ID#
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${$grabPokemon}`,
            type: "GET",
        }).then(
            (data) => {

                // condition if user puts in valid input value
                if ($grabPokemon === data.name || $grabPokemon == data.id) {
                    // creating the name / ID# portion of page //
                    const $nameIdH3 = $('<h3>')
                        .addClass('name')
                        .text(`Name: "${data.name}" || ID#: ${data.id}`);
                    $('.name-imgs').append($nameIdH3);

                    // creating the img carousel portion of the page //
                    const $imgCarouselContainer = $('<div>')
                        .addClass('carousel-container');
                    $('.name-imgs').append($imgCarouselContainer);

                    const $backBtn = $('<div>')
                        .addClass('back-btn')
                        .text('<');
                    $imgCarouselContainer.append($backBtn);

                    const $divImgs = $('<div>')
                        .addClass('img-carousel');
                    $imgCarouselContainer.append($divImgs);

                    const $imgs1 = $('<img>')
                        .attr({ 'src': data.sprites.front_default, 'alt': `Picture of ${data.name}` });
                    $('.img-carousel').append($imgs1);

                    const $imgs2 = $('<img>')
                        .attr({ 'src': data.sprites.back_default, 'alt': `Picture of ${data.name}` });
                    $('.img-carousel').append($imgs2);

                    const $imgs3 = $('<img>')
                        .attr({ 'src': data.sprites.front_shiny, 'alt': `Picture of ${data.name}` });
                    $('.img-carousel').append($imgs3);

                    const $imgs4 = $('<img>')
                        .attr({ 'src': data.sprites.back_shiny, 'alt': `Picture of ${data.name}` });
                    $('.img-carousel').append($imgs4);

                    const $forwardBtn = $('<div>')
                        .addClass('forward-btn')
                        .text('>');
                    $imgCarouselContainer.append($forwardBtn);

                    // creating the carousel section with forward and back buttons
                    let currentImgIndex = 0;
                    let numOfImages = $('.img-carousel').children().length - 1;
                    const $carouselImgs = $('.img-carousel').children();

                    // forward button event listener
                    $forwardBtn.on('click', () => {
                        $carouselImgs.eq(currentImgIndex).css('display', 'none');
                        if (currentImgIndex < numOfImages) {
                            currentImgIndex++;
                        } else {
                            currentImgIndex = 0
                        }
                        $carouselImgs.eq(currentImgIndex).css('display', 'block');
                    });

                    // back button event listener
                    $backBtn.on('click', () => {
                        $carouselImgs.eq(currentImgIndex).css('display', 'none');
                        if (currentImgIndex > 0) {
                            currentImgIndex--
                        } else {
                            currentImgIndex = numOfImages;
                        }
                        $carouselImgs.eq(currentImgIndex).css('display', 'block');
                    })

                    // creating the stats section //
                    // height and weight
                    $('.height')
                        .text(`height: ${data.height}`);
                    $('.weight')
                        .text(`weight: ${data.weight}`);

                    // stat name and number // 
                    // looping through to get each stat name and number
                    for (let i = 0; i < data.stats.length; i++) {
                        const $statDivs = $('<div>')
                            .text(`${data.stats[i].stat.name}: ${data.stats[i].base_stat}`);
                        $('.stat-numbers').append($statDivs);
                    }

                    // move list //
                    // looping through to get every move available to each pokemon
                    const $moveList = $('.move-list')
                        .text('moves list (click to expand)');
                    const $movesUl = $('<ul>')
                        .addClass('move-ul');
                    $moveList.append($movesUl);

                    // make the move list expand and hide by toggling move-ul class in css
                    $moveList.on('click', () => {
                        $movesUl.toggleClass('move-ul');
                    })

                    for (let i = 0; i < data.moves.length; i++) {
                        const $movesListLi = $('<li>')
                            .text(`${data.moves[i].move.name}`);
                        $movesUl.append($movesListLi);
                    }

                    // type list //
                    // looping through to get all the pokemon types
                    const $typeDiv = $('.type')
                        .text(`type/types`);
                    const $typeUl = $('<ul>')
                        .addClass('type-ul');
                    $typeDiv.append($typeUl);

                    for (let i = 0; i < data.types.length; i++) {
                        const $typeLi = $('<li>')
                            .text(data.types[i].type.name);
                        $typeUl.append($typeLi);
                    }

                }
                // condition if input box left empty
                else {
                    $('.name-imgs').children().remove();
                    $('.stat-numbers').children().remove();
                    $('.stats').addClass('hide');
                    alert('Pokémon not found. Please check input and try again!');
                }

            }, // end of first promise parameter
            () => {
                // what happens if user enters input that isn't in API
                $('.name-imgs').children().remove();
                $('.stat-numbers').children().remove();
                $('.stats').addClass('hide');
                alert('Pokémon not found. Please check input and try again!');
            }
        )

    }) // pokemon submit button event listener closing

    //////////////////////// quiz modal event //////////////////////////
    $('.quiz-modal').on('click', (event) => {

        const $modalDiv = $('<div>')
            .addClass('modal');

        const $quizModalTextbox = $('<div>')
            .addClass('quiz-modal-textbox');

        const $quizModalH1 = $('<h1>')
            .addClass('quiz-modal-h1')
            .text("Pokémon Quiz");

        const $quizModalP = $('<p>')
            .addClass('quiz-modal-p')
            .text(`Guess the randomly generated Pokémon from it's shiny back view!`);

        const $quizGenerateBtn = $('<input>')
            .addClass('quiz-generate-btn')
            .attr({ 'type': 'submit', 'value': 'generate' });

        const $quizItemsDiv = $('<div>')
            .addClass('quiz-items-div');

        const $quizImgDiv = $('<div>')
            .addClass('quiz-img-div');

        const $quizInputDiv = $('<div>')
            .addClass('quiz-input-div');

        const $quizForm = $('<form>')
            .addClass('quiz-form');

        const $quizInputBox = $('<input>')
            .addClass('quiz-input-box')
            .attr({ 'type': 'text', 'placeholder': 'guess! name or ID#' });

        const $quizGuessSubmitBtn = $('<input>')
            .addClass('quiz-guess-submit-btn')
            .attr({ 'type': 'submit' });

        const $quizModalCloseBtn = $('<button>')
            .addClass('quiz-modal-close-btn')
            .attr('id', 'close-btn')
            .text('EXIT');

        $quizModalTextbox.append($quizModalH1);
        $quizModalTextbox.append($quizModalP);
        $quizImgDiv.append($quizGenerateBtn);
        $quizModalTextbox.append($quizItemsDiv);
        $quizItemsDiv.append($quizImgDiv);
        $quizItemsDiv.append($quizInputDiv);
        $quizInputDiv.append($quizForm);
        $quizForm.append($quizInputBox);
        $quizForm.append($quizGuessSubmitBtn);
        $quizModalTextbox.append($quizModalCloseBtn);
        $modalDiv.append($quizModalTextbox);
        $('.container').append($modalDiv);

        $quizGenerateBtn.on('click', (event) => {

            event.preventDefault();

            // clears guess img and guess result fields each click
            $('.guess-img').remove();
            $('.wrong-guess-p').remove();
            $('.correct-guess-p').remove();

            let $randomPokemon = Math.ceil(Math.random() * 500);

            $.ajax({
                url: `https://pokeapi.co/api/v2/pokemon/${$randomPokemon}`,
                type: "GET",
            }).then(
                (data) => {

                    const $guessImg = $('<img>')
                        .addClass('guess-img')
                        .attr({ 'src': data.sprites.back_shiny, 'alt': `Back picture of ${data.name}`, 'name': data.name });

                    $quizImgDiv.append($guessImg);

                },
                () => {
                    console.log('bad quiz request');
                }
            )

        }) // quiz generate btn event closing

        // quiz guess submit btn event listener
        $quizGuessSubmitBtn.on('click', (event) => {

            event.preventDefault();

            // clears guess results field
            $('.wrong-guess-p').remove();
            $('.correct-guess-p').remove();

            // grabbing the values of the guess input and the correct pokemon name from the guess img element
            const $quizInputGuess = $('.quiz-input-box').val().toLowerCase();
            const $correctPokemonName = $('.guess-img').attr('name');

            if ($quizInputGuess === $correctPokemonName) {

                const $correctGuessP = $('<p>')
                    .addClass('correct-guess-p')
                    .text(`You got it right! It was ${$correctPokemonName}! Click 'generate' to play it again!`);

                $('.quiz-input-div').append($correctGuessP);

            } else {

                const $wrongGuessP = $('<p>')
                    .addClass('wrong-guess-p')
                    .text(`You guessed wrong! Try to guess again or click 'generate' to try again!`);

                $('.quiz-input-div').append($wrongGuessP);

            }



        })

        // exit button event
        $quizModalCloseBtn.on('click', () => {
            $modalDiv.remove();
        })

    })


    ////////////// pokemon mini modal battle story ////////////////////////
    $('.game-modal').on('click', (event) => {

        // making the elements for modal game
        const $modalDiv = $('<div>')
            .addClass('modal');

        const $gameModalTextbox = $('<div>')
            .addClass('game-modal-textbox');

        const $gameModalH1 = $('<h1>')
            .addClass('game-modal-h1')
            .text("Mini Pokémon Battle Story");

        const $gameModalP = $('<p>')
            .addClass('game-modal-p')
            .text(`Make a Pokémon battle story with two randomly generated Pokémon! (only the original 150 Pokémon)`);

        const $gameBattleDiv = $('<div>')
            .addClass('game-battle-div');

        const $pokemon1 = $('<div>')
            .addClass('pokemon-1-div');

        const $pokemon1Btn = $('<input>')
            .addClass('game-btn-1')
            .attr({ 'type': 'submit', 'value': 'generate 1st!' });

        const $battleBtn = $('<input>')
            .addClass('battle-btn')
            .attr({ 'type': 'submit', 'value': 'battle!' });

        const $pokemon2 = $('<div>')
            .addClass('pokemon-2-div');

        const $pokemon2Btn = $('<input>')
            .addClass('game-btn-2')
            .attr({ 'type': 'submit', 'value': 'generate 2nd!' });

        const $gameModalCloseBtn = $('<button>')
            .addClass('game-modal-close-btn')
            .attr('id', 'close-btn')
            .text('EXIT');

        $gameModalTextbox.append($gameModalH1);
        $gameModalTextbox.append($gameModalP);
        $gameModalTextbox.append($gameBattleDiv);
        $gameBattleDiv.append($pokemon1);
        $gameBattleDiv.append($battleBtn);
        $gameBattleDiv.append($pokemon2);
        $pokemon1.append($pokemon1Btn);
        $pokemon2.append($pokemon2Btn);
        $gameModalTextbox.append($gameModalCloseBtn);
        $modalDiv.append($gameModalTextbox);
        $('.container').append($modalDiv);

        // generate the 1st random pokemon
        $pokemon1Btn.on('click', (event) => {

            event.preventDefault();

            // clearing the results field after each generate click
            $('.battle-img1').remove();
            $('.battle-name1').remove();
            $('.battle-hp1').remove();
            $('.battle-attack1').remove();

            // randomizing the first 150 pokemon
            let $randomPokemon = Math.ceil(Math.random() * 150);

            $.ajax({
                url: `https://pokeapi.co/api/v2/pokemon/${$randomPokemon}`,
                type: "GET",
            }).then(
                (data) => {

                    // storing battle data in variables
                    const $hpStat = (data.stats[0].base_stat * 2);
                    const $attackStat = data.stats[1].base_stat;

                    const $battleImg = $('<img>')
                        .attr({ 'src': data.sprites.front_default, 'alt': `Picture of ${data.name}`, 'class': 'battle-img1' });
                    $pokemon1.append($battleImg);

                    const $battleName = $('<p>')
                        .addClass('battle-name1')
                        .text(`${data.name}`);
                    $pokemon1.append($battleName);

                    // storing hp num in attribute to grab for battle
                    const $battleHp = $('<p>')
                        .addClass('battle-hp1')
                        .attr('hp1', $hpStat)
                        .text(`HP: ${$hpStat}`);
                    $pokemon1.append($battleHp);

                    // storing attack num in attribute to grab for battle
                    const $battleAttack = $('<p>')
                        .addClass('battle-attack1')
                        .attr('attack1', $attackStat)
                        .text(`Attack: ${$attackStat}`);
                    $pokemon1.append($battleAttack);


                },
                () => {
                    console.log('game modal: bad request');
                }
            )

        }) // pokemon1Btn event closing

        // generate the 2nd random pokemon
        $pokemon2Btn.on('click', (event) => {

            event.preventDefault();

            // clearing the results field after each generate click
            $('.battle-img2').remove();
            $('.battle-name2').remove();
            $('.battle-hp2').remove();
            $('.battle-attack2').remove();

            // randomizing the first 150 pokemon
            let $randomPokemon = Math.ceil(Math.random() * 150);

            $.ajax({
                url: `https://pokeapi.co/api/v2/pokemon/${$randomPokemon}`,
                type: "GET",
            }).then(
                (data) => {

                    // storing battle data in variables
                    const $hpStat = (data.stats[0].base_stat * 2);
                    const $attackStat = data.stats[1].base_stat;

                    const $battleImg = $('<img>')
                        .attr({ 'src': data.sprites.front_default, 'alt': `Picture of ${data.name}`, 'class': 'battle-img2' });
                    $pokemon2.append($battleImg);

                    const $battleName = $('<p>')
                        .addClass('battle-name2')
                        .text(`${data.name}`);
                    $pokemon2.append($battleName);

                    // storing hp num in attribute to grab for battle
                    const $battleHp = $('<p>')
                        .addClass('battle-hp2')
                        .attr('hp2', $hpStat)
                        .text(`HP: ${$hpStat}`);
                    $pokemon2.append($battleHp);

                    // storing attack num in attribute to grab for battle
                    const $battleAttack = $('<p>')
                        .addClass('battle-attack2')
                        .attr('attack2', $attackStat)
                        .text(`Attack: ${$attackStat}`);
                    $pokemon2.append($battleAttack);


                },
                () => {
                    console.log('game modal: bad request');
                }
            )
        })

        // battle button event listener
        $('.battle-btn').on('click', (event) => {

            // grabbing hp and attack attribute numbers from each opponent and storing them in variables
            const $pokemon1name = $('.battle-name1').text();
            let $pokemon1Hp = $('.battle-hp1').attr('hp1');
            let $pokemon1Attack = $('.battle-attack1').attr('attack1');
            const $pokemon2name = $('.battle-name2').text();
            let $pokemon2Hp = $('.battle-hp2').attr('hp2');
            let $pokemon2Attack = $('.battle-attack2').attr('attack2');

            // show starting hp for both opponents; setting pokemon's health to 0 if their HP falls below 0, so no negative numbers are shown
            const status = () => {
                if ($pokemon1Hp <= 0 || $pokemon2Hp <= 0) {
                    if ($pokemon2Hp <= 0) {
                        $pokemon2Hp = 0;
                        alert(`${$pokemon1name}'s health: ${$pokemon1Hp}\n${$pokemon2name}'s health: ${$pokemon2Hp}`);
                    } else if ($pokemon1Hp <= 0) {
                        $pokemon1Hp = 0;
                        alert(`${$pokemon1name}'s health: ${$pokemon1Hp}\n${$pokemon2name}'s health: ${$pokemon2Hp}`);
                    }
                } else {
                    alert(`${$pokemon1name}'s health: ${$pokemon1Hp}\n${$pokemon2name}'s health: ${$pokemon2Hp}`);
                }
            }

            // check win to see if any pokemon's health goes below 0
            const checkWin1 = () => {
                if ($pokemon1Hp <= 0 && $pokemon2Hp <= 0) {
                    alert(`It's a tie! Both Pokémon fell in battle! Click Pokémon Battle Story to play again! Thanks for playing!`)
                    location.reload();
                } else if ($pokemon2Hp <= 0) {
                    alert(`${$pokemon1name} has won! Click Pokémon Battle Story to play again! Thanks for playing!`);
                    location.reload();
                } else if ($pokemon1Hp <= 0) {
                    alert(`${$pokemon2name} has won! Click Pokémon Battle Story to play again! Thanks for playing!`);
                    location.reload();
                } else {
                    battle2();
                }
            }

            const checkWin2 = () => {
                if ($pokemon1Hp <= 0 && $pokemon2Hp <= 0) {
                    alert(`It's a tie! Both Pokémon fell in battle! Click Mini Pokemon Game to play again! Thanks for playing!`)
                    location.reload();
                } else if ($pokemon2Hp <= 0) {
                    alert(`${$pokemon1name} has won! Click Mini Pokemon Game to play again! Thanks for playing!`);
                    location.reload();
                } else if ($pokemon1Hp <= 0) {
                    alert(`${$pokemon2name} has won! Click Mini Pokemon Game to play again! Thanks for playing!`);
                    location.reload();
                } else {
                    battle1();
                }
            }

            // battle function for pokemon1
            const battle1 = () => {
                // pokemon1 always hits first
                $pokemon2Hp -= $pokemon1Attack;
                alert(`${$pokemon1name} hits ${$pokemon2name} for ${$pokemon1Attack} damage!`);
                status();
                checkWin1();
            }

            // battle function for pokemon2
            const battle2 = () => {
                // pokemon2 attack
                $pokemon1Hp -= $pokemon2Attack;
                alert(`${$pokemon2name} hits ${$pokemon1name} for ${$pokemon2Attack} damage!`);
                status();
                checkWin2();
            }

            // conditional statement if two opponents have been generated
            if ($('.pokemon-1-div').children().length > 1 && $('.pokemon-2-div').children().length > 1) {
                alert(`Click 'ok' through the alerts to see the battle events unfold as a story!`);
                status();
                battle1();
                // conditional statement if two opponents have not yet been generated
            } else {
                alert('please generate 2 opponents first to battle');
            }
        })


        // close button event listener
        $gameModalCloseBtn.on('click', () => {
            $modalDiv.remove();
        })


    }) //game modal event listener closing


    ////////////////// pokemon weather modal event /////////////////////
    $('.weather-modal').on('click', (event) => {

        event.preventDefault();

        // creating modal div, modal textbox, and close button
        const $modalDiv = $('<div>')
            .addClass('modal');

        const $modalTextbox = $('<div>')
            .addClass('modal-textbox');

        const $modalH1 = $('<h1>')
            .addClass('modal-h1')
            .text("Your Local Pokemon Weather");

        const $modalP = $('<p>')
            .addClass('modal-p')
            .text(`It's important to know what mother nature has in store for your adventure too! Put your zip code to see the weather in your area!`);

        const $weatherForm = $('<form>')
            .addClass('weather-form');

        const $weatherZipInput = $('<input>')
            .addClass('zip-input')
            .attr({ 'type': 'text', 'placeholder': '5 digit zip code' });

        const $weatherSubmit = $('<input>')
            .addClass('weather-btn')
            .attr({ 'type': 'submit', 'value': 'get weather!' });

        const $modalCloseBtn = $('<button>')
            .addClass('modal-close-btn')
            .attr('id', 'close-btn')
            .text('CLOSE');

        $modalTextbox.append($modalH1);
        $modalTextbox.append($modalP);
        $modalTextbox.append($weatherForm);
        $weatherForm.append($weatherZipInput);
        $weatherForm.append($weatherSubmit);
        $modalTextbox.append($modalCloseBtn);
        $modalDiv.append($modalTextbox);
        $('.container').append($modalDiv);

        // click event to grab weather for certain zip code
        $weatherSubmit.on('click', (event) => {

            event.preventDefault();

            // clearing the previous weather
            $('.weather-modal-p').remove();

            // storing the zip code input in a variable
            const $zipInputVal = $('.zip-input').val();

            $.ajax({
                // API weather request for US 08857 zip code and imperial units of measurement
                url: `https://api.openweathermap.org/data/2.5/weather?zip=${$zipInputVal},us&units=imperial&appid=a7f687658a33baa04934ad5d4aecb3d1`,
                type: "GET",
            }).then(
                (data) => {

                    // creating variable to store weather data
                    const cityName = data.name;
                    const currentTemp = Math.round(data.main.temp);
                    const weatherDescription = data.weather[0].description;
                    const highTemp = Math.round(data.main.temp_max);
                    const lowTemp = Math.round(data.main.temp_min);
                    const windSpeed = Math.round(data.wind.speed);

                    const $weatherResultsP = $('<p>')
                        .addClass('weather-modal-p')
                        .text(`For the city of ${cityName}, the current temperature is ${currentTemp} \u00B0F with ${weatherDescription}. The high today will be ${highTemp} \u00B0F and the low ${lowTemp} \u00B0F. Wind speed is currently ${windSpeed}mph. Adventure on trainer!`);

                    $weatherResultsP.insertAfter($modalP);

                },
                () => {
                    alert("Please enter a valid 5 digit zip code (ex. 12345)");
                }
            )

        }) // submit button event listener closing


        // close button event listener to remove it when clicked
        $modalCloseBtn.on('click', () => {
            $modalDiv.remove();
        })



    }) // weather modal event listener closing







}) // window on load closing