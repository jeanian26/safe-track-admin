<template>
  <div class="container">
    <div class="navbar-container">
      <navBar></navBar>
      <pageHeader page="Events" :user="user"></pageHeader>
    </div>
    <div class="page-container">
      <div class="user-profile-container">
        <div class="table-container">
          <h3>Map Location</h3>
          <iframe
            width="100%"
            height="450"
            style="border: 0"
            loading="lazy"
            allowfullscreen
            :src="mapURL"
          >
          </iframe>

          <h3>Event Details</h3>
          <table class="user-details-table">
            <tr>
              <td><strong>Event ID:</strong></td>
              <td>{{ eventID }}</td>
            </tr>
            <tr>
              <td><strong>User ID:</strong></td>
              <td>{{ user }}</td>
            </tr>
            <tr>
              <td><strong>Email Address:</strong></td>
              <td>{{ email }}</td>
            </tr>
            <tr>
              <td><strong>Active:</strong></td>
              <td>
                {{ active }}
              </td>
            </tr>
            <tr>
              <td><strong>Name:</strong></td>
              <td>{{ name }}</td>
            </tr>
            <tr>
              <td><strong>Phone Number:</strong></td>
              <td>{{ phone }}</td>
            </tr>
            <tr>
              <td><strong>Address:</strong></td>
              <td>
                {{ str_number }} {{ street_name }} {{ barangay }} {{ city }}
                {{ zipcode }}
              </td>
            </tr>
            <tr>
              <td><strong>Last Known Location:</strong></td>
              <td>{{ location }}</td>
            </tr>
            <tr>
              <td><strong>Latitude:</strong></td>
              <td>{{ lat }}</td>
            </tr>
            <tr>
              <td><strong>Longitude:</strong></td>
              <td>{{ long }}</td>
            </tr>
            <tr>
              <td><strong>Time and Date Initiated:</strong></td>
              <td>{{ getDate(time) }}</td>
            </tr>
            <tr>
              <td><strong>Video filename:</strong></td>
              <td>{{ filename }}.mp4</td>
            </tr>
            <tr>
              <td><strong>Video link:</strong></td>
              <td><a :href="url">Watch Video</a></td>
            </tr>
          </table>
          <div class="button-container">
            <button class="respond" @click="resolve">RESPOND</button>
            <button class="delete" @click="deleteEvent">DELETE</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar.vue";
import pageHeader from "@/components/page-header.vue";
import {
  getDatabase,
  ref as refData,
  child,
  get,
  update,
  set
} from "firebase/database";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default {
  name: "Dash-board",
  components: {
    navBar,
    pageHeader,
  },
  data() {
    return {
      eventID: this.$route.params.id,
      filename: "",
      location: "",
      lat: "",
      long: "",
      time: "",
      user: "",
      active: false,
      name: "",
      email: "",
      url: "",
      mapURL: "",
    };
  },
  mounted() {
    this.logParam();
    this.getEventDetails();
    this.getDownloadURL();
  },
  methods: {
    gotoLink(id) {
      console.log(id);
      this.$router.push({ path: "/events/" + id });
    },
    logParam() {
      console.log(this.$route.params.id);
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

    getDownloadURL(filename) {
      const storage = getStorage();
      const storageRef = ref(storage, `videos/${filename}.mp4`);
      getDownloadURL(storageRef).then((downloadURL) => {
        console.log("File available at", downloadURL);
        this.url = downloadURL;
      });
    },
    getEventDetails() {
      const dbRef = refData(getDatabase());
      get(child(dbRef, `Events/${this.eventID}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            let result = snapshot.val();
            console.log(result);
            this.filename = result.filename;
            this.time = result.time;
            this.lat = result.lat;
            this.long = result.long;
            this.location = result.location;
            this.user = result.user;
            this.active = result.active;
            this.getUserDetails(result.user);
            this.getDownloadURL(result.filename);
            let convertedLocation = result.location;
            convertedLocation = convertedLocation.replace(/\s/g, "+");
            this.mapURL = `https://www.google.com/maps/embed/v1/place?key=AIzaSyALWJDjGJ4PDcJ5j7XZewfcdtlbwsQAxsw
&q=${convertedLocation}&center=${result.lat},${result.long}&zoom=15`;
            console.log(this.mapURL);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getUserDetails(user) {
      const dbRef = refData(getDatabase());
      get(child(dbRef, `Accounts/${user}`)).then((snapshot) => {
        if (snapshot.exists()) {
          let result = snapshot.val();
          this.admin = result.admin;
          this.email = result.email;
          this.name = result.name;
          this.phone = result.phone;
          if (result.status === "active") {
            this.status = true;
          }
        } else {
          console.log("No data available");
        }
      });
      get(child(dbRef, `address/${user}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            let result = snapshot.val();
            this.barangay = result.barangay;
            this.city = result.city;
            this.str_number = result.str_number;
            this.street_name = result.street_name;
            this.zipcode = result.zipcode;
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    resolve() {
      const updates = {};
      const db = getDatabase();
      updates[`/Events/${this.filename}/active`] = false;
      update(refData(db), updates)
        .then(() => {
          alert("success");
          this.$router.push({ path: "/events" });
        })
        .catch((error) => {
          alert(error);
        });
    },
    deleteEvent() {
      const db = refData(getDatabase());
      set(child(db, `Events/${this.filename}`), {});
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

.table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.user-details-table td,
.user-details-table th {
  border: none !important;
  text-align: left;
  padding: 15px;
  width: 50%;
}

.user-details-table tr:nth-child(even) {
  background-color: #ffffff;
}

.user-details-table tr {
  border-bottom: 1px solid #d9d9d9 !important;
}

.user-profile-container {
  display: flex;
  padding: 50px;
  margin-top: 2 0px;
  border: 1px solid #d9d9d9;
}

.user-profile-container .profile-image img {
  border-radius: 150px;
  max-width: 10em;
}

.table-container {
  flex-grow: 2;
}

.user-profile-container input {
  border: none;
  outline: none;
}

input[type="text"] {
  width: 100%;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.button-container .respond {
  padding: 5px 20px;
  font-size: 18px;
  margin-left: 20px;
}
.respond {
  background-color: mediumseagreen;
  border: none;
  padding: 5px 20px;
  box-shadow: 5px 5px 10px rgb(165, 163, 163);
  color: white;
  cursor: pointer;
}

.delete {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 20px;
  box-shadow: 5px 5px 10px rgb(165, 163, 163);
  cursor: pointer;
  margin-left: 20px;
}
</style>