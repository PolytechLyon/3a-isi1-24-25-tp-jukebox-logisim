<script setup>
import { ref } from 'vue';

let addTrackOptions = ref(["By URL", "Via file upload"]);
let uploadFile = ref(true);

function onChange(event) {
	let option = event.target.value;
	uploadFile.value = (option == addTrackOptions.value[1]);
}
</script>

<template>
	<div>
		<h2>New track</h2>
		<label for="method-selector">Add track</label>
		<select id="method-selector" @change="onChange">
			<option v-for="option in addTrackOptions">{{ option }}</option>
		</select>
		<input v-if="uploadFile" type="file" />
		<input v-else type="text" placeholder="Provide URL" />
		<button disabled>Add uploaded file</button>
	</div>
</template>

<style scoped>
</style>