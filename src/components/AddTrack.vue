<script setup>
import { ref } from 'vue';

import {usePlaylist}  from '../composables/usePlaylist';
const { addSong } = usePlaylist();


let addTrackOptions = ref(["By URL", "Via file upload"]);
let uploadFile = ref(false);
let songURL = ref("");
let blobURL = ref("");
let songName = ref("");

function onChange(event) {
	let option = event.target.value;
	uploadFile.value = (option == addTrackOptions.value[1]);
	console.log(songURL);
}

function clickURL(event) {
	let songNameShort = songURL.value;
	songNameShort = songNameShort.substring(songNameShort.lastIndexOf("\\") + 1);
	addSong(songNameShort, songURL.value);
	songURL.value = "";
}

function uploadSelected(event) {
	blobURL.value = URL.createObjectURL(event.target.files[0]);
	songName.value = event.target.value;
	songName.value = songName.value.substring(songName.value.lastIndexOf("\\") + 1);
}

function clickUpload(event) {
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
		<div v-if="uploadFile">
			<input type="file" @change="uploadSelected"/>
			<button :disabled="!blobURL" @click="clickUpload">Add uploaded file</button>
		</div>
		<div v-else>
			<input v-model="songURL" type="text" placeholder="Provide URL" />
			<button :disabled="!songURL" @click="clickURL">Add URL</button>
		</div>
	</div>
</template>

<style scoped>
</style>