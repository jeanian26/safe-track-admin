<template>
  <div class="container">
    <div class="navbar-container">
      <navBar></navBar>
      <pageHeader page="Users" :user="user"></pageHeader>
    </div>
    <div class="page-container" id="user-profile">
      <div class="page-heading">
        <p>This Page contains the list users</p>
        <br />
        <br />
        <input
          type="text"
          name="search"
          class="search"
          placeholder="Search.."
          v-model="searchValue"
          v-on:keyup="onChangeSearch"
        />
      </div>
      <br />
      <table>
        <tr>
          <th>UserID</th>
          <th>Email</th>
          <th>Name</th>
        </tr>
        <tr v-for="(value, key) in userList" :key="key" @click="gotoLink(key)">
          <td>{{ value["UserID"] }}</td>
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
      userList: [],
      searchValue: "",
      orginalUserList: [],
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    onChangeSearch() {
      this.userList = this.orginalUserList;
      if (this.searchValue.length === 0) {
        this.getUser();
        return;
      }
      let originalList = this.userList;
      let searchValue = this.searchValue;
      let newlist = [];
      Object.keys(originalList).forEach(function (key) {
        if (key.toLowerCase().startsWith(searchValue.toLowerCase())) {
          // console.log(typeof originalList[key]);
          newlist.push(originalList[key]);
        }
      });
      this.userList = newlist;
      console.log(newlist);
    },

    // filter(data){
    //   console.log("data",data)
    //   return data
    // },
    gotoLink(id) {
      console.log(id);
      this.$router.push({ path: "/users/" + id });
    },
    addNewUser() {
      this.$router.push({ path: "/usersadd/" });
    },
    getUser() {
      const dbRef = refData(getDatabase());
      get(child(dbRef, `Accounts/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            let result = snapshot.val();
            this.userList = result;
            this.orginalUserList = result;
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
#user-profile p {
  display: inline-block;
}
#user-profile button {
  float: right;
  padding: 5px 20px;
  margin-bottom: 10px;
}
button {
  background-color: mediumseagreen;
  border: none;
  box-shadow: 5px 5px 10px rgb(165, 163, 163);
  cursor: pointer;
}

#user-profile > div > input {
  width: 130px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
  background-position: 10px 10px;
  background-repeat: no-repeat;
  padding: 12px 20px 12px 20px;
  transition: width 0.4s ease-in-out;
}

#user-profile > div > input:focus{
  width: 100%;
}
</style>

