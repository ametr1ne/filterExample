/* Поиск */

const array = [
    'kaspersky', '1C', 'AliveColors', 'Parther', 'AMS', 'Astra Linux', 'Base', 'Communigate', 'Масштаб', 'item9', 'item10', 'item11', 'item12', 'item13', 'item14', 'item15', 'item16', 'item17', 'item18', 'item19', 'item20', 'item21', 'item22', 'item23', 'item24', 'item25', 'item26', 'item27', 'item28',
];

const btn = $('.search__btn');

let value = new RegExp($('.search___input').val())

$(array).each(function (i, e) {

    if (value.test(e)) {
        $('.items').append('<div class="item"><div class="logo"><img src="kas.png" alt="logo">' +
            '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '<path d="M14 9.50268C14.5523 9.50268 15 9.9504 15 10.5027V13.5027C15 14.3311 14.3284 15.0027 13.5 15.0027H2.5C1.67157 15.0027 1 14.3311 1 13.5027V2.50268C1 1.67425 1.67157 1.00268 2.5 1.00268H5.5C6.05228 1.00268 6.5 1.45039 6.5 2.00268C6.5 2.55496 6.05228 3.00268 5.5 3.00268H3V13.0027H13V10.5027C13 9.9504 13.4477 9.50268 14 9.50268ZM12.3 2.78682V2.46345L11.1503 2.77775C10.6125 2.92477 10.0575 2.99926 9.5 2.99926C8.9 2.99926 8.5 2.55155 8.5 1.99817C8.5 1.44588 8.94772 0.998169 9.5 0.998169H14C14.5523 0.998169 15 1.44588 15 1.99817V6.50268C15 7.05496 14.5523 7.50268 14 7.50268C13.4477 7.50268 13 7.09994 13 6.50268C13 5.94336 13.0747 5.38654 13.222 4.84698L13.5353 3.69994H13.2144L12.1366 5.13683C11.8524 5.51581 11.5415 5.87411 11.2065 6.20903L7.70697 9.70719C7.31637 10.0976 6.6832 10.0975 6.29276 9.70691C5.90231 9.31631 5.90243 8.68315 6.29303 8.2927L9.79386 4.79324C10.1265 4.46076 10.4821 4.15217 10.8581 3.86975L12.3 2.78682Z" fill="#7E97A6"/>\n' +
            '</svg>' +
            '</div><p>' + e + '</p></div>')
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

    let vendorsList = []

    list.forEach(function (item) {
        if (vendorsList[item['Вендор']] === undefined)
        vendorsList[item['Вендор']] = []
        vendorsList[item['Вендор']].push(item['Продукт'])
    })

    for(const [key, value] of Object.entries(vendorsList)) {
        let elem = ''

        value.forEach(function(item) {
            elem += "<li><a>"+item+"</a></li>"
        })

        $('.vendors-list').append('<div class="vendors-list__item">' +
            '<div class="vendors-list__title"> ' +
            '<b>' + key + '</b> ' +
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> ' +
            '<path d="M12.0001 14.1549L17.2442 8.91081C17.5696 8.58537 18.0972 8.58537 18.4227 8.91081C18.7481 9.23624 18.7481 9.76388 18.4227 10.0893L12.884 15.628C12.3958 16.1162 11.6044 16.1162 11.1162 15.628L5.57749 10.0893C5.25206 9.76388 5.25206 9.23624 5.57749 8.91081C5.90293 8.58537 6.43057 8.58537 6.756 8.91081L12.0001 14.1549Z" fill="#7E97A6"/> ' +
            '</svg> ' +
            '</div> ' +
            '<div class="vendors-list__body"> ' +
            '<ul class="products-list">' +
            elem +
            '</ul> ' +
            '</div> ' +
            '</div>')
    }

    $('.vendors-list__title').on('click', function () {
        $(this).closest('.vendors-list__item').toggleClass('vendors-list__item--opened')
    })
}

$('input').on('change', function () {

    let checkedInputCount = 0;

    let filteredList = []

    $('.widget').each(function () {

        let widgetList = []

        let inputs = $(this).find('input:checked')

        inputs.each(function (i, item) {

            checkedInputCount += 1;

            let newList = filterOr(copy, item)

            widgetList = widgetList.concat(newList)

            widgetList = [...new Set(widgetList)]
        })

        if (widgetList.length > 0)
            filteredList.push(widgetList)
    })

    let newList = []

    if (filteredList.length > 1) {
        filteredList.forEach(function (value, index) {
            if (index > 0) {
                filteredList[index - 1] = filterAnd(filteredList[index - 1], value)
            }

            if (filteredList.length - 1 === index) {
                newList = filteredList[index - 1]
            }
        })
    } else {
        if (checkedInputCount === 0) {
            newList = copy
        } else {
            newList = filteredList[0]
        }
    }

    // console.log('---- finish ----------')

    render(newList)
})

$('.btn-reset').on('click', function () {
    render(copy)
})

/* // Фильтр */

$('.widget__title').on('click', function () {
    $(this).closest($('.widget')).toggleClass('widget--opened');
})

$('.show-more').on('click', function () {
    let height = $('.items').outerHeight()
    $('.items').css('max-height', height + 465 + 'px')
})

