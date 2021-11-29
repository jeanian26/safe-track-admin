<template>
  <div class="container">
    <div class="navbar-container">
      <navbar></navbar>
      <pageHeader page="User" :user="user"></pageHeader>
    </div>
    <div class="page-container">
      <div class="user-profile-container">
        <div class="table-container">
          <h3>User Details</h3>
          <table class="user-details-table">
            <tr>
              <td><strong>User ID:</strong></td>
              <td>{{ user }}</td>
            </tr>
            <tr>
              <td><strong>Email Address:</strong></td>
              <td>{{ email }}</td>
            </tr>
            <tr>
              <td><strong>Name:</strong></td>
              <td><input type="text" v-model="name" /></td>
            </tr>
            <tr>
              <td><strong>Phone Number:</strong></td>
              <td><input type="text" v-model="phone" /></td>
            </tr>
            <tr>
              <td><strong>Admin:</strong></td>
              <td><input type="checkbox" v-model="admin" /></td>
            </tr>
            <tr>
              <td><strong>Shake:</strong></td>
              <td><input type="checkbox" v-model="shake" /></td>
            </tr>
            <tr>
              <td><strong>Street No:</strong></td>
              <td><input type="text" v-model="str_number" /></td>
            </tr>
            <tr>
              <td><strong>Street Name:</strong></td>
              <td><input type="text" v-model="street_name" /></td>
            </tr>
            <tr>
              <td><strong>Barangay:</strong></td>
              <td><input type="text" v-model="barangay" /></td>
            </tr>
            <tr>
              <td><strong>City:</strong></td>
              <td><input type="text" v-model="city" /></td>
            </tr>
            <tr>
              <td><strong>Zipcode:</strong></td>
              <td><input type="text" v-model="zipcode" /></td>
            </tr>
            <tr>
              <td><strong>Fingerprint:</strong></td>
              <td><input type="checkbox" v-model="fingerprint" /></td>
            </tr>
            <tr>
              <td><strong>Pin Code:</strong></td>
              <td>
                <input type="checkbox" v-model="pincode" />
              </td>
            </tr>
            <tr>
              <td><strong>Active:</strong></td>
              <td>
                <input type="checkbox" v-model="status" />
              </td>
            </tr>
          </table>
          <div class="button-container">
            <button @click='updateAccounts'>SAVE</button>
            <button @click='socialNetwork'>View Network</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import navbar from "@/components/navbar.vue";
  import pageHeader from "@/components/page-header.vue";
  import { getDatabase, ref as refData, child, get, update } from "firebase/database";

  export default {
    name: "Dashboard",
    components: {
      navbar,
      pageHeader,
    },
    data() {
      return {
        user: this.$route.params.id,
        pincode: true,
        fingerprint: false,
        admin: false,
        email: "",
        name: "n/a",
        phone: "n/a",
        status: false,
        shake: false,
        barangay: "n/a",
        city: "n/a",
        str_number: "n/a",
        street_name: "n/a",
        zipcode: "n/a",
      };
    },
    mounted() {
      this.logParam();
      this.getAccount();
    },
    methods: {
      gotoLink(id) {
        console.log(id);
        this.$router.push({ path: "/events/" + id });
      },
      logParam() {
        console.log(this.$route.params.id);
      },
      getAccount() {
        const dbRef = refData(getDatabase());
        get(child(dbRef, `Accounts/${this.user}`))
          .then((snapshot) => {
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
          })
          .catch((error) => {
            console.error(error);
          });
        get(child(dbRef, `Shake/${this.user}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              let result = snapshot.val();
              this.shake = result.Activate
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });
        get(child(dbRef, `address/${this.user}`))
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
        get(child(dbRef, `fingerprint/${this.user}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              let result = snapshot.val();
              this.fingerprint = result.Activate
              console.log(result.Activate)
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      },

      updateAccounts() {
        const updates = {};
        const db = getDatabase();

        updates[`/Accounts/${this.user}/name`] = this.name;
        updates[`/Accounts/${this.user}/phone`] = this.phone;
        updates[`/Accounts/${this.user}/admin`] = this.admin;
        updates[`/Shake/${this.user}/Activate`] = this.shake;
        updates[`/address/${this.user}/barangay`] = this.barangay;
        updates[`/address/${this.user}/city`] = this.city;
        updates[`/address/${this.user}/str_number`] = this.str_number;
        updates[`/address/${this.user}/street_name`] = this.street_name;
        updates[`/address/${this.user}/zipcode`] = this.zipcode;
        updates[`/fingerprint/${this.user}/Activate`] = this.fingerprint;
        updates[`/pin/${this.user}/Activate`] = this.pincode;

        if (this.status === true) {
          updates[`/Accounts/${this.user}/status`] = "active";
        } else {
          updates[`/Accounts/${this.user}/status`] = "not active";
        }

        update(refData(db), updates).then(() => {
          alert("success")
        }).catch(() => {
          alert("error")
        });

      },
      socialNetwork(){
        console.log('click')
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

  .table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  .user-details-table td,
  .user-details-table th {
    border: none;
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
    margin-left: 50px;
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

  .button-container button {
    padding: 5px 20px;
    font-size: 18px;
    margin-left:20px
  }
</style>