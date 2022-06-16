/* Поиск */

const array = [
    'kaspersky', '1C', 'AliveColors', 'Parther', 'AMS', 'Astra Linux', 'Base', 'Communigate', 'Масштаб', 'item9', 'item10', 'item11', 'item12', 'item13', 'item14', 'item15', 'item16', 'item17', 'item18', 'item19', 'item20', 'item21', 'item22', 'item23', 'item24', 'item25', 'item26', 'item27', 'item28',
];

const btn = $('.search__btn');

let value = new RegExp($('.search___input').val())

$(array).each(function (i, e) {

    if (value.test(e)) {
        $('.items').append('<div class="item">' + e + '</div>')
    }
})

btn.on('click', function () {

    let value = new RegExp($('.search__input').val())

    $('.item').remove()

    $(array).each(function (i, e) {

        if (value.test(e)) {
            $('.items').append('<div class="item">' + e + '</div>')
        }
    })
})

/* // Поиск */

/* Фильтр */

const myData = data.slice(0, 79);

const copy = [...myData]

render(copy)

function filterOr(oldList, item) {

    return oldList.filter(function (value) {
        let group = $(item).data('group')
        let param = $(item).data('param')

        if (value[group].includes(param)) {
            return value;
        }
    });
}

function filterAnd(list1, list2) {

    return list1.filter(function (item) {
        return list2.includes(item)
    });
}

function render(list) {
    $('.vendors-list__item').remove()

    list.forEach(function (vendor) {

        let vendorName = ''

        // if (vendorName === )

        let currentVendor = list.filter(function (item) {
            return item['Вендор'] === vendor['Вендор']
        })

        // console.log(currentVendor)

        $('.vendors-list').append('<div class="vendors-list__item">' +
            '<div class="vendors-list__title"> ' +
            '<b>'+ vendor['Вендор'] +'</b> ' +
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> ' +
            '<path d="M12.0001 14.1549L17.2442 8.91081C17.5696 8.58537 18.0972 8.58537 18.4227 8.91081C18.7481 9.23624 18.7481 9.76388 18.4227 10.0893L12.884 15.628C12.3958 16.1162 11.6044 16.1162 11.1162 15.628L5.57749 10.0893C5.25206 9.76388 5.25206 9.23624 5.57749 8.91081C5.90293 8.58537 6.43057 8.58537 6.756 8.91081L12.0001 14.1549Z" fill="#7E97A6"/> ' +
            '</svg> ' +
            '</div> ' +
            '<div class="vendors-list__body"> ' +
            '<ul class="products-list">' +
            '<li>hello</li>' +
            '</ul> ' +
            '</div> ' +
            '</div>')
    })

    if (list.length < 1) {
        render(copy)
    }
}

$('input').on('change', function () {

    let finishList = []

    $('.widget').each(function () {
        let array = []

        let widgetList = []

        let inputs = $(this).find('input:checked')

        inputs.each(function (i, item) {

            let newList = filterOr(copy, item)

            widgetList = widgetList.concat(newList)

            array = [...new Set(widgetList)]

            // console.log(array)
        })

        console.log('------------------')

        console.log(array)

        if (array.length > 0)
        finishList = filterAnd(finishList, array)
        else finishList = array

    })

    console.log('---- finish ----------')

    console.log(finishList)

    render(finishList)
})

$('.btn-reset').on('click', function () {
    render(copy)
})


/* // Фильтр */

$('.vendors-list__title').on('click', function () {
    $(this).closest($('.vendors-list__item')).toggleClass('vendors-list__item--opened')
})

$('.widget__title').on('click', function () {
    $(this).closest($('.widget')).toggleClass('widget--opened');
})

$('.show-more').on('click', function () {
    let height = $('.items').outerHeight()
    $('.items').css('max-height', height + 465 + 'px')
})

