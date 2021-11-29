<!-- /* eslint-disable prettier/prettier */ -->
<template>
    <div class="card-container">
        <div class="card-header">{{ header }}</div>
        <div class="card-body">
            <h5 class="card-title">{{ cardTitle }}</h5>
            <p class="card-text">
                {{ cardText }}
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "card",
        props: {
            header: String,
            cardTitle: String,
            cardText: String,
        },
    };
</script>

<style >
    .card-container {
        max-width: 20rem;
        padding: 20px;
        border-radius: 10px;
        margin: 30px auto;
        border: 1px solid rgb(133, 133, 133);
    }

    .card-header {
        font-size: 16px;
        padding-bottom: 10px;
        border-bottom: 1px solid rgb(187, 187, 187);
    }

    h5.card-title {
        font-size: 32px;
    }

    p.card-text {
        font-size: 4rem;
    }
</style>