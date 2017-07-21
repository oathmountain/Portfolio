$(document).ready(function(){
	$(".tablinks").click(function(event){
		var id = "#"+$(this).attr("name");
		$(".content").attr("style","display:none");
		$(".tablinks.active").removeClass("active");
		
		$(id).attr("style","display:block");	
		$(this).addClass("active");				
	});
	$(".contentlinks").click(function(){
		$(".contentlinks").css("background-color","transparent");
		$(this).css("background-color","#aaa");
		$(".contentlinks.active").removeClass("active");
		$(this).addClass("active");
		
		var id ="#"+$(this).attr("name");
		$(".designcontent").attr("style","display:none");
		$(id).attr("style","display:block");		
		
		$(".tablinks.active").removeClass("active");		
		$("#"+$(".tabs button:nth-child(1)").attr("name")).attr("style", "display:block");
		$(".tabs button:nth-child(1)").addClass("active");
		
	});
	setupProj();

	
});

function setupProj(){
	$(".content").attr("style","display:none");
	$(".designcontent").attr("style","display:none");
	$("#"+$(".contenttabs button:nth-child(1)").attr("name")).attr("style", "display:block");
	$("#"+$(".tabs button:nth-child(1)").attr("name")).attr("style", "display:block");
	$(".tabs button:nth-child(1)").addClass("active");
	$(".contenttabs button:nth-child(1)").addClass("active");
}