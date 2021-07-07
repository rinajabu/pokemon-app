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

        // grabbing value from input box
        let $grabPokemon = $('.input-value').val();
        const $container = $('.container');

        // ajax query by pokemon name or ID#
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${$grabPokemon}`,
            type: "GET",
        }).then(
            (data) => {
                // console.log(data.types[0].type.name);
                // console.log(data.moves.length);

                // creating the name / ID# portion of page //
                const $nameIdH3 = $('<h3>')
                    .addClass('name')
                    .text(`Name: "${data.name}" || ID#: ${data.id}`);
                $('.name-imgs').append($nameIdH3);

                // creating the img carousel portion of the page //
                const $divImgs = $('<div>')
                    .addClass('img-carousel');
                $('.name-imgs').append($divImgs);

                const $imgs = $('<img>')
                    .attr({ 'src': data.sprites.front_default, 'alt': `Picture of ${data.name}` });
                $('.img-carousel').append($imgs);

                // creating the stats section //
                // height and weight
                $('.height')
                    .text(`Height: ${data.height}`);
                $('.weight')
                    .text(`Weight: ${data.weight}`);

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
                    .text('Moves List');
                const $movesUl = $('<ul>')
                    .addClass('move-ul');
                $moveList.append($movesUl);

                for (let i = 0; i < data.moves.length; i++) {
                    // console.log(data.moves[i].move.name);
                    const $movesListLi = $('<li>')
                        .text(`${data.moves[i].move.name}`);
                    $movesUl.append($movesListLi);
                }

                // type list //
                // looping through to get all the pokemon types
                const $typeDiv = $('.type')
                    .text(`Type/Types`);
                const $typeUl = $('<ul>')
                    .addClass('type-ul');
                $typeDiv.append($typeUl);
                for (let i = 0; i < data.types.length; i++) {
                    // console.log(data.types[i].type.name);
                    const $typeLi = $('<li>')
                        .text(data.types[i].type.name);
                    $typeUl.append($typeLi);
                }


            },
            () => {
                console.log('bad request');
            }
        )











    }) // pokemon submit button event listener closing





}) // window on load closing