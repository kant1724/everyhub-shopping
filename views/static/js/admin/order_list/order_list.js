function ajax(url, inputData, gubun, method) {
    $.ajax(url, {
        type: method,
        data: inputData,
        async: false,
        xhrFields: { withCredentials: true },
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: 'json',
        success: function (data, status, xhr) {
            if (gubun == 'selectOrderListMain') {
                selectOrderListMainCallback(data.ret);
            } else if (gubun == 'updateDepositConfirmDate') {
                updateDepositConfirmDateCallback();
            } else if (gubun == 'updateDlvrConfirmDate') {
                updateDlvrConfirmDateCallback();
            }
        },
        error: function (jqXhr, textStatus, errorMessage) {}
    });
}

$(document).ready(function() {
    $('#search').click(function() {
        selectOrderListMain();
    });
    datepicker.init();
    selectOrderListMain();
});

function selectOrderListMain() {
    let inputData = {
        startOrderDate: $('#startingDate').val(),
        endOrderDate: $('#endingDate').val()
    };
    ajax(serverUrl + '/admin/order_list/selectOrderListMain', inputData, 'selectOrderListMain', 'POST');
}

function selectOrderListMainCallback(ret) {
    let html = '';
    $('#order_list_tbody').empty();
    let rowspan = {};
    for (let i = 0; i < ret.length; ++i) {
        let key = ret[i].orderNo;
        if (rowspan[key] != null) {
            rowspan[key] += 1
        } else {
            rowspan[key] = 1;
        }
    }
    let prevOrderNo = -1;
    for (let i = 0; i < ret.length; ++i) {
        let orderNo = ret[i].orderNo;
        let orderDate = ret[i].orderDate;
        let orderPersonNm = ret[i].orderPersonNm;
        let orderTelno = ret[i].orderTelno;
        let itemNm1 = ret[i].itemNm1;
        let qty = ret[i].qty;
        let depositConfirmDate = ret[i].depositConfirmDate;
        let dlvrConfirmDate = ret[i].dlvrConfirmDate;
        if (depositConfirmDate == null || depositConfirmDate == '') {
            depositConfirmDate = '<a class="confirm-deposit-btn common-button-1">입금확인</a>';
        }
        if (dlvrConfirmDate == null || dlvrConfirmDate == '') {
            dlvrConfirmDate = '<a class="confirm-dlvr-btn common-button-1">배송완료</a>';
        }
        if (orderNo != prevOrderNo) {
            let rs = rowspan[orderNo];
            html += '<tr style="margin-bottom: 0px;">';
            let pt = '15px';
            html += '<td rowspan="' + rs + '" style="vertical-align: middle; padding-top: ' + pt + ';">';
            html += '<div id="order_no" class="order-no">' + orderNo + '</div>';
            html += '</td>';
            html += '<td rowspan="' + rs + '" style="vertical-align: middle; padding-top: ' + pt + ';">';
            html += '<div id="order_date" class="oreder-date">' + orderDate + '</div>';
            html += '</td>';
            html += '<td rowspan="' + rs + '" style="vertical-align: middle; padding-top: ' + pt + '">';
            html += '<div id="order_person_nm" class="order-person-nm">' + orderPersonNm + '</div>';
            html += '</td>';
            html += '<td rowspan="' + rs + '" style="vertical-align: middle; padding-top: ' + pt + '">';
            html += '<div id="order_telno" class="order-telno">' + orderTelno + '</div>';
            html += '</td>';
            html += '<td rowspan="' + rs + '" style="vertical-align: middle; padding-top: ' + pt + '">';
            html += '<div id="deposit_confirm_date" class="deposit-confirm-date">' + depositConfirmDate + '</div>';
            html += '</td>';
            html += '<td rowspan="' + rs + '" style="vertical-align: middle; padding-top: ' + pt + '">';
            html += '<div id="dlvr_confirm_date" class="dlvr-confirm-date">' + dlvrConfirmDate + '</div>';
            html += '</td>';
            html += '<td>';
            html += '<div id="item_nm_1" class="item-nm-1">' + itemNm1 + '</div>';
            html += '</td>';
            html += '<td>';
            html += '<div id="qty" class="qty">' + qty + '</div>';
            html += '</td>';
            html += '</tr>';
        } else {
            html += '<tr>';
            html += '<td>';
            html += '<div id="item_nm_1" class="item-nm-1">' + itemNm1 + '</div>';
            html += '</td>';
            html += '<td>';
            html += '<div id="qty" class="qty">' + qty + '</div>';
            html += '</td>';
            html += '</tr>';
        }
        prevOrderNo = orderNo;
    }
    $('#order_list_tbody').append(html);

    $('.confirm-deposit-btn').unbind();
    $('.confirm-deposit-btn').click(function() {
        let orderNo = $(this).parent().parent().parent().find('#order_no').text();
        updateDepositConfirmDate(orderNo);
    });
    $('.confirm-dlvr-btn').unbind();
    $('.confirm-dlvr-btn').click(function() {
        let orderNo = $(this).parent().parent().parent().find('#order_no').text();
        updateDlvrConfirmDate(orderNo);
    });
}

function updateDepositConfirmDate(orderNo) {
    let inputData = {
        orderNo: orderNo
    };
    ajax(serverUrl + '/admin/order_list/updateDepositConfirmDate', inputData, 'updateDepositConfirmDate', 'POST');
}

function updateDlvrConfirmDate(orderNo) {
    let inputData = {
        orderNo: orderNo
    };
    ajax(serverUrl + '/admin/order_list/updateDlvrConfirmDate', inputData, 'updateDlvrConfirmDate', 'POST');
}

function updateDepositConfirmDateCallback() {
    alert('입금확인 처리되었습니다.');
    selectOrderListMain();
}

function updateDlvrConfirmDateCallback() {
    alert('배송완료 처리되었습니다.');
    selectOrderListMain();
}