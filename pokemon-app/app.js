$(() => {

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

        // grabbing value from input box, putting value to lowercase for edge case purposes
        let $grabPokemon = $('.input-value').val().toLowerCase();

        // to hide styling for stats section on each click
        $('.stats').removeClass('hide');

        // ajax query by pokemon name or ID#
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${$grabPokemon}`,
            type: "GET",
        }).then(
            (data) => {
                // console.log(data.types[0].type.name);
                console.log(data);

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
                        // console.log(data.stats[i].stat.name, data.stats[i].base_stat);
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
                        // console.log(data.moves[i].move.name);
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
                        // console.log(data.types[i].type.name);
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
                    console.log('clicked');
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


    // pokemon mini modal battle game //
    $('.game-modal').on('click', (event) => {
        // console.log('game clicked!');

        // making the elements for modal game
        const $modalDiv = $('<div>')
            .addClass('modal');

        const $gameModalTextbox = $('<div>')
            .addClass('game-modal-textbox');

        const $gameModalH1 = $('<h1>')
            .addClass('game-modal-h1')
            .text("Mini Pokémon Battle Game");

        const $gameModalP = $('<p>')
            .addClass('game-modal-p')
            .text(`Simulate a Pokémon battle with two randomly generated Pokémon! (only the original 150 Pokémon)`);

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

            // can only generate once per session
            $(this).off(event);

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
                    // const $img = data.sprites.front_default;
                    const $hpStat = (data.stats[0].base_stat * 2);
                    const $attackStat = data.stats[1].base_stat;
                    // console.log(data.name);
                    // console.log($hpStat);
                    // console.log($attackStat);

                    const $battleImg = $('<img>')
                        .attr({ 'src': data.sprites.front_default, 'alt': `Picture of ${data.name}`, 'class': 'battle-img1' });
                    $pokemon1.append($battleImg);

                    const $battleName = $('<p>')
                        .addClass('battle-name1')
                        .text(`Name: ${data.name}`);
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
            // console.log('clicked btn 2!');

            event.preventDefault();

            // can only generate once per session
            $(this).off(event);

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
                    // const $img = data.sprites.front_default;
                    const $hpStat = (data.stats[0].base_stat * 2);
                    const $attackStat = data.stats[1].base_stat;
                    // console.log($img);
                    // console.log($hpStat);
                    // console.log($attackStat);

                    const $battleImg = $('<img>')
                        .attr({ 'src': data.sprites.front_default, 'alt': `Picture of ${data.name}`, 'class': 'battle-img2' });
                    $pokemon2.append($battleImg);

                    const $battleName = $('<p>')
                        .addClass('battle-name2')
                        .text(`Name: ${data.name}`);
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
            let $pokemon1Hp = $('.battle-hp1').attr('hp1');
            let $pokemon1Attack = $('.battle-attack1').attr('attack1');
            let $pokemon2Hp = $('.battle-hp2').attr('hp2');
            let $pokemon2Attack = $('.battle-attack2').attr('attack2');

            // show starting hp for both opponents
            const status = () => {
                console.log(`1st pokemon health: ${$pokemon1Hp}`);
                console.log(`2nd pokemon health: ${$pokemon2Hp}`);
            }

            // check win to see if any pokemon's health goes below 0
            const checkWin = () => {
                if ($pokemon1Hp <= 0) {
                    console.log('2nd Pokémon has won! Exit game and click Mini Pokemon Game to play again!');
                } else if ($pokemon2Hp <= 0) {
                    console.log('1st Pokémon has won! Exit game and click Mini Pokemon Game to play again!');
                } else {
                    status();
                    battle();
                }
            }

            // battle function
            const battle = () => {
                // pokemon1 always hits first, then pokemon2 hits after; then check if anyone wins. if they are both still alive, then run the battle function again
                $pokemon2Hp -= $pokemon1Attack;
                $pokemon1Hp -= $pokemon2Attack;
                checkWin();
            }

            // conditional statement if two opponents have been generated
            if ($('.pokemon-1-div').children().length > 1 && $('.pokemon-2-div').children().length > 1) {
                battle();




                // conditional statement if two opponents have not yet been generated
            } else {
                console.log('please generate 2 opponents');
            }
        })



        // close button event listener
        $gameModalCloseBtn.on('click', () => {
            $modalDiv.remove();
        })















    }) //game modal event listener closing


    // weather click event //
    // Math.floor(data.main.temp) = current temp in F
    // data.name = city name (always set to Old Bridge, NJ)
    // data.weather[0].description = weather description; clear skies, raining, etc.

    // weather modal event listener
    $('.weather-modal').on('click', (event) => {

        event.preventDefault();

        $.ajax({
            // API weather request for US 08857 zip code and imperial units of measurement
            url: `https://api.openweathermap.org/data/2.5/weather?zip=08857,us&units=imperial&appid=a7f687658a33baa04934ad5d4aecb3d1`,
            type: "GET",
        }).then(
            (data) => {
                // console.log(data);

                // creating variable to store weather data
                const currentTemp = Math.round(data.main.temp);
                const weatherDescription = data.weather[0].description;
                const highTemp = Math.round(data.main.temp_max);
                const lowTemp = Math.round(data.main.temp_min);
                const windSpeed = Math.round(data.wind.speed);

                // creating modal div, modal textbox, and close button
                const $modalDiv = $('<div>')
                    .addClass('modal');

                const $modalTextbox = $('<div>')
                    .addClass('modal-textbox');

                const $modalH1 = $('<h1>')
                    .addClass('modal-h1')
                    .text("It's important to know what mother nature has in store for your adventure too! So here is the weather forecast for your Pokémon adventure!");

                const $modalP = $('<p>')
                    .addClass('modal-p')
                    .text(`The current temperature is ${currentTemp} degrees with ${weatherDescription}. The high today will be ${highTemp} and the low ${lowTemp}. Wind speed is currently ${windSpeed}mph. Adventure on trainer!`);

                const $modalCloseBtn = $('<button>')
                    .addClass('modal-close-btn')
                    .attr('id', 'close-btn')
                    .text('CLOSE');

                $modalTextbox.append($modalH1);
                $modalTextbox.append($modalP);
                $modalTextbox.append($modalCloseBtn);
                $modalDiv.append($modalTextbox);
                $('.container').append($modalDiv);

                // close button event listener to remove it when clicked
                $modalCloseBtn.on('click', () => {
                    $modalDiv.remove();
                })

            },
            () => {
                console.log("bad request");
            }
        )








    }) // weather modal event listener closing







}) // window on load closing