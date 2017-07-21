$(document).ready(function(){
	$(".resumeHider").append('<img src="Images/arrow.png" alt="arrow">')
	//$(".resumeHider").children().attr("src","Images/arrow.png");
	//$(".resumeMasterHider").children().attr("src","Images/arrow.png");
	$(".resumeHider").click(function(){
		$(this).parent().find(".resumecontent").toggle();
		if($(this).children().css("clip-path")=="inset(10px 0px 0px 10px)"){
			setResumeArrow($(this),true);
		}else{
			setResumeArrow($(this),false);
		}
		calculateContent();
	});
	$(".resumeMasterHider").click(function(){
		$(".resumeSection").each(function(){
			if(!hidden){
				$(this).find(".resumecontent").hide();
				setResumeArrow($(this).find(".resumeHider"),false);
			}
			else{
				$(this).find(".resumecontent").show();
				setResumeArrow($(this).find(".resumeHider"),true);
			}
		});
		if(hidden){
			setResumeArrow($(this),true);
			hidden=false;
		}else{
			setResumeArrow($(this),false);
			hidden=true;
		}
		calculateContent();
	});
});
var hidden = false;

function setResumeArrow(o,h){
	if(h){
		o.children().css("clip-path", "inset(10px 10px 0px 0px)");
		o.children().css("left", "0px");
	}
	else{
		o.children().css("clip-path", "inset(10px 0px 0px 10px)");
		o.children().css("left", "-10px");
	}
}