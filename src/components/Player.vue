<script setup>
import { ref, watchEffect, onMounted, onBeforeUnmount } from 'vue';
import { usePlaylist } from '../composables/usePlaylist';
const { getNextSong, getPreviousSong, getCurrentSong, playlist } = usePlaylist();

const audioRef = ref(null);
const progressRef = ref(null);
const currentSong = ref(null);
const textButtonPlayPause = ref('play');
const choiceRef = ref(0);
const playModes = ['repeat', 'repeat-one', "no-repeat"];

watchEffect(() => {
    currentSong.value = getCurrentSong();
    if (audioRef && audioRef.value) {
        textButtonPlayPause.value = 'pause';
        setTimeout(() => {
            if (currentSong.value && currentSong.value.playable) {
                audioRef.value.play().catch(() => {
                    playlist.value[playlist.value.findIndex(song => song.id === currentSong.value.id)].playable = false;
                    getNextSong();
                });
            }
        }, 10);
        console.log('Current song:', currentSong.value?.name);
    }
});

const togglePlayPause = () => {
    const audio = audioRef.value;
    if (audio.paused) {
        audio.play();
        textButtonPlayPause.value = 'pause';
    } else {
        audio.pause();
        textButtonPlayPause.value = 'play';
    }
};

const changeMode = () => {
    choiceRef.value = (choiceRef.value + 1) % playModes.length;
};

const putAudioAtCursorPosition = (event) => {
    const audio = audioRef.value;
    const progress = progressRef.value;
    if (audio && progress) {
        const { left, width } = progress.getBoundingClientRect();
        const clickX = event.clientX - left;
        const percentage = clickX / width;
        audio.currentTime = audio.duration * percentage;
    }
};

const updateProgressBar = () => {
    const audio = audioRef.value;
    const progress = progressRef.value;
    if (audio && progress) {
        progress.value = (audio.currentTime / audio.duration) * 100 || 0;
        if (audio.ended) {
            switch (playModes[choiceRef.value]) {
                case 'repeat':
                    getNextSong();
                    audio.play();
                    break;
                case 'repeat-one':
                    audio.currentTime = 0;
                    audio.play();
                    break;
                case 'no-repeat':
                    textButtonPlayPause.value = 'play';
                    break;
            }
        }
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
    <div id="player">
        <!-- <h2>Player</h2> -->
        <div v-if="currentSong" id="player-bar">
            <div id="song">
                <img src="/cover.webp" />
                <span id="songName">{{ currentSong.name }}</span>
            </div>
            <progress @click="putAudioAtCursorPosition" id="progress" ref="progressRef" value="0" max="100"></progress>
            <div id="navButtons">
                <div @click="{getPreviousSong(); audioRef.value?.play()}"><img src="/previous.svg" alt="previous" /></div>
                <div @click="togglePlayPause" id="playPauseButton"><img :src="`/${textButtonPlayPause}.svg`" alt="Play/Pause" /></div>
                <div @click="{getNextSong(); audioRef.value?.play()}"><img src="/next.svg" alt="next" /></div>
                <div @click="changeMode" id="playMode"><img :src="`/${playModes[choiceRef]}.svg`" alt="next"/></div>
            </div>
        </div>
        <div v-else id="player-else">
            Choose a track to play.
        </div>
        <audio :src="currentSong ? currentSong.url : ''" ref="audioRef"></audio>
    </div>
</template>

<style scoped>
#player {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #333;
    margin: 0 !important;
    color: white;
    height: 70px;
}

#player-bar {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 100%;
}

#song {
    display: flex;
    align-items: center;

    &>#songName {
        margin-left: 10px;
        font-size: 1.2em;
    }
}

progress {
    width: 50%;
}

#player-else {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

img {
    width: 50px;
    height: 50px;
}

#navButtons {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20%;
}
</style>
