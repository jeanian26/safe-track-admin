<template>
  <div class="container">
    <div class="navbar-container">
      <navBar></navBar>
      <pageHeader page="new users" :user="user"></pageHeader>
    </div>
    <div class="page-container" id="user-profile">
      <div class="form-container">
          <label for="fname">Email</label>
          <input
            type="Email"
            id="fname"
            name="Email"
            placeholder="Email Address"
            autocomplete="off"
            v-model="email"
          />

          <label for="lname">Password</label>
          <input
            type="Password"
            id="lname"
            name="Password"
            placeholder="Password"
            autocomplete="off"
            v-model="password"
          />
          <br />
          <br />
          <button @click="createNewAccount()">ADD NEW USER</button>
      </div>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar.vue";
import { passAuth } from "../firebase.service";
import pageHeader from "@/components/page-header.vue";
import { getDatabase, ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default {
  name: "newUsers",
  components: {
    navBar,
    pageHeader,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  mounted() {},
  methods: {
    createNewAccount() {
      try {
        createUserWithEmailAndPassword(
          passAuth(),
          this.email,
          this.password
        )
          .then((result) => {
            const user = result.user;
            console.log(user.uid);
            const db = getDatabase();
            set(ref(db, `Accounts/${user.uid}`), {
              email: this.email,
              name: "",
              phone: "",
              admin: false,
              status: "active",
            }).then(()=>{
              alert("Success")
              this.$router.push({ path: "/users"});
            });
          })
          .catch((error) => {
            alert(error);
          });
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>

<style >
.container {
  max-width: 1080px;
  margin: 0 auto;
  width: 100%;
  padding: 0 50px;
  height: 100vh;
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

.form-container input[type="text"],
.form-container input[type="password"],
.form-container input[type="email"],
.form-container select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-container input[type="submit"] {
  width: 100%;
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-container input[type="submit"]:hover {
  background-color: #45a049;
}
.form-container {
  width: 50%;
  margin: 0 auto;
}
button {
  background-color: mediumseagreen;
  border: none;
  box-shadow: 5px 5px 10px rgb(165, 163, 163);
  cursor: pointer;
  padding: 5px 20px;
}
</style>