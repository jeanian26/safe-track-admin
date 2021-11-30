<template>
  <div class="container">
    <div class="navbar-container">
      <navBar></navBar>
      <pageHeader page="Users" :user="user"></pageHeader>
    </div>
    <div class="page-container" id="user-profile">
      <div class="page-heading">
        <p>This Page contains the list users</p>
        <!-- <button @click="addNewUser()">ADD NEW USER</button> -->
        <!-- DIFFICULT TO IMPLEMENT -->
      </div>
      <br />
      <table>
        <tr>
          <th>UserID</th>
          <th>Email</th>
          <th>Name</th>
        </tr>
        <tr v-for="(value, key) in userList" :key="key" @click="gotoLink(key)">
          <td>{{ key }}</td>
          <td>{{ value["email"] }}</td>
          <td>{{ value["name"] }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar.vue";
import pageHeader from "@/components/page-header.vue";
import { getDatabase, ref as refData, child, get } from "firebase/database";

export default {
  name: "Dash-board",
  components: {
    navBar,
    pageHeader,
  },
  data() {
    return {
      user: "text",
      userList: {},
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    gotoLink(id) {
      console.log(id);
      this.$router.push({ path: "/users/" + id });
    },
    addNewUser() {
      this.$router.push({ path: "/usersadd/"});
    },
    getUser() {
      const dbRef = refData(getDatabase());
      get(child(dbRef, `Accounts/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            let result = snapshot.val();
            this.userList = result;
            // for (var key in result){
            //     console.log(result[key])
            // }
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

<style >
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
#user-profile p {
    display: inline-block;
}
#user-profile button {
    float: right;
    padding: 5px 20px;
    margin-bottom: 10px;
}
button{
    background-color:mediumseagreen;
    border: none;
    box-shadow: 5px 5px 10px rgb(165, 163, 163);
    cursor: pointer;
  }
</style>