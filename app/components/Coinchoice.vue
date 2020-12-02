<template>
    <page>
        <ListView for="qpon in qponselect" @itemTap="onItemTap">
            <v-template>
                <StackLayout orientation="vertical" height="350">
                    <Label :text="qpon.restaurant" class="h2" />
                </StackLayout>
            </v-template>
        </ListView>
    </page>
</template>

<script>
    import QponDetail from "./Qpondetail";
    export default {
        props: ["tappedCoin1", "tappedCoin2","user"],

        methods: {
            onItemTap: function(args) {
                console.log("Item with index: " + args.index + " tapped");
                console.log("Qpon tapped:" + args.item.title);
                this.$navigateTo(QponDetail, {
                    transition: {},
                    props: {
                        tappedQpon: args.item,
                        user: this.user
                    }
                });
            }
        },

        async mounted() {
            console.log(this.tappedCoin1);
            console.log(this.tappedCoin2);
            var response = await fetch(global.baseUrl + "/qpon/json");
            if (response.ok) {
                this.qpons = await response.json();
                console.log(JSON.stringify(this.qpons));
            } else {
                console.log(response.statusText);
            }
            this.qponselect = this.qpons.filter(
                function(p) {
                    return (
                        p.coins <= this.tappedCoin1 && p.coins >=
                        this.tappedCoin2
                    );
                }.bind(this)
            );
            console.log(JSON.stringify(this.qponselect));
        },

        data() {
            return {
                qpons: [],
                qponselect: []
            };
        }
    };
</script>

<style>
</style>