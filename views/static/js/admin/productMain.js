function ajax(url, input_data, gubun, method) {
    $.ajax(url, {
        type: method,
        data: input_data,
        async: false,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: 'json',
        success: function (data, status, xhr) {
            if (gubun == 'selectProductList') {
                selectProductListCallback(data.ret);
            }
        },
        error: function (jqXhr, textStatus, errorMessage) {}
    });
}

$(document).ready(function() {
    $('.new-product-btn').click(function() {
       location.href = '/admin/productNew';
    });

    selectProductList();
});

function selectProductList() {
    let input = {};
    ajax('/admin/selectProductList', input, 'selectProductList', 'POST');
}

function selectProductListCallback(ret) {
    let html = '';
    for (let i = 0; i < ret.length; ++i) {
        html += '<tr><td class="text-center item-no">' + ret[i].ITEM_NO +'</td>';
        html += '<td class="text-center"><img src = "' + ret[i].IMAGE_PATH + '" alt="" width="80px" class="img-fluid z-depth-0"></td>';
        html += '<td class="text-center">' + ret[i].ITEM_NM_1 + '</td>';
        html += '<td class="text-center">' + ret[i].ITEM_NM_2+ '</td>';
        html += '<td class="text-center">' + ret[i].PRICE + '</td>';
        html += '<td class="text-center"><button type="button" id="modify_product" class="btn btn-sm btn-primary btn-rounded modify-product">변경</td></tr>';
    }
    $('.product-table tbody').append(html);

    $('.modify-product').click(function() {
        let itemNo = $($($(this).parent().parent()).find('.item-no')).text();
        location.href = '/admin/productModification?itemNo=' + itemNo
    });

}
