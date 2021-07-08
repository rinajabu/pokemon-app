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