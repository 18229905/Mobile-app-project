<template>
    <Page>
        <WebView
            :src="URI" />
    </Page>
</template>

<script>
    export default {
        props: ["qponmall"],
        methods: {},
        async mounted() {
            console.log("mounted" + this.qponmall);

            this.hkisland = this.malladdress.filter(
                function(p) {
                    return p.mall == this.qponmall;
                }.bind(this)
            );

            console.log(JSON.stringify(this.hkisland));
            this.URI = encodeURI(
                "https://leaflet-api.vercel.app?center=" +  this.hkisland[0].latitude +  "," +  this.hkisland[0].longitude +  "&zoom=17&marker=" + this.hkisland[0].mall + "|" +this.hkisland[0].latitude +"," +  this.hkisland[0].longitude +
                "&sensor="
            );
            console.log(this.URI);
        },
        data() {
            return {
                URI:'',
                malladdress: [{
                        mall: "IFC Mall",
                        region: "HK Island",
                        latitude: 22.2849,
                        longitude: 114.158917
                    },
                    {
                        mall: "Pacific Place",
                        region: "HK Island",
                        latitude: 22.2774985,
                        longitude: 114.1663225
                    },
                    {
                        mall: "Times Square",
                        region: "HK Island",
                        latitude: 22.2782079,
                        longitude: 114.1822994
                    },
                    {
                        mall: "Elements",
                        region: "Kowloon",
                        latitude: 22.3048708,
                        longitude: 114.1615219
                    },
                    {
                        mall: "Harbour City",
                        region: "Kowloon",
                        latitude: 22.2950689,
                        longitude: 114.1668661
                    },
                    {
                        mall: "Festival Walk ",
                        region: "Kowloon",
                        latitude: 22.3372971,
                        longitude: 114.1745273
                    },
                    {
                        mall: "MegaBox ",
                        region: "Kowloon",
                        latitude: 22.319857,
                        longitude: 114.208168
                    },
                    {
                        mall: "APM",
                        region: "Kowloon",
                        latitude: 22.3121738,
                        longitude: 114.22513219999996
                    },
                    {
                        mall: "Tsuen Wan Plaza ",
                        region: "NT",
                        "latitude ": 22.370735,
                        longitude: 114.111309
                    },
                    {
                        mall: "New Town Plaza ",
                        region: "NT",
                        latitude: 22.3814592,
                        longitude: 114.1889307
                    }
                ]
            };
        }
    };
</script>

<style>
</style>