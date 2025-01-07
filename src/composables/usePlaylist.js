import { ref } from 'vue';

const playlist = ref(
    [
        { id: 1, name: "Sample 1", url: "http://codeskulptor-demos.commondatastorage.googleapis.com/pang/paza-moduless.mp3"},
        { id: 2, name: "Sample 2", url: "http://codeskulptor-demos.commondatastorage.googleapis.com/pang/arrow.mp3"},
    ]
);
const currentSong = ref(null);
const id = ref(3);

function pushSongToPlayer(id) {
    const filteredPlaylist = playlist.value.filter(song => song.id === id);
    if (filteredPlaylist.length > 0) {
        currentSong.value = filteredPlaylist[0];
        console.log('Playing: ' + currentSong.value.name);
    } else {
        console.error('Index out of bounds');
    }
}

function addSong(songName, songUrl) {
    playlist.value.push({ id: id.value, name: songName, url: songUrl });
    id.value++;
}

function deleteSong(songId) {
    playlist.value.splice(playlist.value.findIndex(song => song.id === songId), 1);
}

function getCurrentSong() {
    return currentSong.value;
}

export function usePlaylist() {    
    return {
        playlist,
        currentSong,
        pushSongToPlayer,
        addSong,
        deleteSong,
        getCurrentSong
    };
}
