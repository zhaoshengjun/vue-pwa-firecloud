<template>
  <v-app>
    <Toolbar/>
    <main>
      <v-content>
          <router-view :online="online"></router-view>
      </v-content>
    </main>
    <v-footer app></v-footer>
  <v-snackbar 
    :absolute="true"
    v-model="show"
    :timeout="4000"
  >
    {{message}}
  </v-snackbar>
  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar'
export default {
  props: ['show', 'message'],
  data: () => ({
    online: false
  }),
  components: {
    Toolbar
  },
  mounted() {
    this.online = navigator.online
    window.addEventListener('online', () => {
      this.online = true
    })
    window.addEventListener('offline', () => {
      this.online = false
    })
  }
}
</script>

<style>
.notification {
  position: absolute;
}
</style>
