<template>
  <div id="app">
    <div class="main-page">
      <div @click="this.$router.push('/check-out')" style="margin-bottom: 15px; display: flex; justify-content: end;">
        <span class="redirect-href">
          Wróć do koszyka
        </span>
      </div>
      <div>
        <label class="title-text">
          Nagraj wiadomość dla pracowników SPA
        </label>
      </div>
      <div style="display: flex; flex-direction: column; justify-content: center;">
        <div>
          <video ref="videoElement" width="400" height="300" controls></video>
        </div>
        <div>
          <span @click="startRecording" v-if="!isRecording">Rozpocznij nagrywanie</span>
          <span @click="stopRecording" v-if="isRecording">Zatrzymaj nagrywanie</span>
        </div>
        <div v-if="displayError" style="color: red;">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  data() {
    return {
      isRecording: false,
      errorMessage: "",
      displayError: false,
    }
  },
  methods: {
    async requestMediaAccess() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
          console.log('Media stream acquired:', stream);
          return stream;
        } catch (error) {
          throw error;
        }
      } else {
        console.error('getUserMedia is not supported in this environment');
      }
    },
    displayMediaStream(stream) {
      const videoElement = this.$refs.videoElement;
      if (videoElement) {
        videoElement.srcObject = stream;
      }
    },
    async startMediaAccess() {
      try {
        const stream = await this.requestMediaAccess();
        this.displayMediaStream(stream);
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    },
    async startRecording() {
      this.errorMessage = ""
      this.displayError = false

      try {
        const stream = await this.requestMediaAccess();
        this.isRecording = true
        this.$refs.videoElement.srcObject = stream;
        this.$refs.videoElement.play().catch(error => console.error('Error playing video:', error));

        this.recordedChunks = [];
        this.mediaRecorder = new MediaRecorder(stream);

        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.recordedChunks.push(event.data);
          }
        };

        this.mediaRecorder.onstop = () => {
          const recordedBlob = new Blob(this.recordedChunks, { type: 'video/webm' });
          const videoUrl = URL.createObjectURL(recordedBlob);
          console.log('Recording stopped:', videoUrl);
        };

        this.mediaRecorder.start();
        this.recording = true;
        console.log('Recording started');
      } catch (error) {
        console.error('Error starting recording:', error);
        this.errorMessage = error
        this.displayError = true
      }
    },
    stopRecording() {
      if (this.mediaRecorder && this.recording) {
        this.mediaRecorder.stop();
        this.isRecording = false
        this.$refs.videoElement.pause()
      }
    },
  },
  mounted: function () {
  }
};


</script>

<style>
.main-page {
  top: 30% !important;
}

.title-text {
  font-size: 25px;
  padding-bottom: 3%;
}

h1 {
  font-size: 15px;
}
</style>