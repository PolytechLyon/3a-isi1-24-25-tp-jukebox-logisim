<script setup>
import { watchEffect } from 'vue';
import { usePlaylist } from '../composables/usePlaylist';
const { currentSong, getCurrentSong } = usePlaylist();

watchEffect(() => {
    console.log('Current song:', getCurrentSong());
});
</script>

<template>
    <div>
        <h2>Player</h2>
        <div>
            <div v-if="getCurrentSong()">
                Now playing: {{ getCurrentSong() ? getCurrentSong().name : '' }}
                <a href="#">Pause</a>
                <audio :src="getCurrentSong() ? getCurrentSong().url : ''" controls></audio>
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