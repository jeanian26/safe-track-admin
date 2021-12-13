<template>
  <div class="navbar">
    <div class="logo-container">
      <router-link class="router" to="/Dashboard">
        <img alt="Vue logo" src="../assets/logo.png" />
        <span>SafeTrack</span>
      </router-link>
    </div>
    <div class="navigation">
      <router-link class="router" to="/Dashboard">Dashboard</router-link>
      <router-link class="router" to="/events">Events</router-link>
      <router-link class="router" to="/Users">Users</router-link>

      <!-- <router-link class="router" to="/Account">Account</router-link> -->
      <router-link
        class="router"
        to="/Logout"
        @click.native="logout()"
        >Log Out</router-link
      >
    </div>
  </div>
</template>

<script>
import { passAuth } from "../firebase.service";
import { signOut } from "firebase/auth";
export default {
  name: "navBar",
  props: {
    msg: String,
  },
  methods: {
    logout() {
      signOut(passAuth())
        .then(() => {
          alert("Succesfully Logout");
        })
        .catch((error) => alert(error));
    },
  },
};
</script>
<style>
.navbar {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
}

.navbar .logo-container img {
  max-width: 50px;
}

.navbar .logo-container span {
  margin-left: 20px;
  font-size: 20px;
  font-weight: 600;
  color: #4a8379;
}

.navigation a.router {
  font-size: 18px;
  font-weight: 600;
  color: #4a8379;
  padding-left: 20px;
}

/* .navbar .logout-button {
  padding: 5px 20px;
  margin-left: 20px;
  border-radius: 10px;
  color: white;
  text-transform: uppercase;
} */
tr:hover{
  cursor: pointer;
  opacity: 0.7;
}

</style>