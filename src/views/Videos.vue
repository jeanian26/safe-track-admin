<template>
    <div class="container">
        <div class="navbar-container">
            <navbar></navbar>
            <pageHeader page="Video" :user="user"></pageHeader>
        </div>
        <div class="page-container">
            <p>This Page contains the Videos that was recorded by the users</p>
            <br>
            <table>
                <tr>
                    <th>Event Initiator</th>
                    <th>Time and Date</th>
                    <th>Location</th>
                </tr>
                <tr @click="gotoLink(3)">
                    <td>Alfreds Futterkiste</td>
                    <td>Sat, 2021 aug 20</td>
                    <td>Germany</td>
                </tr>
                <tr @click="gotoLink(2)">
                    <td>Alfreds Futterkiste</td>
                    <td>Sat, 2021 aug 20</td>
                    <td>Germany</td>
                </tr>
                <tr @click="gotoLink(1)">
                    <td>Alfreds Futterkiste</td>
                    <td>Sat, 2021 aug 20</td>
                    <td>Germany</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
    /* eslint-disable prettier/prettier */
    import navbar from "@/components/navbar.vue";
    import pageHeader from "@/components/page-header.vue";

    export default {
        name: "Dashboard",
        components: {
            navbar,
            pageHeader,
        },
        data() {
            return {
                user: "text",
            };
        },
        methods: {
            gotoLink(id) {
                console.log(id)
                this.$router.push({ path: '/events/' + id })
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