<!-- eslint-disable -->
<template>
  <div class="form-center">
    <div class="login">
      <div class="form-label">
        <span>Reset Password</span>
      </div>

      <div class="form-container">
        <input type="text" placeholder="Email Address" v-model="email" />
        <button @click="resetPassword">Login</button>
        <router-link class="router" to="/">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { passAuth } from "../firebase.service";
import { sendPasswordResetEmail } from "firebase/auth";
import Router from "../router";
export default {
  data() {
    return {
      email: "",
    };
  },

  methods: {
    resetPassword() {
      sendPasswordResetEmail(passAuth(), this.email)
      .then(() => {
        alert("Reset Succesful continue to login");
      })
      .catch((error) => {
        alert("ERROR" ,error);
      });
    },
  },
};
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px #d9d9d9;
  border-radius: 10px;
  padding: 30px;
  align-items: center;
  background-color: white;
}

.form-center {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #efefef;
}

.login img {
  max-width: 100px;
}

.form-container {
  display: flex;
  flex-direction: column;
  width: 300px;
}

#app > div > div > p {
  padding: 10px;
  font-size: 20px;
}

.login input[type="text"],
.login input[type="password"] {
  height: 30px;
  font-size: 16px;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid rgb(209, 209, 209);
}

button {
  margin-top: 10px;
  background-color: #43ca8e;
  height: 40px;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 18px;
  text-transform: uppercase;
  cursor: pointer;
}
button:hover {
  background-color: rgb(128, 199, 166);
}

.router {
  padding-top: 20px;
  text-decoration: none;
  color: rgb(0, 0, 192);
}
span {
  text-align: left;
}
.form-label {
  width: 100%;
}
</style>