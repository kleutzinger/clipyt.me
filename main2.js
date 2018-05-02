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

  $(window).keydown(function(event) {
    if(event.keyCode === 13 && event.target.id === "addvideoid"){
      $("#addid").click();
    }
    if(event.ctrlKey && event.keyCode == 0x56) {
      $('#clearid').click();
      $('#addvideoid').focus();
      if  ($("#startid").val() !== "")  {$('#addid').click();}
    }
  });

});
