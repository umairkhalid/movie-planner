/**
 * JavaScript code for the "YouTube API example"
 * http://www.opimedia.be/DS/webdev/YouTube/
 *
 * (c) Olivier Pirson --- 2016 January, 26
 */

/**
 * YT.Player initialized by onYouTubeIframeAPIReady().
 */
var youTubePlayer;

/**
 * Function called by https://www.youtube.com/iframe_api
 * when it is loaded.
 *
 * Initialized YouTube iframe with the value of #YouTube-video-id as videoId
 * and the value of #YouTube-player-volume as volume.
 *
 * Adapted from:
 * https://developers.google.com/youtube/iframe_api_reference
 * https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
 */
function onYouTubeIframeAPIReady() {
	"use strict";

	var inputVideoId = document.getElementById("YouTube-video-id");
	var videoId = inputVideoId.value;
	var suggestedQuality = "tiny";
	var height = 300;
	var width = 400;
	var youTubePlayerVolumeItemId = "YouTube-player-volume";

	function onError(event) {
		youTubePlayer.personalPlayer.errors.push(event.data);
	}

	function onReady(event) {
		var player = event.target;

		player.loadVideoById({ suggestedQuality: suggestedQuality, videoId: videoId });
		player.pauseVideo();
		youTubePlayerDisplayFixedInfos();
	}

	function onStateChange(event) {
		var volume = Math.round(event.target.getVolume());
		var volumeItem = document.getElementById(youTubePlayerVolumeItemId);

		if (volumeItem && Math.round(volumeItem.value) != volume) {
			volumeItem.value = volume;
		}
	}

	youTubePlayer = new YT.Player("YouTube-player", { videoId: videoId, height: height, width: width, playerVars: { autohide: 0, cc_load_policy: 0, controls: 2, disablekb: 1, iv_load_policy: 3, modestbranding: 1, rel: 0, showinfo: 0, start: 3 }, events: { onError: onError, onReady: onReady, onStateChange: onStateChange } });

	// Add private data to the YouTube object
	youTubePlayer.personalPlayer = { currentTimeSliding: false, errors: [] };
}

/**
 * :return: true if the player is active, else false
 */
function youTubePlayerActive() {
	"use strict";

	return youTubePlayer && youTubePlayer.hasOwnProperty("getPlayerState");
}

/**
 * Get videoId from the #YouTube-video-id HTML item value,
 * load this video, pause it
 * and show new infos.
 */
function youTubePlayerChangeVideoId() {
	"use strict";

	var inputVideoId = document.getElementById("YouTube-video-id");
	var videoId = inputVideoId.value;

	youTubePlayer.cueVideoById({ suggestedQuality: "tiny", videoId: videoId });
	youTubePlayer.pauseVideo();
	youTubePlayerDisplayFixedInfos();
}

/**
 * Seek the video to the currentTime.
 * (And mark that the HTML slider *don't* move.)
 *
 * :param currentTime: 0 <= number <= 100
 */
function youTubePlayerCurrentTimeChange(currentTime) {
	"use strict";

	youTubePlayer.personalPlayer.currentTimeSliding = false;
	if (youTubePlayerActive()) {
		youTubePlayer.seekTo((currentTime * youTubePlayer.getDuration()) / 100, true);
	}
}

/**
 * Mark that the HTML slider move.
 */
function youTubePlayerCurrentTimeSlide() {
	"use strict";

	youTubePlayer.personalPlayer.currentTimeSliding = true;
}

/**
 * Display embed code to #YouTube-player-fixed-infos.
 */
function youTubePlayerDisplayFixedInfos() {
	"use strict";

	if (youTubePlayerActive()) {
		document.getElementById("YouTube-player-fixed-infos").innerHTML = "Embed code: <textarea readonly>" + youTubePlayer.getVideoEmbedCode() + "</textarea>";
	}
}

/**
 * Pause.
 */
function youTubePlayerPause() {
	"use strict";

	if (youTubePlayerActive()) {
		youTubePlayer.pauseVideo();
	}
}

/**
 * Play.
 */
function youTubePlayerPlay() {
	"use strict";

	if (youTubePlayerActive()) {
		youTubePlayer.playVideo();
	}
}

/**
 * Return the state decription corresponding of the state value.
 * If this value is incorrect, then return unknow.
 *
 * See values:
 * https://developers.google.com/youtube/iframe_api_reference#Playback_status
 *
 * :param number: any
 * :param unknow: any
 *
 * :return: 'unstarted', 'ended', 'playing', 'paused', 'buffering', 'video cued' or unknow
 */

/**
 * Stop.
 */
function youTubePlayerStop() {
	"use strict";

	if (youTubePlayerActive()) {
		youTubePlayer.stopVideo();
		youTubePlayer.clearVideo();
	}
}

/**
 * Main
 */
(function () {
	"use strict";

	function init() {
		// Load YouTube library
		var tag = document.createElement("script");

		tag.src = "https://www.youtube.com/iframe_api";

		var first_script_tag = document.getElementsByTagName("script")[0];

		first_script_tag.parentNode.insertBefore(tag, first_script_tag);

		// Set timer to display infos
		setInterval(youTubePlayerDisplayInfos, 1000);
	}

	if (window.addEventListener) {
		window.addEventListener("load", init);
	} else if (window.attachEvent) {
		window.attachEvent("onload", init);
	}
})();
