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
          autocomplete="off"
        />
      </div>
      <br />
      <div>
        <button class="add-user-btn" @click="showModal = true">
          ADD NEW USER
        </button>
      </div>
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
    <transition name="modal" v-if="showModal" id="add-user-modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <h3>Add new user</h3>
            </div>

            <div class="modal-body">
              <label for="lname">Email</label>
              <input
                type="text"
                id="lname"
                placeholder="Email"
                v-model="newEmail"
                autocomplete="nope"

              />
              <label for="pass">Password</label>
              <input
                type="password"
                id="pass"
                v-model="password"
                placeholder="password"
                autocomplete="new-password"
              />
              <div>
                <button class="add-user-btn" @click="addUser">Add New User</button>
                <button
                  @click="showModal = false"
                  class="add-user-btn btn-second"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import navBar from "@/components/navbar.vue";
import pageHeader from "@/components/page-header.vue";
import { getDatabase, ref as refData, child, get } from "firebase/database";
const axios = require("axios");


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
      showModal: false,
      newEmail: "",
      password: "",
      url:'http://127.0.0.1:5000'
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
    addUser() {
      let content = {
        email: this.newEmail,
        password: this.password,
      };
      console.log(content);

      axios
        .post(this.url, content, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data === "Success") {
            this.newEmail = '';
            this.password = '';
            this.showModal = false;
            this.getUser()
            alert('Success')
          }else{
            alert(response.data)
          }
        })
        .catch((e) => alert(e));
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

#user-profile > div > input:focus {
  width: 100%;
}
.add-user-btn {
  float: none;
  background-color: mediumseagreen;
  border: none;
  box-shadow: 5px 5px 10px rgb(165, 163, 163);
  cursor: pointer;
  padding: 10px 20px;
  margin-bottom: 20px;
}

.btn-second {
  float: right;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
}

.modal-body {
  margin: 20px 0;
}

.modal-body input[type="text"],
.modal-body input[type="password"],
select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.modal-body input[type="submit"] {
  width: 100%;
  background-color: #e62222;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}


</style>

