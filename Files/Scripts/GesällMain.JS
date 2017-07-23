$(document).ready(function(){
	$("#log").hide();//comment away to enable log
	$("#section1").hide();//comment away to enable section 1
	sec1Hidden = localStorage.getItem("hidden");
	$(window).resize(function(){
		calculateNav();
	});
	$(".sec1HideButton").click(function(){
		if(sec1Hidden){			
			$("#section1").animate({left: '0px'},{duration: 300, easing: "linear"});
			sec1Hidden=false;
			setArrow();
			localStorage.setItem("hidden", false);
		}else{
			$("#section1").animate({left: '-190px'},{duration: 300, easing: "linear"});
			sec1Hidden=true;
			setArrow();
			localStorage.setItem("hidden", true);
		}
		
	});
	$("#TopNavUl > ul > li").mousedown(function(){
		$(this).css("margin-top","3px");
	});
	$("#TopNavUl > ul > li").mouseup(function(){
		$(this).css("margin-top","2px");
	});
	$(".dropdown").hover(function(){
		$(this).children(".sub-menu").slideDown(200,stop());
	},
	function(){
		$(this).children(".sub-menu").slideUp(200,stop());
	});
	initiatePage();	
	if(sec1Hidden == "true"){
		$("#section1").animate({left: '-190px'},{duration: 0, easing: "linear"});
		sec1Hidden = true;
		setArrow();
	}else{
		$("#section1").animate({left: '0px'},{duration: 0, easing: "linear"});
		sec1Hidden = false;
		setArrow();
	}
});
//Text variables
var text;
var font;
var textW;

//Navigation variables
var pad;
var count;

//section1 variables
var sec1Hidden = false;

function setArrow(){
	if(!sec1Hidden){
		$(".sec1HideButton img").css("clip-path", "inset(0px 10px 10px 0px)");
		$(".sec1HideButton img").css("left", "190px");
	}else{
		$(".sec1HideButton img").css("clip-path", "inset(0px 0px 10px 10px)");
		$(".sec1HideButton img").css("left", "180px");
	}
}
//Everything that needs to calculate on load
function initiatePage(){
	calculateNav();
}

function calculateNav(){
	text = $(".mainnav > a").text();
	font = $(".mainnav > a").css("font");
	count = $(".mainnav").length;
	
	calculateTextWidth();
	setNavW();
	calculateNavPadding();
	setNavPadding();
	
	text=$(".sub-menu > li > a").text();
	font=$(".sub-menu > li > a").css("font");
	calculateTextWidth();
	$(".sub-menu").css("width", (textW+15+"px"));
}

function calculateTextWidth(){
	var div = $("#widthcalcdiv");
	div.append(text);
	div.css("font",font);
	textW = div.width();
	div.empty();
}

function setNavW(){
	$("#TopNavUl > ul").css("min-width",((textW+count*4)+"px"));
	$("header").css("min-width",((textW+count*8)+"px"));	
	
}
function calculateNavPadding(){
	var wdh = $("#TopNavUl > ul").width();
	pad = ((wdh-textW-20) / count)/2;
}
function setNavPadding(){
	$(".mainnav > a").css("padding-left",(pad+"px"));
	$(".mainnav > a").css("padding-right",(pad+"px"));
}

