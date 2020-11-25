<template>
    <div id="app">
        <router-view/>
    </div>
</template>


<script>
    import {mapMutations} from "vuex";

    export default {
        name: "app",
        data() {
            return {}

        },
        created() {
            let _this = this;
            const Socket = window.WebSocket || window.MozWebSocket
            const url = 'ws://127.0.0.1:4433'
            const ws = new Socket(url)
            ws.onopen = (event) => {
                ws.send('hello webSocket')
            }
            ws.onmessage = (event) => {
                if (event.data === 'IN' || event.data === 'keep') {
                    _this.usbState(true);
                } else if (event.data === 'OFF') {
                    _this.usbState(false);
                }
            }
            ws.onerror = (event) => {
                // 错误  提示下载UKey插件

            }
        },
        methods: {
            ...mapMutations(['usbState'])
        }
    }

</script>

<style lang="scss">
    html, body {
        height: 100%;
        padding: 0;
        margin: 0;
    }

    #app {
        font-family: "Microsoft YaHei", Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
