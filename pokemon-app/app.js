$(() => {

    // pokemon info button click event
    $('.btn').on('click', (event) => {

        event.preventDefault();

        let $grabPokemon = $('.input-value').val();

        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${$grabPokemon}`,
            type: "GET",
        }).then(
            (data) => {
                console.log(data);
            },
            () => {
                console.log('bad request');
            }
        )











    }) // pokemon submit button event listener closing





}) // window on load closing