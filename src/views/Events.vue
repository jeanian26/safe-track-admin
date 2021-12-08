<template>
  <div class="container">
    <div class="navbar-container">
      <navBar></navBar>
      <pageHeader page="Events" :user="user"></pageHeader>
    </div>
    <div class="page-container">
      <p>This Page contains the events that was initiated by the users</p>
      <br />
      <table>
        <tr>
          <th>key</th>
          <th>UserID</th>
          <th>Location</th>
          <th>time</th>
        </tr>
        <tr
          v-for="(value, key) in eventsList"
          :key="key"
          @click="gotoLink(value['filename'])"
        >
          <td>{{ value["filename"] }}</td>
          <td>{{ value["user"] }}</td>
          <td>{{ value["location"] }}</td>
          <td>{{ getDate(value["time"]) }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar.vue";
import pageHeader from "@/components/page-header.vue";
import { getDatabase, ref, child, get } from "firebase/database";


export default {
  name: "DashBoard",
  components: {
    navBar,
    pageHeader,
  },
  data() {
    return {
      user: "text",
      eventsList: {},
    };
  },
  mounted() {
    this.getEvents();
  },
  methods: {
    gotoLink(id) {
      console.log(id);
      this.$router.push({ path: "/events/" + id });
    },

    getDate(timestamp) {
      var date = new Date(timestamp);

      return (
        date.getDate() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getFullYear() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds()
      );
    },
    getEvents() {
      const dbRef = ref(getDatabase());
      get(child(dbRef, "Events/"))
        .then((snapshot) => {
          if (snapshot.exists()) {
            let results = snapshot.val();
            console.log(typeof results);
            // Convert to an Array
            var sortable = [];
            for (var result in results) {
              sortable.push(results[result]);
            }
            sortable.sort(function (a, b) {
              console.log(a.time, b.time)
              return b.time - a.time;
            });

            this.eventsList = sortable;
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    sortFunction(a, b) {
      var dateA = new Date(a.date).getTime();
      var dateB = new Date(b.date).getTime();
      return dateA > dateB ? 1 : -1;
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
</style>