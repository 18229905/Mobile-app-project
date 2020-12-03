<template>
    <Page>
        <ActionBar title="Home" />

        <StackLayout>
            <BottomNavigation>
                <TabStrip>
                    <TabStripItem>
                        <Label text="Home"></Label>
                    </TabStripItem>
                    <TabStripItem>
                        <Label text="Malls"></Label>
                    </TabStripItem>
                    <TabStripItem>
                        <Label text="Coins"></Label>
                    </TabStripItem>
                    <TabStripItem>
                        <Label text="User"></Label>
                    </TabStripItem>
                </TabStrip>
                <TabContentItem>
                    <ListView for="qpon in qpons" @itemTap="onItemTap">
                        <v-template>
                            <StackLayout orientation="vertical" height="500">
                                <Image :src="qpon.image" height="400"
                                    stretch="aspectFit" />
                                <Label :text="qpon.restaurant" class="h2" />
                                <Label :text="'Detail : ' + qpon.detail" class="h2" />
                                <Label :text="'Coins : ' + qpon.coins" class="h2" />
                            </StackLayout>
                        </v-template>
                    </ListView>
                </TabContentItem>
                <TabContentItem>
                    <ListView for="malls in malladdress" @itemTap="onmallTap">
                        <v-template>
                            <StackLayout orientation="vertical" height="350">
                                <Label :text="malls.mall" class="h2" />
                            </StackLayout>
                        </v-template>
                    </ListView>
                </TabContentItem>
                <TabContentItem>
                    <StackLayout orientation="vertical">
                        <Label text="Coins <= 300" class="h2"
                            @tap="oncoin0Tap" />
                        <Label text="300 < Coins < 600" class="h2"
                            @tap="oncoin300Tap" />
                        <Label text="Coins > 600" class="h2"
                            @tap="oncoin600Tap" />
                    </StackLayout>
                </TabContentItem>
                <TabContentItem>
                    <GridLayout>
                        <StackLayout orientation="vertical">
                            <Label text="Login" class="h2"
                                @tap="onloginTap" />
                            <Label text="My redeemed coupon" class="h2"
                                @tap="onredeemedTap" />
                            <Label text="Logout" class="h2"
                                @tap="onlogoutTap" />
                        </StackLayout>
                    </GridLayout>
                </TabContentItem>
            </BottomNavigation>
        </StackLayout>
    </Page>
</template>

<script>
    import QponDetail from "./Qpondetail";
    import Mallchoice from "./Mallchoice";
    import Login from "./Login";
    import Coinchoice from "./Coinchoice";
    import Redeemedqpon from "./Redeemedqpon";
    export default {
        props: ["data"],
        methods: {
            onItemTap: function(args) {
                console.log("Item with index: " + args.index + " tapped");
                console.log("Qpon tapped:" + args.item.title);
                this.$navigateTo(QponDetail, {
                    transition: {},
                    props: {
                        tappedQpon: args.item,
                        user: this.data
                    }
                });
            },

            onloginTap: function() {
                if (this.data != null) {
                    alert("You logged in");
                } else {
                    this.$navigateTo(Login, {
                        transition: {},
                        props: {}
                    });
                }
            },

            onlogoutTap: async function() {
                var response = await fetch(global.baseUrl +
                    "/user/logout", {
                        method: "POST"
                    });
                if (response.ok) {
                    alert("Logouted");
                    this.data = null;
                    console.log(this.data);
                } else {
                    alert(response.status + ": " + response.statusText);
                }
            },

            onredeemedTap: function() {
                this.$navigateTo(Redeemedqpon, {
                    transition: {},
                    props: {
                        user: this.data
                    }
                });
                //console.log(this.data);
            },
            onmallTap: function(args) {
                console.log("Item with index: " + args.index + " tapped");
                console.log("Qpon tapped:" + args.item.mall);
                this.$navigateTo(Mallchoice, {
                    transition: {},
                    props: {
                        tappedMall: args.item.mall,
                        user: this.data
                    }
                });
            },
            oncoin0Tap: function(args) {
                this.$navigateTo(Coinchoice, {
                    transition: {},
                    props: {
                        tappedCoin1: "300",
                        tappedCoin2: "0",
                        user: this.data
                    }
                });
            },
            oncoin300Tap: function(args) {
                this.$navigateTo(Coinchoice, {
                    transition: {},
                    props: {
                        tappedCoin1: "600",
                        tappedCoin2: "301",
                        user: this.data
                    }
                });
            },
            oncoin600Tap: function(args) {
                this.$navigateTo(Coinchoice, {
                    transition: {},
                    props: {
                        tappedCoin1: "10000",
                        tappedCoin2: "601",
                        user: this.data
                    }
                });
            }
        },

        async mounted() {
            var response = await fetch(global.baseUrl + "/qpon/json");
            if (response.ok) {
                this.qpons = await response.json();
                console.log(JSON.stringify(this.qpons));
            } else {
                console.log(response.statusText);
            }
        },
        data() {
            return {
                qpons: [],
                empty: [],

                malladdress: [{
                        mall: "IFC Mall",
                        latitude: 22.2849,
                        longitude: 114.158917
                    },
                    {
                        mall: "Pacific Place",
                        latitude: 22.2774985,
                        longitude: 114.1663225
                    },
                    {
                        mall: "Times Square",
                        latitude: 22.2782079,
                        longitude: 114.1822994
                    },
                    {
                        mall: "Elements",
                        latitude: 22.3048708,
                        longitude: 114.1615219
                    },
                    {
                        mall: "Harbour City",
                        latitude: 22.2950689,
                        longitude: 114.1668661
                    },
                    {
                        mall: "Festival Walk ",
                        latitude: 22.3372971,
                        longitude: 114.1745273
                    },
                    {
                        mall: "MegaBox ",
                        latitude: 22.319857,
                        longitude: 114.208168
                    },
                    {
                        mall: "APM",
                        latitude: 22.3121738,
                        longitude: 114.22513219999996
                    },
                    {
                        mall: "Tsuen Wan Plaza ",
                        latitude: 22.370735,
                        longitude: 114.111309
                    },
                    {
                        mall: "New Town Plaza ",
                        latitude: 22.3814592,
                        longitude: 114.1889307
                    }
                ]
            };
        }
    };
</script>

<style scoped>
    .home-panel {
        vertical-align: center;
        font-size: 20;
        margin: 15;
    }

    .description-label {
        margin-bottom: 15;
    }
</style>