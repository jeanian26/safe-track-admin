<template>
  <div class="form-center">
    <div class="login">
      <img alt="Vue logo" src="../assets/logo.png" />
      <br />
      <h3>SAFE TRACK</h3>
      <p>Your personal security system</p>
      <br />
      <!-- <div class="form-label">
        <span>Sign In</span>
      </div> -->

      <div class="form-container">
        <input type="text" placeholder="Email Address" v-model="email" />
        <input type="password" placeholder="Password" v-model="password" />
        <button @click="loginUser">Login</button>
        <router-link class="router" to="/passwordReset"
          >Forgot Password</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { passAuth } from "../firebase.service";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref as refData, child, get } from "firebase/database";
import Router from "../router";
export default {
  name: "HomeNavigation",
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    loginUser() {
      signInWithEmailAndPassword(passAuth(), this.email, this.password)
        .then((result) => {
          const dbRef = refData(getDatabase());
          get(child(dbRef, `Accounts/${result.user.uid}`))
            .then((snapshot) => {
              if (snapshot.exists()) {
                let result = snapshot.val();
                console.log(result.admin);
                if (result.admin === true) {
                  Router.push("dashboard");
                } else {
                  alert("Not admin");
                }
              } else {
                console.log("No data available");
              }
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch(() => {
          alert("Wrong Password or Username");
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
