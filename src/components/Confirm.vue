<template>
    <div v-show="confirmation.visibility" class="popup-box">
        <div v-show="confirmation.visibility" class="overlay"></div>
        <div class="popup">
            <div>{{ confirmation.message }}</div>
            <div>
                <button @click="confirm(true)">OK</button>
                <button @click="confirm(false)">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
    import confirmation from "../services/confirmation";

    export default {
        name: "Confirm",

        data() {
            return {
                confirmation: confirmation,
            }
        },

        methods: {
            confirm(confim) {
                confirmation.confirm(confim);
            }
        }

    }
</script>

<style>
    .overlay {
        background-color: rgba(0,0,0,.5);
        width: 100%;
        height: 100%;
        position: absolute;
    }

    .popup-box,
    .popup {
        top: 0;
        justify-content: center;
        align-items: center;
        display: flex;
        flex-direction: column;
    }

    .popup-box {
        position: absolute;
        width: 100vw;
        height: 100vh;
    }

    .popup {
        z-index: 1;
        background-color: #fff;
        width: 300px;
        height: 200px;
        border: 1px solid black;
        box-shadow: 0 0 5px;
    }
</style>