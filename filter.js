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

    if (list.length === 0) {
        $('.vendors-list').append('<p class="empty-vendors">Настройте фильтры</p>')
        return
    }

    $('.empty-vendors').remove()

    let vendorsList = []

    list.forEach(function (item) {
        if (vendorsList[item['Вендор']] === undefined)
        vendorsList[item['Вендор']] = []
        let product = []
        product.name = item['Продукт']
        product.link = item['Ссылка на продукт']
        vendorsList[item['Вендор']].push(product)
    })

    console.log(vendorsList)

    for(const [key, value] of Object.entries(vendorsList)) {
        let elem = ''

        value.forEach(function(item) {
            elem += "<li><a href="+ item.link +">"+item.name+"</a></li>"
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

    render(newList)
})

$('.btn-reset').on('click', function () {
    render(copy)
})

/* // Фильтр */

$('.widget__title').on('click', function () {
    $(this).closest($('.widget')).toggleClass('widget--opened');
})

$('.show-filter-btn').on('click', function () {
    $('.filter').addClass('filter--open')
})
$('.hide-filter-btn').on('click', function (e) {
    e.preventDefault()
    $('.filter').removeClass('filter--open')
})



