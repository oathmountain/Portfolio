$(document).ready(function(){
	$(".tablinks").click(function(event){
		var id = "#"+$(this).attr("name");
		$(".content").attr("style","display:none");
		$(".tablinks.active").removeClass("active");
		
		$(id).attr("style","display:block");	
		$(this).addClass("active");				
	});
	$(".content").attr("style","display:none");
	$("#"+$(".tabs button:nth-child(1)").attr("name")).attr("style", "display:block");
	$(".tabs button:nth-child(1)").addClass("active");
	
});