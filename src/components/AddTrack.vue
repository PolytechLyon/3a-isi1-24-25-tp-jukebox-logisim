<script setup>
import { ref } from 'vue';

import { usePlaylist } from '../composables/usePlaylist';
const { playlist, addSong } = usePlaylist();


let addTrackOptions = ref(["By URL", "Via file upload"]);
let uploadFile = ref(false);
let songURL = ref("");

function onChange(event) {
	let option = event.target.value;
	uploadFile.value = (option == addTrackOptions.value[1]);
	console.log(songURL.value);
}

function clickURL() {
	addSong(songURL.value, songURL.value);
	console.log("URL : " + songURL.value);
    console.log(playlist);
    songURL.value = "";
}

function clickUpload(event) {
	URL.createObjectURL();
	console.log("Upload !");
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
			<input type="file"/>
			<button @click="clickUpload">Add uploaded file</button>
		</div>
		<div v-else>
			<input v-model="songURL" type="text" placeholder="Provide URL" />
			<button :disabled="!songURL" @click="clickURL">Add URL</button>
		</div>
	</div>
</template>

<style scoped>
</style>