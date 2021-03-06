function ajax(url, inputData, gubun, method) {
    $.ajax(url, {
        type: method,
        data: inputData,
        async: false,
        xhrFields: { withCredentials: true },
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: 'json',
        success: function (data, status, xhr) {
            if (gubun == 'login') {
                loginCallback(data.ret);
            }
        },
        error: function (jqXhr, textStatus, errorMessage) {}
    });
}

$(document).ready(function() {
    $('#login').click(function() {
        login();
    });

    $('#sign_up').click(function() {
        sign_up();
    });

    $("#telno").keydown(function(key) {
        if (key.keyCode == 13) {
            login();
        }
    });

    $("#password").keydown(function(key) {
        if (key.keyCode == 13) {
            login();
        }
    });

    $('#get_password').click(function() {
        location.href = '/user/get_password'
    });
});

function sign_up() {
    location.href = '/user/sign_up'
}

function login() {
    let telno = $('#telno').val();
    let password = $('#password').val();
    let inputData = {
        telno: telno,
        password: sha256(password)
    };
    ajax('/user/login', inputData, 'login', 'POST');
}

function loginCallback(ret) {
    if (ret == 'not ok') {
        alert('로그인 정보가 정확하지 않습니다.');
        return;
    }
    let gubun = $('#gubun').val();
    if (gubun == 'purchase') {
        let p = JSON.parse($('#param').val());
        let param = '';
        if (isNull(p.items)) {
            param += 'itemNo=' + encodeURIComponent(p.itemNo);
            param += '&optionNo=' + encodeURIComponent(p.optionNo);
            param += '&optionNm=' + encodeURIComponent(p.optionNm);
            param += '&imagePath=' + encodeURIComponent(p.imagePath);
            param += '&itemNm=' + encodeURIComponent(p.itemNm);
            param += '&keepingMethod=' + encodeURIComponent(p.keepingMethod);
            param += '&itemPrice=' + encodeURIComponent(p.itemPrice);
            param += '&shippingFee=' + encodeURIComponent(p.shippingFee);
            param += '&itemPriceNum=' + encodeURIComponent(p.itemPriceNum);
            param += '&shippingFeeNum=' + encodeURIComponent(p.shippingFeeNum);
            param += '&qty=' + encodeURIComponent(p.qty);
        } else {
            param += 'items=' + encodeURIComponent(p.items);
        }
        location.href = '/purchase?' + param;
    } else {
        location.href = '/';
    }
}
