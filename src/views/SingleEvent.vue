<template>
  <div class="container">
    <div class="navbar-container">
      <navBar></navBar>
      <pageHeader page="Events" :user="user"></pageHeader>
    </div>
    <div class="page-container">
      <p>{{ $route.params.id }}</p>
    </div>
  </div>
</template>
<script>
  import navBar from "@/components/navbar.vue";
  import pageHeader from "@/components/page-header.vue";

  export default {
    name: "Dash-board",
    components: {
      navBar,
      pageHeader,
    },
    data() {
      return {
        user: this.$route.params.id,
      };
    },
    mounted(){
      this.logParam()
    },
    methods: {
    gotoLink(id) {
      console.log(id)
      this.$router.push({ path: '/events/' + id })
    },
    logParam(){
      console.log(this.$route.params.id)
    }
  }
  };
</script>

<style>
  .container {
    max-width: 1080px;
    margin: 0 auto;
    width: 100%;
    padding: 0 50px;
  }

  .page-container {
    padding: 30px 0;
  }

  .welcome-container {
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    align-items: center;
  }

  .welcome-container img {
    max-width: 300px;
  }

  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }
</style>