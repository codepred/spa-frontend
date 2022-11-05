<template>
  <form @submit.prevent="karta">
    <router-link to="/card-add">
      <button type="submit" class="btn btn-dark btn-lg btn-block">Dodaj firmę</button>
    </router-link>
    <div class="divider" />
    <router-link to="/view-list">
      <button type="submit" class="btn btn-dark btn-lg btn-block">Lista firm</button>
    </router-link>
  </form>

</template>

<script>

export default {
  data () {
    return {
    }
  },
  methods: {
  
   }


}
  

</script>

<style>

.divider{
    width:5px;
    height:auto;
    display:inline-block;
}
</style>