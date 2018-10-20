<template>
  <div id="app">
    <Titlebar />
    <router-view></router-view>
  </div>
</template>

<script>
import Titlebar from "@/components/Titlebar"

export default {
  components: {
    Titlebar
  },
  name: 'Eterm'
}
</script>

