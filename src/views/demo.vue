<template>
    <div>
        <d-select v-bind:queryDataUrl="22222" v-model="modelddddd" ></d-select>
        <button @click="ddd">dddd</button>

        <div>
            <router-view/>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                modelddddd: 1
            }
        },
        methods: {
            ddd: function () {
                this.$router.push({name: 'index'});
                console.info(this.modelddddd)
            }
        }
    }
</script>