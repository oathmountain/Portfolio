$(document).ready(function(){	
	$(window).resize(function(){
		if($(".content").length > 0 || $(".contentHigh").length > 0){
			calculateContent();
		}
	});
	
	if($(".slideshow img").length < 2){
		checkImages();
	}else{
		$(".slideshow").css({"height":"300px", "width":"400px"});
		$(".slideshow img").css({"width":"100%","height":"100%"});
		imageCount = $(".slideshow img").length;
		//$("#log").append("<p>"+imageCount+"</p>");
		slideShow();
		setInterval(function(){slideShow();},3000);
	}
	$(".content").delay(1000);//.function(){
		if($(".content").length > 0 || $(".contentHigh").length > 0){
			calculateContent();
		}
	//}
});
var imageCount;
var currentCount = 1;

function calculateContent(){
	var totalHeight = 0;
	if($(".content").length > 0){
		$(".content").each(function(){
			totalHeight = 0;
			$(this).children().each(function(){
				if(totalHeight < $(this).outerHeight(true)){
					totalHeight = $(this).outerHeight(true);
				}
			});
			totalHeight = totalHeight + $(".contentheader").outerHeight(true);
			$(this).css("height", totalHeight);
		});
	}else{
		$(".contentHigh").each(function(){
			$(this).children().each(function(){
				totalHeight = totalHeight + $(this).outerHeight(true);
			});
			$(this).css("height", totalHeight);
		});
	}
	totalHeight = 0;
	
	$("#section2content").children().each(function(){
		totalHeight = totalHeight + $(this).outerHeight(true);
	});
	if(totalHeight > ($("body").height()-200)){
		$("body").css("height", (totalHeight+200+"px"));
	}
	//$("#log").append("<p>"+$("body").css("height")+"</p>");
}

function checkImages(){
	if($(".slideshow img").length == 1){
		var src = $(".slideshow img").get(0).src;
		if(src=="https://people.dsv.su.se/~jied4107/bild.jpg"){
			$(".slideshow").css({"height":"400px", "width":"250px"});
			$(".slideshow img").css({"width":"100%","height":"100%"});
		}
		else if(src=="https://people.dsv.su.se/~jied4107/levels.jpg"){
			$(".slideshow").css({"height":"300px", "width":"400px"});
			$(".slideshow img").css({"width":"100%","height":"100%"});		
		}
	}
}
function slideShow(){
	//$("#log").append("<p>"+currentCount+"</p>");
	$(".slideshow img").hide();
	$(".slideshow img:nth-child("+currentCount+")").show();
	currentCount++;
	if(currentCount == imageCount){
		currentCount = 1;
	}
}