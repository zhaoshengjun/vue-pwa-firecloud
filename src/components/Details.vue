<template>
  <v-container class="details" fluid text-xs-center>
    <v-layout row wrap>
      <v-flex class="message-list">
        <v-chip v-for="message in messages" :key="message['.key']">{{message['.value']}}</v-chip>
      </v-flex>
    </v-layout>

    <DetailsFooter :online="online" @send="sendMessage" />
  </v-container>
</template>


<script>
import DetailsFooter from './DetailsFooter'
import { imagesRef } from '../db'
import { localSave, localGet } from '../store'
export default {
  props: ['id', 'online'],
  data: () => ({ cachedMessages: [] }),
  firebase() {
    return { fireMessages: imagesRef.child(this.id).limitToLast(60) }
  },
  methods: {
    sendMessage(input) {
      this.$firebaseRefs.fireMessages.push(input)
    }
  },
  computed: {
    messages() {
      return this.fireMessages.length ? this.fireMessages : this.cachedMessages
    }
  },
  created() {
    localGet(this.id).then(messages => (this.cachedMessages = messages))
    this.$watch('messages', messages => localSave(this.id, messages), {
      deep: true
    })
  },
  components: {
    DetailsFooter
  }
}
</script>


<style scoped>
.details {
  padding: 0 18px;
}
.message-list {
  padding: 20px 0;
  height: calc(100vh - 120px);
  overflow-y: scroll;
}
.message-list > * {
  display: flex;
}
</style>