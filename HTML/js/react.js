$(function(){
	$.getJSON("json/areaList.json",function(areas,status,xhr){
		$.each(areas["areaList"],function(key,value){
			$("#ProvinceSelector").append($("<option value=" + value + ">" + value + "</option>"));
		});
		loadCity($("#ProvinceSelector").val());
	});
	
	loadYears();
	loadDays($("#YearSelector").val());
	
	$("#ProvinceSelector").blur(function(){
		$("#CitySelector > option").remove();
		$("#CountySelector > option").remove();
		loadCity($("#ProvinceSelector").val());
	});
	
	$("#CitySelector").blur(function(){
		$("#CountySelector > option").remove();
		loadCounty($("#CitySelector").val());
	});
	
	$("#MonthSelector").blur(function(){
		$("#DaySelector > option").remove();
		loadDays($("#YearSelector").val());
	});
});

let areaNow;
function loadCity(areaName){
	$.getJSON("json/" + areaName + ".json",function(areas,status,xhr){
		areaNow = areas;
		$.each(areas,function(key,value){
			$("#CitySelector").append($("<option value=" + key + ">" + key + "</option>"));
		});
	});
}

function loadCounty(areaName){
	$.each(areaNow[areaName],function(key,value){
		$("#CountySelector").append($("<option value=" + value + ">" + key + "</option>"));
	});
}

function loadYears(){
	let d = new Date();
	for (let i = d.getFullYear();i > (d.getFullYear() - 101);i--) {
		$("#YearSelector").append($("<option value=" + i + ">" + i + "</option>"));
	}
}

const days = {
	1:31,
	3:31,
	4:30,
	5:31,
	6:30,
	7:31,
	8:31,
	9:30,
	10:31,
	11:30,
	12:31
};
function loadDays(year){
	let period = 0;
	if ($("#MonthSelector").val() == 2) {
		if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
			period = 29;
		} else{
			period = 28;
		}
	} else{
		period = days[parseInt($("#MonthSelector").val())];
	}
	
	for (let i = 1;i <= period;i++) {
		$("#DaySelector").append($("<option value=" + (i<10 ? '0'+i : i) + ">" + i + "</option>"));
	}
}
