<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import { passAuth, checkLoggedIn } from "../firebase.service";
import { signInWithEmailAndPassword } from "firebase/auth";
import Router from "../router";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    loginUser() {
      signInWithEmailAndPassword(passAuth(), this.email, this.password)
        .then((user) => {
          console.log(user);
          Router.push("");
        })
        .catch(() => {
          alert("Wrong Password or Username");
        });
    },
    check() {
      checkLoggedIn();
    },
  },
  mounted() {
    this.check();
  },
};
</script>
