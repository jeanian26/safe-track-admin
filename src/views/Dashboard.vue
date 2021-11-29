<!-- eslint-disable -->
<template>
  <div class="container">
    <div class="navbar-container">
      <navbar></navbar>
      <pageHeader page="Dashboard" :user="user"></pageHeader>
    </div>
    <div class="page-container">
      <div class="welcome-container">
        <img alt="Vue logo" src="../assets/logo.png" />
        <h2>SafeTrack</h2>
        <h4>
          Welcome to Safetrack security app,<br> Your own personal security system
        </h4>
      </div>
      <card header='Recent' cardTitle='Events' cardText= 0></card>
    </div>
  </div>
</template>
<script>
/* eslint-disable prettier/prettier */
import navbar from "@/components/navbar.vue";
import pageHeader from "@/components/page-header.vue";
import card from "@/components/card.vue";

export default {
  name: "Dashboard",
  components: {
    navbar,
    pageHeader,
    card
  },
  data() {
    return {
      user: "text",
    };
  },
};
</script>

<style>
.container {
  max-width: 1080px;
  margin: 0 auto;
  width: 100%;
  padding: 0 50px;
}
.page-container{
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
</style>
