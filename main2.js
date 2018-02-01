$(document).ready(function () {
  videos = getHash();
  writePartitions(videos, -1);
  if (window.location.href.indexOf('localhost') != -1) {
    document.body.style.backgroundColor = 'palegreen';
    $('#allcontrols').css('background-color', 'lightgray');
    $('#playercontainer').css('background-color', 'tan');
  }
  $('#addvideoid').on('input', timestampShortcut);
  $('#endid').on('input', endTimestampShortcut);
  $('#customtitle').on('focusin', updateHash);
  $('#customtitle').on('focusout', updateHash);
	// ~ $("input").focusin(alert);
});
