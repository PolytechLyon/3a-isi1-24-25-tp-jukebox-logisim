import { ref } from "vue";

const playlist = ref([
	{
		id: 1,
		name: "Sample 1",
		url: "http://codeskulptor-demos.commondatastorage.googleapis.com/pang/paza-moduless.mp3",
		playable: true,
	},
	{
		id: 2,
		name: "Sample 2",
		url: "http://codeskulptor-demos.commondatastorage.googleapis.com/pang/arrow.mp3",
		playable: true,
	},
]);
const currentSong = ref(null);
const id = ref(3);

function pushSongToPlayer(id) {
	const filteredPlaylist = playlist.value.filter((song) => song.id === id);
	if (filteredPlaylist.length > 0) {
		currentSong.value = filteredPlaylist[0];
		console.log("Playing: " + currentSong.value.name);
	} else {
		console.error("Index out of bounds");
	}
}

function addSong(songName, songUrl) {
	const song = { id: id.value, name: songName, url: songUrl, playable: true };
	playlist.value.push(song);
	localStorage.setItem('playlist', JSON.stringify(playlist.value.filter(s => s.url.startsWith('http'))));
	id.value++;
}

function deleteSong(songId) {
	const index = playlist.value.findIndex((song) => song.id === songId);
	if (index === currentSong.value.id) {
		currentSong.value = null;
	}
	playlist.value.splice(index, 1);
}

function getCurrentSong() {
	return currentSong.value;
}

function getNextSong() {
	const currentSongIndex = playlist.value.findIndex(
		(song) => song.id === currentSong.value.id
	);
	console.log(
		"Next song : " +
			playlist.value[(currentSongIndex + 1) % playlist.value.length].name
	);
	currentSong.value =
		playlist.value[(currentSongIndex + 1) % playlist.value.length];
}

function getPreviousSong() {
    const currentSongIndex = playlist.value.findIndex(
        (song) => song.id === currentSong.value.id
    );
    console.log(
        "Previous song : " +
            playlist.value[
                (currentSongIndex - 1 + playlist.value.length) % playlist.value.length
            ].name
    );
    currentSong.value =
        playlist.value[
            (currentSongIndex - 1 + playlist.value.length) % playlist.value.length
        ];
}

function actualizePlaylist() {
    playlist.value = JSON.parse(localStorage.getItem('playlist')) || playlist.value;
}

export function usePlaylist() {
	return {
		playlist,
		currentSong,
		pushSongToPlayer,
		addSong,
		deleteSong,
		getCurrentSong,
		getNextSong,
        getPreviousSong,
        actualizePlaylist,
	};
}
