function playButton () {
  playTheseVideos(videos, 0);
}

function addButton () {
  _original_id = _id = document.getElementById('addvideoid').value;
  _id = youtube_parser(_id);
  _start = document.getElementById('startid').value;
  _start = hmsToSecondsOnly(_start);
  _end = document.getElementById('endid').value;
  _end = hmsToSecondsOnly(_end);
  clip = newClip(_id, _start, _end);

  index = $('#indexid').val();
  if (clip != false && _id != false) {
    player.stopVideo();
    if (index == 'end') {
      videos.push(clip);
    }		else {
      videos.splice(parseInt(index - 1), 0, clip);
    }
    writePartitions(videos, -1);
  }
}

function sendButton () {
  player.stopVideo();
  v = videos;
  hash_string = constructHash();
  sendUrl = 'http://clipyt.me/#' + hash_string;
    // if (window.location.href.indexOf("local") != -1) {sendUrl = "http://localhost:8000/#" + hash_string;}
  writePartitions(videos, -1);
  window.prompt('Copy to clipboard: Ctrl+C (Cmd + C on mac)', sendUrl);
}

function deleteClip (i) {
  player.stopVideo();
  videos.splice(i, 1);
  writePartitions(videos, -1);
}

function setIndexButton (length) {
  $('#indexid').empty();

  option = '';
  option += '<option value=end>' + 'end' + '</option>';
  for (var i = 0; i < length; i++) {
    option += '<option value="' + (i + 1) + '">' + (i + 1) + '</option>';
  }
  $('#indexid').append(option);
}

function moveUp (i) {
  if (i > 0) {
    player.stopVideo();
    temp = videos[i];
    videos[i] = videos[i - 1];
    videos[i - 1] = temp;
    writePartitions(videos, -1);
  }
}

function moveDown (i) {
  if (i < videos.length - 1) {
    player.stopVideo();
    temp = videos[i];
    videos[i] = videos[i + 1];
    videos[i + 1] = temp;
    writePartitions(videos, -1);
  }
}

function startChange (i) {
  player.stopVideo();
  val = $('#start' + i).val();
  videos[i].startSeconds = parseInt(val);
  updateHash();
  $("#vidlink"+i).attr("href", getVideoHref(i));
}

function endChange (i) {
  player.stopVideo();
  val = $('#end' + i).val();
  videos[i].endSeconds = parseInt(val);
  updateHash();
  $("#vidlink"+i).attr("href", getVideoHref(i));
}

function timestampShortcut () {
  _id = $('#addvideoid').val();
  if (!_id) { _id = ''; }
  t_index = Math.max(_id.indexOf('&t='), _id.indexOf('?t='));
  t2_index = Math.max(_id.indexOf('#t2='), -1);

  if (t_index != -1) { // there is a timestamp in the yt link
    timestr = _id.substring(t_index + 3);
    timeint = parseInt(timestr);
    $('#startid').val(timeint-10);
    $('#endid').val(timeint);
  }
  else {$('#startid').val(0); $('#endid').val(10);}

  if (t2_index != -1) { // there is a timestamp in the yt link
    timestr = _id.substring(t2_index + 4);
    timeint = parseInt(timestr);
    $('#endid').val(timeint);
  }
}

function endTimestampShortcut () {
  _id = $('#endid').val();
  if (!_id) { _id = ''; }
  t_index = Math.max(_id.indexOf('&t='), _id.indexOf('?t='));
  if (t_index != -1) { // there is a timestamp in the yt link
    timestr = _id.substring(t_index + 3, _id.length);
    timeint = parseInt(timestr);
    //$('#startid').val(timeint);
    $('#endid').val(timeint);
    console.log(timestr);
  }
}

function clearInputs () {
  $('#addvideoid').val('');
  $('#startid').val('');
  $('#endid').val('');
  randomColor();
}

function example () {
  window.location.href = 'http://www.clipyt.me/#VQBbHzypBro+71+79+VQBbHzypBro+140+146+pZwvLFhYUL0+129+133+hGY44DIQb-A+81+92+MdcuaeYV9oM+164+177+IydCCUfPDLE+11+34+Interesting_Videos';
}
