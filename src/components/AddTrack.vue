<script setup>
import { ref } from 'vue';

import { usePlaylist } from '../composables/usePlaylist';
const { addSong } = usePlaylist();


let addTrackOptions = ref(["By URL", "Via file upload"]);
let uploadFile = ref(false);
let songURL = ref("");
let blobURL = ref("");
let songName = ref("");

function onChange(event) {
    uploadFile.value = (event.target.value == addTrackOptions.value[1]);
}

function clickURL() {
    let songNameShort = songURL.value;
    songNameShort = songNameShort.substring(songNameShort.lastIndexOf("\/") + 1);
    addSong(songNameShort, songURL.value);
    songURL.value = "";
}

function uploadSelected(event) {
    blobURL.value = URL.createObjectURL(event.target.files[0]);
    songName.value = event.target.value;
    songName.value = songName.value.substring(songName.value.lastIndexOf("\\") + 1);
}

function clickUpload() {
    addSong(songName.value, blobURL.value);
    songName.value = "";
    blobURL.value = "";
}

</script>

<template>
    <div>
        <h2>New track</h2>
        <label for="method-selector">Add track</label>
        <select id="method-selector" @change="onChange">
            <option v-for="option in addTrackOptions">{{ option }}</option>
        </select>
        <span v-if="uploadFile">
            <label for="file-upload">Upload file</label>
            <input type="file" @change="uploadSelected" id="file-upload" accept="audio/*"/>
            <button :disabled="!blobURL" @click="clickUpload">Add uploaded file</button>
        </span>
        <span v-else>
            <input v-model="songURL" type="text" placeholder="Provide URL" />
            <button :disabled="!songURL" @click="clickURL">Add URL</button>
        </span>
    </div>
</template>

<style scoped>
#file-upload {
    display: none;
}

label[for="file-upload"] {
    padding: 5px;
    background-color: #333;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}
</style>