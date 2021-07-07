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

        $('.name-imgs').children().remove();

        // grabbing value from input box
        let $grabPokemon = $('.input-value').val();
        const $container = $('.container');

        // ajax query by pokemon name or ID#
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${$grabPokemon}`,
            type: "GET",
        }).then(
            (data) => {
                // console.log(data);

                // creating the name/ID# portion of page
                const $nameIdH3 = $('<h3>')
                    .addClass('name')
                    .text(`Name: "${data.name}" || ID#: ${data.id}`);
                $('.name-imgs').append($nameIdH3);

                // creating the img carousel portion of the page
                const $divImgs = $('<div>')
                    .addClass('img-carousel');
                $('.name-imgs').append($divImgs);

                const $imgs = $('<img>')
                    .attr({ 'src': data.sprites.front_default, 'alt': `Picture of ${data.name}` });
                $('.img-carousel').append($imgs);

                // creating the stats section

            },
            () => {
                console.log('bad request');
            }
        )











    }) // pokemon submit button event listener closing





}) // window on load closing