$(function(){
	$("#GenBtn").click(function(){
		$("#temp").html(GenIDNumber());
	});
});

const modulus = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
const lastest = ['1','0','X','9','8','7','6','5','4','3','2'];
function GenVerifyCode(fwd17){
	let summary = 0;
	for (let i = 0;i < 17;i++) {
		summary += parseInt(fwd17[i]) * modulus[i];
	}
	return lastest[summary % 11];
}

let RandInt =  (min,max) => parseInt(Math.random() * (max - min + 1),10);
let isOdd = num => (num % 2 == 1) ? true : false;
function GenOrderCode(male){
	let num = 0;
	while (male ^ isOdd(num = RandInt(1,999)));
	
	let str = num.toString();
	if (num < 100){
		str = '0' + str;
	}else if (num < 10){
		str = '0' + str;
	}
	return str;
}

function GenIDNumber(){
	let area = $("#CountySelector").val();
	let birthday = $("#YearSelector").val() + $("#MonthSelector").val() + $("#DaySelector").val();
	let order = GenOrderCode($("#SexSelector").val() === "Male");
	let verify = GenVerifyCode(area + birthday + order);
	return area + birthday + order + verify;
}