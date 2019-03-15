<template>
    <div>
        <Select v-model="model" style="width:200px" @on-change="changeMethods">
            <Option v-for="item in data" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
    </div>
</template>
<script>
    export default {
        props: ['queryDataUrl', 'value'],
        data() {
            return {
                model: this.value,
                url: this.queryDataUrl,
                data: []
            }
        },
        methods: {
            changeMethods: function () {
                this.$emit('input', this.model);
            }
        },
        created: function () {
            // `this` 指向 vm 实例
            this.data = [{value: '222', label: '2'}, {value: 1, label: '3'}];
        }
    }
</script>
