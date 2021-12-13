<template>
  <div class="page-header">
    <h2>{{ page }}</h2>
    <h2>Welcome,{{ user }}</h2>
  </div>
</template>
<script>
import { passAuth } from "../firebase.service";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref as refData, child, get } from "firebase/database";
import Router from "../router";
export default {
  name: "pageHeader",
  props: {
    page: String,
  },
  data() {
    return {
      user: "",
    };
  },
  mounted() {
    this.checkLoggedIn();
  },
  methods: {
    loginUser() {
      signInWithEmailAndPassword(passAuth(), this.email, this.password)
        .then((user) => {
          console.log(user);
          Router.push("Dashboard");
        })
        .catch(() => {
          alert("Wrong Password or Username");
        });
    },
    checkLoggedIn() {
      onAuthStateChanged(passAuth(), (user) => {
        if (user) {
          // const uid = user.uid;
          console.log(user.uid);
          const dbRef = refData(getDatabase());
          get(child(dbRef, `Accounts/${user.uid}`))
            .then((snapshot) => {
              if (snapshot.exists()) {
                let result = snapshot.val();
                console.log(result);
                this.user = result.name;
              } else {
                console.log("No data available");
              }
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          console.log("no user logged in");
          Router.push("/");
        }
      });
    },
  },
};
</script>

<style scoped>
.page-header h2 {
  display: inline-block;
}

.page-header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid #d9d9d9;
}
</style>