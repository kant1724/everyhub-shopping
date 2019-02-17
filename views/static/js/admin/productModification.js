function ajax(url, input_data, gubun, method) {
    $.ajax(url, {
        type: method,
        data: input_data,
        async: false,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: 'json',
        success: function (data, status, xhr) {
            if (gubun == 'modifyProduct') {
                modifyProductCallback(data.ret);
            }
        },
        error: function (jqXhr, textStatus, errorMessage) {}
    });
}

function fileUpload(url, input_data, gubun, method) {
    $.ajax(url, {
        type: method,
        data: input_data,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        async: true,
        success: function (data, status, xhr) {
            if (gubun == 'uploadImage') {
                uploadImageCallback();
            }
        },
        error: function (jqXhr, textStatus, errorMessage) {}
    });
}

$(document).ready(function() {
    $('.file_upload').file_upload();
    $('select').materialSelect();

    $('#product_modify_btn').click(function() {
        modifyProduct();
    });

    $('#item_image').change(function() {
        let file = this.files[0];
        let reader = new FileReader();
        reader.onloadend = function () {
            $('#image_div').css('background-image', 'url("' + reader.result + '")');
        }
        if (file) {
            reader.readAsDataURL(file);
        } else {}
    });

    //$('#image_div').css('background-image', 'url("http://14.63.168.58:5006/static/data/shopping/product/26.jpg")');
});

let remoteUrl = '14.63.168.58:5006';

function modifyProduct() {
    let itemNo = $('#item_no').val();
    let itemNm1 = $('#item_nm_1').val();
    let itemNm2 = $('#item_nm_2').val();
    let price = $('#price').val();
    let itemKcd = $('#item_kcd').val();
    let originCd = $('#origin_cd').val();
    let itemDesc = $('#item_desc').val();

    let input = {
        'itemNo' : itemNo,
        'itemNm1' : itemNm1,
        'itemNm2' : itemNm2,
        'price' : price,
        'itemKcd' : itemKcd,
        'originCd' : originCd,
        'itemDesc' : itemDesc,
        'remoteUrl' : remoteUrl
    }

    ajax('/admin/productNew/modifyProduct', input, 'modifyProduct', 'POST');
}

function modifyProductCallback(ret) {
    let formData = new FormData();
    formData.append(ret, $("#item_image")[0].files[0]);
    fileUpload('http://' + remoteUrl + '/upload_image_from_shopping_1', formData, 'uploadImage', 'POST');
}

function uploadImageCallback() {
    alert("상품이 등록되었습니다.");
}