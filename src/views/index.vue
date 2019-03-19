<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        height: 100%;
    }

    .layout-logo {
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }

    .layout-nav {
        width: 420px;
        margin: 0 auto;
    }

    .layout-assistant {
        width: 300px;
        margin: 0 auto;
        height: inherit;
    }

    .layout-breadcrumb {
        padding: 10px 15px 0;
    }

    .layout-content {
        min-height: 100%;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }

    .layout-content-main {
        padding: 10px;
    }

    .layout-copy {
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
</style>
<template>
    <div class="layout">
        <div class="layout-content">
            <Row>
                <i-col span="5" class="layout-menu-left">
                    <Menu :theme="theme2" :open-keys="['1']" accordion @on-select="toMenu">
                        <Submenu name="11" key="1">
                            <template slot="title">
                                <Icon type="ios-paper"></Icon>
                                内容管理
                            </template>
                            <Menu-item name="11" key="1-1">文章管理</Menu-item>
                            <Menu-item name="22" key="1-2">评论管理</Menu-item>
                            <Menu-item name="33" key="1-3">举报管理</Menu-item>
                        </Submenu>
                    </Menu>
                </i-col>
                <i-col span="19">
                    <div class="layout-header"></div>
                    <div class="layout-content">
                        <div class="layout-content-main">
                            <router-view/>
                        </div>
                    </div>
                </i-col>
            </Row>
        </div>
        <div class="layout-copy">
            2011-2016 &copy; TalkingData
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                theme2: 'light'
            }
        },
        methods: {
            toMenu: function () {
                // console.info(11111);
                this.$router.push({name: 'demo'});
            }
        }
    }
</script>