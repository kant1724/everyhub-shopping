function ajax(url, inputData, gubun, method) {
    $.ajax(url, {
        type: method,
        data: inputData,
        async: false,
        xhrFields: { withCredentials: true },
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
       location.href = '/admin/product_manager/product_new';
    });

    selectProductList();
});

function selectProductList() {
    let inputData = {};
    ajax(serverUrl + '/admin/product_manager/selectProductList', inputData, 'selectProductList', 'POST');
}

function selectProductListCallback(ret) {
    let html = '';
    for (let i = 0; i < ret.length; ++i) {
        html += '<tr><td class="text-center item-no">' + ret[i].itemNo +'</td>';
        html += '<td class="text-center"><img src = "' + ret[i].imagePath+ '" alt="" width="80px" class="img-fluid z-depth-0"></td>';
        html += '<td class="text-center">' + ret[i].itemNm1 + '</td>';
        html += '<td class="text-center">' + ret[i].itemNm2 + '</td>';
        html += '<td class="text-center">' + ret[i].itemQty + '과</td>';
        html += '<td class="text-center">' + ret[i].itemKg + 'KG</td>';
        html += '<td class="text-center">' + ret[i].itemPrice + '</td>';
        html += '<td class="text-center"><button type="button" id="modify_product" class="btn btn-sm btn-primary btn-rounded modify-product">변경</td></tr>';
    }
    $('.product-table tbody').append(html);

    $('.modify-product').click(function() {
        let itemNo = $(this).parent().parent().find('.item-no').text();
        location.href = '/admin/product_manager/product_modify?itemNo=' + itemNo;
    });
}