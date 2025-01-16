<script setup>
import { onMounted } from 'vue';
import { usePlaylist } from '../composables/usePlaylist';
const { playlist, pushSongToPlayer, deleteSong, currentSong, actualizePlaylist } = usePlaylist();

onMounted(() => {
    actualizePlaylist();
    console.log('Playlist:', playlist);
    
});
</script>

<template>
    <div>
        <h2>Playlist</h2>
        <table>
            <tr v-for="track in playlist" :key="track.id" class="track-container">
                <td>
                    <span :class="{
                        unplayable: !track.playable,
                        'current-track': track.id === currentSong?.id
                    }">
                        {{ track.name.length > 20 ? `${track.name.slice(0, 20)}...` : track.name }}
                    </span>
                </td>
                <td>
                    <span class="playlist-btn" @click="pushSongToPlayer(track.id)" v-if="track.playable">
                        <span href="#" >Play</span>
                        <img src="/playlist-play.svg" />
                    </span>
                    <span class="playlist-btn" @click="deleteSong(track.id)">
                        <span href="#">Delete</span>
                        <img src="/delete.svg" />
                    </span>
                </td>
            </tr>
        </table>
    </div>
</template>

<style scoped>
table {
    margin-left: auto;
    margin-right: auto;
    width: 50%;
}

td {
    border-top: 1px solid #333;
    border-bottom: 1px solid #333;
}

td:first-child {
    padding: 5px;
    border-left: 1px solid #333;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}

td:last-child {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-right: 1px solid #333;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}

.playlist-btn {
    display: flex;
    align-items: center;
    cursor: pointer;
    background-color: #333;
    color: white;
    padding: 5px;
    margin-left: 10px;
    border-radius: 5px;
    height: 30px;
}

.unplayable {
    text-decoration: line-through;
}

.current-track {
    font-weight: bold;
}
</style>