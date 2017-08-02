$(document).ready(function() {
	videos = getHash();
	writePartitions(videos, -1);
	if (url.indexOf("localhost")!=-1){
		document.body.style.backgroundColor = "palegreen";
		$("#allcontrols").css("background-color", "lightgray");
		$("#playercontainer").css("background-color", "tan");
	}
	$("#addvideoid").on("input", timestampShortcut);
	$("#customtitle").on("focusin", updateHash);
	$("#customtitle").on("focusout",updateHash);
	//~ $("input").focusin(alert);
});
