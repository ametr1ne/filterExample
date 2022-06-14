/* Поиск */

const array = [
    'kaspersky', '1C', 'AliveColors', 'Parther', 'AMS', 'Astra Linux', 'Base', 'Communigate', 'Масштаб', 'item9', 'item10', 'item11', 'item12', 'item13', 'item14', 'item15', 'item16', 'item17', 'item18', 'item19', 'item20', 'item21', 'item22', 'item23', 'item24', 'item25', 'item26', 'item27', 'item28',
];

const btn = $('.btn');

let value = new RegExp($('.input').val())

$(array).each(function (i, e) {

    if (value.test(e)) {
        $('.items').append('<p class="item">' + e + '</p>')
    }
})

btn.on('click', function () {

    let value = new RegExp($('.input').val())

    $('.item').remove()

    $(array).each(function (i, e) {

        if (value.test(e)) {
            $('.items').append('<p class="item">' + e + '</p>')
        }
    })
})

/* // Поиск */

/* Фильтр */

let bigString = [{}];
let index = 0;
let count = 0;

$('input').on('change', function () {

    if ($(this).is(':checked')) {

        let dataGroup = $(this).data('group')

        bigString[index][dataGroup] = $(this).data('param')

        console.log(bigString[index])

    }

    $('.list-item').hide()
    $(bigString).show()

})

$('.btn-reset').on('click', function () {
    $('.list-item').show()
})


function filtering() {

}


// var heroes = [
//     {name: "Batman", franchise: "DC"},
//     {name: "Ironman", franchise: "Marvel"},
//     {name: "Thor", franchise: "Marvel"},
//     {name: "Superman", franchise: "DC"}
// ];
//
// var marvelHeroes = heroes.filter(function (hero) {
//     return hero.franchise == "Marvel" || hero.franchise == "DC";
// });
//
// console.log(marvelHeroes)


/* // Фильтр */

