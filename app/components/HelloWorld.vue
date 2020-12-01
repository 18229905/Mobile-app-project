<template>
    <Page>
        <ActionBar title="Home" />

        <StackLayout>
            <BottomNavigation height="400px">
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
                            <StackLayout orientation="vertical" height="350">
                                <Image :src="qpon.image" height="300"
                                    stretch="aspectFill" />
                                <Label :text="qpon.title" class="h2" />
                                <Label :text="qpon.detail" class="h2" />
                                <Label :text="qpon.coins" class="h2" />
                            </StackLayout>
                        </v-template>
                    </ListView>
                </TabContentItem>
                <TabContentItem>
                    <ListView for="malls in malladdress">
                        <v-template>
                            <StackLayout orientation="vertical" height="350">
                                <Label :text="malls.mall" class="h2" />
                            </StackLayout>
                        </v-template>
                    </ListView>
                </TabContentItem>
                <TabContentItem>
                    <ListView>
                        <v-template>
                            <Label :text="Coins <= 300" class="h2" />
                            <Label :text="300 < Coins < 600" class="h2" />
                            <Label :text="Coins > 600" class="h2" />
                        </v-template>
                    </ListView>
                </TabContentItem>
                <TabContentItem>
                    <GridLayout>
                        <ListView>
                            <v-template>
                                <FlexboxLayout flexDirection="row">
                                    <Label :text="Logoff / Login" class="t-12"
                                        style="width: 60%"
                                        @itemTap="onloginTap" />
                                    <Label :text="My redeemed coupon"
                                        class="t-12" style="width: 60%" />
                                </FlexboxLayout>
                            </v-template>
                        </ListView>
                    </GridLayout>
                </TabContentItem>
            </BottomNavigation>
        </StackLayout>
    </Page>
</template>

<script>
    //import QponDetail from "./QponDetail";

    export default {
        methods: {
            onItemTap: function(args) {
                console.log("Item with index: " + args.index + " tapped");
                console.log("Qpon tapped:" + args.item.title);
                this.$navigateTo(QponDetail, {
                    transition: {},
                    props: {
                        tappedQpon: args.item
                    }
                });
            },

            onloginTap: function() {
                this.$navigateTo(Login, {
                    transition: {},
                    props: {}
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