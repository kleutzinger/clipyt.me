// var videos = [];
var hasUnstarted = false;
var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
function onYouTubeIframeAPIReady () {
  player = new YT.Player('player', {
    height: '600',
    width: '600',
    color: 'WHITE',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

var index = 0;

function playTheseVideos (v, startIndex) {
  if (!v) { return false; }
  index = startIndex;
	// writePartitions(v,index);
  player.stopVideo();
  player.cueVideoById({videoId: v[index].vid,
    startSeconds: v[index].startSeconds,
    endSeconds: v[index].endSeconds});
  player.playVideo();
  bolden(index);
	// randomColor();
}

function playSingleClip (i) {
  playTheseVideos(videos, i);
}

function onPlayerReady (event) {
  if (videos.length > 0) {
    playTheseVideos(videos, index);
  }
}



function onPlayerStateChange (event) {
  if (event.data === YT.PlayerState.UNSTARTED) { hasUnstarted = true; }
  //console.log("State change: " + event.data + " for index: " + index);
  if (event.data === YT.PlayerState.ENDED && player.getVideoLoadedFraction() > 0 && hasUnstarted) {
	  if (index < videos.length - 1) {
    hasUnstarted = false;
    index++;
    bolden(index);
		// randomColor();
    event.target.loadVideoById({
		  videoId: videos[index].vid,
		  startSeconds: videos[index].startSeconds,
		  endSeconds: videos[index].endSeconds
    });
  }
  }
  if (event.data === YT.PlayerState.PLAYING) {
    data = player.getVideoData();
    if (data.video_id == videos[index].vid) {
      setName(index, data.title);
    }
  }
}
