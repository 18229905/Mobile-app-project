import Vue from 'nativescript-vue';

import HelloWorld from './components/HelloWorld';

// Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

global.baseUrl = "https://c51ac51c5d50.ngrok.io";

new Vue({

    template: `
        <Frame>
            <HelloWorld />
        </Frame>`,

    components: {
        HelloWorld
    }
}).$start();