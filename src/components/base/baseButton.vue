<template>
    <div >
        <Select v-model="message" style="width:200px" >
            <Option v-for="item in selectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
    </div>
</template>
<script>
    export default {
        props:['selectList','message'],
    }
</script>
