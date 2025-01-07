<script setup>
import AddTrack from './components/AddTrack.vue';
import Player from './components/Player.vue';
import Playlist from './components/Playlist.vue';


</script>

<template>
    <div id="global-container">
        <h1>Jukebox</h1>
        <Player />
        <Playlist />
        <AddTrack />
    </div>
</template>

<style scoped>
    div#global-container {
        margin: 15%;
    }

    div#global-container > * {
        margin: 50px;
    }
</style>