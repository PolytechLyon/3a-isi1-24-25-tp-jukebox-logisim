<script setup>
import { watchEffect, useTemplateRef } from 'vue';
import { usePlaylist } from '../composables/usePlaylist';
const { getCurrentSong } = usePlaylist();

watchEffect(() => {
    console.log('Current song:', getCurrentSong());
});

const togglePlayPause = () => {
    const track = document.getElementById('track');
    if (track.paused) {
        track.play();
        document.getElementById('playPauseButton').innerText = 'Pause';
    } else {
        track.pause();
        document.getElementById('playPauseButton').innerText = 'Play';
    }
};
</script>

<template>
    <div>
        <h2>Player</h2>
        <div>
            <div v-if="getCurrentSong()">
                Now playing: {{ getCurrentSong() ? getCurrentSong().name : '' }}
                <a href="#" @click="togglePlayPause" id="playPauseButton">Play</a>
                <audio :src="getCurrentSong() ? getCurrentSong().url : ''" id="track"></audio>
            </div>
            <div v-else>
                Choose a track to play.
            </div>
            <div id="track-options">

            </div>
        </div>
    </div>
</template>

<style scoped></style>