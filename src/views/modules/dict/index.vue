<template>
    <div>
        <d-select v-bind:queryDataUrl="22222" v-model="modelddddd"></d-select>
        <button @click="ddd">dddd</button>

    </div>
</template>

<script>
    import {post} from '../../../api/axios.api'

    export default {
        data() {
            return {
                modelddddd: 1
            }
        },
        methods: {
            ddd: function () {
                post({url: "/admin/getdemo", param: {11:11}}).then(req => {

                }).then(res => {

                })
            }
        }
    }
</script>