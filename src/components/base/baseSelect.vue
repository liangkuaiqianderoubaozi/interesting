<template>
    <div>
        <Select v-model="value" style="width:200px" @on-change="changeMethods">
            <Option v-for="item in selectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
    </div>
</template>
<script>
    export default {
        props: ['selectList', 'message'],
        data: function () {
            return {
                selectAll: this.selectList,
                value: this.message
            }
        },
        methods: {
            changeMethods: function () {
                console.info("chile+" + this.value)
                this.$emit('modelddddd', this.value)
            }
        }
    }
</script>
