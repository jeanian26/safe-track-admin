<!-- eslint-disable -->
<template>
  <div class="container">
    <div class="navbar-container">
      <navBar></navBar>
      <pageHeader page="Dashboard" :user="user"></pageHeader>
    </div>
    <div class="page-container">
      <div class="welcome-container">
        <img alt="Vue logo" src="../assets/logo.png" />
        <h2>SafeTrack</h2>
        <h4>
          Welcome to Safetrack security app,<br />
          Your own personal security system
        </h4>
      </div>
      <card-component
        header="Recent"
        cardTitle="Events"
        :cardText="eventsCount"
      ></card-component>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar.vue";
import pageHeader from "@/components/page-header.vue";
import cardComponent from "@/components/card.vue";
import { getDatabase, ref, child, get } from "firebase/database";

export default {
  name: "Dash-board",
  components: {
    navBar,
    pageHeader,
    cardComponent,
  },
  data() {
    return {
      user: "text",
      eventsCount:'',
    };
  },
  mounted() {
    this.getEvents();
  },
  methods: {
    getEvents() {
      const dbRef = ref(getDatabase());
      get(child(dbRef, "Events/"))
        .then((snapshot) => {
          if (snapshot.exists()) {
            let result = snapshot.val();
            console.log(typeof result)
            var size = Object.keys(result).length
            this.eventsCount = size
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
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
</style>
