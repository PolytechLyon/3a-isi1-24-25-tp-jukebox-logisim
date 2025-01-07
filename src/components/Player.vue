<script setup>
import { ref, watchEffect, onMounted, onBeforeUnmount } from 'vue';
import { usePlaylist } from '../composables/usePlaylist';
const { getCurrentSong } = usePlaylist();

const audioRef = ref(null);
const progressRef = ref(null);
const currentSong = ref(null);
const textButtonPlayPause = ref('Play');

watchEffect(() => {
    currentSong.value = getCurrentSong();
    textButtonPlayPause.value = 'Play';
    console.log('Current song:', currentSong.value);
});

const togglePlayPause = () => {
    const audio = audioRef.value;
    if (audio.paused) {
        audio.play();
        textButtonPlayPause.value = 'Pause';
    } else {
        audio.pause();
        textButtonPlayPause.value = 'Play';
    }
};

const updateProgressBar = () => {
    const audio = audioRef.value;
    const progress = progressRef.value;
    if (audio && progress) {
        progress.value = (audio.currentTime / audio.duration) * 100 || 0;
    }
};

onMounted(() => {
    const audio = audioRef.value;
    if (audio) {
        audio.addEventListener('timeupdate', updateProgressBar);
    }
});

onBeforeUnmount(() => {
    const audio = audioRef.value;
    if (audio) {
        audio.removeEventListener('timeupdate', updateProgressBar);
    }
});
</script>

<template>
    <div>
        <h2>Player</h2>
        <div>
            <div v-if="currentSong">
                Now playing: {{ currentSong.name }}
                <button @click="togglePlayPause" id="playPauseButton">{{ textButtonPlayPause }}</button>
                <progress id="progress" ref="progressRef" value="0" max="100"></progress>
            </div>
            <div v-else>
                Choose a track to play.
            </div>
            <audio :src="currentSong ? currentSong.url : ''" ref="audioRef"></audio>
        </div>
    </div>
</template>

<style scoped>

</style>
