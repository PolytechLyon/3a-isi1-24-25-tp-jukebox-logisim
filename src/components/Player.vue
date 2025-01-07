<script setup>
import { ref } from 'vue';
let playingTrack = ref(null);
const playTrack = (trackId) => {
    console.log('Playing track with id:', trackId);
}
</script>

<template>
    <div>
        <h2>Player</h2>
        <div>
            <div @play-track="(track) => playTrack(track.id)" v-if="playingTrack && playingTrack.value">
                Now playing: {{ playingTrack.value ? playingTrack.value.title : '' }}
                <a>Pause</a>
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