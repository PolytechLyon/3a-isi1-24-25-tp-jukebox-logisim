<script setup>
import { usePlaylist } from '../composables/usePlaylist';
const { playlist, pushSongToPlayer, deleteSong } = usePlaylist();
</script>

<template>
    <div>
        <h2>Playlist</h2>
        <table>
            <tr v-for="track in playlist" :key="track.id" class="track-container">
                <td>
                    <span>{{ track.name }}</span>
                </td>
                <td>
                    <span class="playlist-btn" @click="pushSongToPlayer(track.id)">
                        <span href="#" >Play</span>
                        <img src="/playlist-play.svg" style="filter: invert(1);" />
                    </span>
                    <span class="playlist-btn" @click="deleteSong(track.id)">
                        <span href="#" >Delete</span>
                        <img src="/delete.svg" style="filter: invert(1);"/>
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
</style>