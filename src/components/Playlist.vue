<script setup>
import { usePlaylist } from '../composables/usePlaylist';
const { playlist, pushSongToPlayer, deleteSong } = usePlaylist();
</script>

<template>
    <div>
        <h2>Playlist</h2>
        <div>
            <div v-for="track in playlist" :key="track.id">
                <div class="track-container">
                    <div>
                        <span>{{ track.name }}</span>
                    </div>
                    <div>
                        <a href="#" @click="pushSongToPlayer(track.id)">Play</a>
                    </div>
                    <div>
                        <a href="#" @click="deleteSong(track.id)">Delete</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.track-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ccc;
}
</style>