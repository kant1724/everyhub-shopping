function ajax(url, inputData, gubun, method) {
	$.ajax(url, {
		type: method,
		data: inputData,
		async: false,
		xhrFields: { withCredentials: true },
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		dataType: 'json',
		success: function (data, status, xhr) {
			if (gubun == 'selectSellerInfo') {
				selectSellerInfoCallback(data.ret);
			}
		},
		error: function (jqXhr, textStatus, errorMessage) {}
	});
}

selectSellerInfo();
function selectSellerInfo() {
	let inputData = {
		sellerNo: 1
	};
	ajax(serverUrl + '/user/selectSellerInfo', inputData, 'selectSellerInfo', 'POST');
}

function selectSellerInfoCallback(ret) {
	let footerHtml = '<div class="container py-2 mt-5 mb-4 text-center">';
	footerHtml += '<div class="mt-3">';
	footerHtml += '<p>신선한 과일만을 취급하는 간드락농원 입니다.</p>';
	footerHtml += '</div>';
	footerHtml += '<div class="mt-3">';
	footerHtml += '<div style="text-decoration: underline;" class="d-inline-block">이용약관</div>';
	footerHtml += '<div style="text-decoration: underline;" class="ml-2 d-inline-block">개인정보처리방침</div>';
	footerHtml += '</div>';
	footerHtml += '<div class="mt-3">';
	footerHtml += '<div class="mt-2"><i class="fa fa-home mr-3"></i><span id="seller_address">' + ret[0].address + '</span></div>';
	footerHtml += '<div class="mt-2"><i class="fa fa-envelope mr-3"></i><span id="seller_email">' + ret[0].email + '</span></div>';
	footerHtml += '<div class="mt-2"><i class="fa fa-phone mr-3"></i><span id="seller_telno">' + ret[0].telno + '</span></div>';
	footerHtml += '<div class="mt-2"><span id="seller_acno"></span>' + ret[0].acno + '</div>';
	footerHtml += '<div class="mt-2"><span id="seller_deposit_person_nm">' + ret[0].depositPersonNm + '</span></div>';
	footerHtml += '<div class="ml-2 mt-2">통신판매업: <span id="mailOrderNo">' + ret[0].mailOrderNo + '</span></div>';
	footerHtml += '<div class="ml-2 mt-2">사업자번호: <span id="companyRegistrationNo">' + ret[0].companyRegistrationNo+ '</span></div>';
	footerHtml += '</div>';
	footerHtml += '</div>';
	footerHtml += '<div class="footer-copyright py-3 text-center">';
	footerHtml += '<div class="container-fluid">';
	footerHtml += '© 2019 Copyright: Everyhub</a>';
	footerHtml += '</div>';
	footerHtml += '</div>';

	$('footer').append(footerHtml);
}



