<template>
<div class="home">
  <!-- Header -->
    <HomeNav/>
    <AllPosts/>
</div>
</template>

<script>
import HomeNav from '../components/home-nav.vue'
import AllPosts from '../components/all-posts.vue'

export default {
    name: 'user-home',
    components: {
      HomeNav,
      AllPosts,
    },
}
</script>