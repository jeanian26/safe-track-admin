<template>
  <div class="container">
    <div class="navbar-container">
      <navbar></navbar>
      <pageHeader page="Users" :user="user"></pageHeader>
    </div>
    <div class="page-container">
      <p>This Page contains the list users</p>
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
/* eslint-disable prettier/prettier */
    import navbar from "@/components/navbar.vue";
    import pageHeader from "@/components/page-header.vue";
    import { getDatabase, ref as refData, child, get } from "firebase/database";


    export default {
        name: "Dashboard",
        components: {
            navbar,
            pageHeader,
        },
        data() {
            return {
                user: "text",
                userList:{},
            };
        },
        mounted() {
            this.getUser()
        },
        methods: {
            gotoLink(id) {
                console.log(id)
                this.$router.push({ path: '/users/' + id })
            },
            getUser() {
                const dbRef = refData(getDatabase());
                get(child(dbRef, `Accounts/`))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            let result = snapshot.val();
                            this.userList = result
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
            }
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
</style>