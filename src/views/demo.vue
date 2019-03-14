<template>
    <div>
        <d-select :selectList="[{value:'222',label:'2'},{value:1,label:'3'}]" :message="modelddddd"></d-select>
        <button @click="ddd">dddd</button>
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
                console.info(this.modelddddd)
            }
        }
    }
</script>