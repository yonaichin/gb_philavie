/**
 * Created by arielyih on 2/17/16.
 */

var tag = document.createElement('script'), videoId='';

// for pc
function videoPopupInit(){
    var $videoPopup = $('.videoPopup'), $mask = $('.mask');
    $('.videoPopup-area').height($videoPopup.width()*0.40);
    $mask.css('display', 'block');
    $('.video-click').click(function(){
        videoId = $(this).attr('id');
        player.loadVideoById(videoId, 0, "default");
        openElementMask($videoPopup);
        $('.videoPopup-close').click(function(){
            $videoPopup.hide();
            if ($mask.css('display') == 'block') $mask.hide();
            stopVideo();
        });
        $videoPopup.click(function(){
            $videoPopup.hide();
            $mask.hide();
            stopVideo();
        });
    });
}

// for mobile
function mVideoInit(){
    $('.video-click').click(function(){
        videoId = $(this).attr('id');
        window.open('https://www.youtube.com/watch?v=' + videoId);
    });
}

/*************youtube API*************/
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '92%',
        width: '96%',
        playerVars: {'autoplay': 0, 'controls': 1},
        events: {
            //'onReady': onPlayerReady,
            //'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}