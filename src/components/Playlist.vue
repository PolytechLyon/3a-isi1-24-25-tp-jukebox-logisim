<script setup>
    import { ref } from 'vue';
    const tracks = ref([
      { id: 1, title: 'Track 1' },
      { id: 2, title: 'Track 2' },
      { id: 3, title: 'Track 3' },
    ]);
</script>

<template>
  <div>
    <h2>Playlist</h2>
    <div>
      <div v-for="track in tracks" :key="track.id">
        <div class="track-container">
            <div>
                <span>{{ track.title }}</span>
            </div>
            <div>
                <a href="#" @click="$emit('playTrack', track.id)">Play</a>
            </div>
            <div>
                <a href="#" @click="$emit('deleteTrack', track.id)">Delete</a>
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