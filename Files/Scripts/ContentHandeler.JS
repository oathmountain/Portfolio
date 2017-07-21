$(document).ready(function(){	
	$(window).resize(function(){
		//if($(".content").length > 0 || $(".codecontent").length > 0){
			calculateContent();
		//}
	});
	$(".contentlinks").click(function(){
		calculateContent();
	});
	$(".tablinks").click(function(){
		clearInterval(intervalref);
		calculateContent();
		if($(this).attr("name")=="DimensionalRift"){
			imageCount = $("#riftshow > img").length;
		}else{
			imageCount = $("#spyshow > img").length;
		}
		currentCount = 1;
		slideShow();
		intervalref = setInterval(function(){slideShow();},3000);
	});
	if($(".slideshow img").length < 2){
		checkImages();
	}else{
		$(".slideshow").css({"height":"300px", "width":"400px"});
		$(".slideshow img").css({"width":"100%","height":"100%"});
		if($(".slideshow img").length > 0){
			imageCount = $(".slideshow img").length;
		}else{
			imageCount = $("#riftshow > img").length;
		}
		//$("#log").append("<p>"+imageCount+"</p>");
		slideShow();
		intervalref = setInterval(function(){slideShow();},3000);
	}
	$(".content").delay(1000);//.function(){
		if($(".content").length > 0 || $(".contentHigh").length > 0){
			calculateContent();
		}
	//}
});
var intervalref;
var imageCount;
var currentCount = 1;

function calculateContent(){
	var totalHeight = 0;
	if($(".content").length > 0 && $(".content").parent().attr("style") == "display:block"){
		$(".content").each(function(){
			$(this).children().each(function(){
				if(totalHeight < $(this).outerHeight(true)){
					totalHeight = $(this).outerHeight(true);
				}
			});
			totalHeight = totalHeight + $(".contentheader").outerHeight(true);
			$(this).css("height", totalHeight);
		});
	}
	if($("#resume").length > 0){
		$(".resumeSection").each(function(){
			$(this).children().each(function(){
				if(!($(this).is(":hidden"))){//.css("display") == "none")){					
					totalHeight = totalHeight + $(this).outerHeight(true);
				}
			});
		});
		if(totalHeight > 1050){//($("body").height()-200)){
			$("#resume").css("height", totalHeight);
			$("body").css("height", (totalHeight+200+"px"));
		}else{
			$("#resume").css("height", "100%");
			$("body").css("height", "1050px");
		}
	}
	if($(".codecontent").length > 0 && $(".codecontent").parent().attr("style") == "display:block"){
		$(".codecontent").each(function(){
			$(this).children().each(function(){
				totalHeight = totalHeight + $(this).outerHeight(true);
			});			
		});
		$(".codecontent").css("height", totalHeight);
		totalHeight = 0;
		$("#code").children().each(function(){
			totalHeight = totalHeight + $(this).outerHeight(true);
		});
		if(totalHeight > 1050){//($("body").height()-200)){
			$("#code").css("height", totalHeight);
			$("body").css("height", (totalHeight+200+"px"));
		}else{
			$("body").css("height", "1050px");
		}
		//$("#log").append("<p>"+$("body").css("height")+"</p>");	
	}	
}

function checkImages(){
	if($(".slideshow img").length == 1){
		var src = $(".slideshow img").get(0).src;
		if(src.indexOf("levels.jpg") != -1 || src.indexOf("mixedgames.png" != -1)){//=="*/levels.jpg" ||  "*/mixedgames.png"){
			$(".slideshow").css({"height":"400px", "width":"400px"});
			$(".slideshow img").css({"width":"100%","height":"100%"});
		}
		else if(src.indexOf("bild.jpg") != -1){
			$(".slideshow").css({"height":"400px", "width":"250px"});
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