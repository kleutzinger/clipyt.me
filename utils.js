function getHash(){
	url = document.URL;
	if(url.indexOf("#")==0){return false;}
    hash = url.substring(url.indexOf("#")+1);
    autoplay = hash[0] == "!";
    if (autoplay) { hash = hash.substring(1)};
    split = hash.split("+");
    customtitle = hash.split("+").pop();
    customtitle = customtitle.trim();
    customtitle = customtitle.replace(/_/g, " ");
    if (customtitle.trim().length != 0) {$("#customtitle").text(customtitle);}
    console.log(customtitle);
    parts = [];
    lastid = split[0];
    for (i=0;i<split.length-1;i+=3){
        if(split[i].length <= 1) {split[i] = lastid;}
        else {lastid = split[i];}
        p = newClip(split[i], parseInt(split[i+1]), parseInt(split[i+2]))
		parts.push(p);
    }
    setIndexButton(parts);
    return parts;
}

// make new clip, ensure valid
function newClip(vid, startSeconds, endSeconds){
    clip = new Object();
    clip.vid = vid;
    clip.startSeconds = startSeconds;
    clip.endSeconds = endSeconds;
    clip.name = vid;
    if (isNaN(clip.endSeconds)) {return false;}
    return clip;
}

function updateHash(){
	window.location.hash = constructHash();
}

function writePartitions(p,boldIndex){
	updateHash();
    $("#partition_list").empty();
    for (i=0;i<p.length;i++){
		element = "";
		if (i==boldIndex){element+= "<strong>";}
		element+=
			'<li>'+ //
			'<button id="vidli'+i+'" style="cursor:pointer;" onclick="playSingleClip('+i+')" class="control">&#9658;</button>&nbsp;' +
			'<input id=start'+i+' oninput="startChange('+i+');" type="number" pattern=[0-9] value='+p[i].startSeconds+'>-'+
			'<input id=end'  +i+' oninput="endChange  ('+i+');" type="number" pattern=[0-9] value='+p[i].endSeconds+'>&nbsp;&nbsp;'+
			'<button onclick="moveUp('+i+')"      class="control">  &#8593;</button>'+
			'<button onclick="moveDown('+i+')"    class="control">&#8595;</button>&nbsp;'+
			'<button onclick="deleteClip('+i+');" class="control"> &#215;</button>&nbsp;&nbsp;'+
			'<a id="vidlink'+i+'" href="https://youtu.be/'+p[i].vid+'?t='+p[i].startSeconds+'" class="vidlink">'+p[i].name+'</a>' +
			'</li>';
		if(i==boldIndex){element+="</strong>";}
		$("#partition_list").append($(element));
    }
    $("#indexid").attr({
		"max" : i+1,
		"min" : 0
	});
}

function bolden(i){
	for(n=0;n<videos.length;n++){
		$("#vidli"+n).css('background-color', 'white');
		if(n==i){
			$("#vidli"+n).css('background-color', 'red');
		}
	}
}

function constructHash(){
	setIndexButton(videos.length);
	hash_string = "";
    lastid = "";
    v = videos;
    for(i=0;i<v.length;i++){
        if(i>0){lastid = v[i-1].vid;}
        if (v[i].vid == lastid && false){ temp = "!"; } //Removed ! compression
        else {temp = v[i].vid};
        h = temp + "+" + v[i].startSeconds + "+" + v[i].endSeconds + "+";
        hash_string+= h;
    } 
    //checked = document.getElementById('autoCheckBox').checked;
    checked = false;
    if (checked) { hash_string = "!" + hash_string;}
    customtitle = $("#customtitle").text();
    customtitle = customtitle.trim();
    customtitle = customtitle.replace(/\s/g, "_");
    customtitle= customtitle.replace(/\W/g, '');
    hash_string += customtitle;
    return hash_string;
}


function setName(i,name){
	if (videos[i].name == videos[i].vid){
		videos[i].name = name;
		$("#vidlink"+i).text(name);
	}
}

function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

function hmsToSecondsOnly(str) {
    var p = str.split(':'),
        s = 0, m = 1;
    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }
    return s;
}
