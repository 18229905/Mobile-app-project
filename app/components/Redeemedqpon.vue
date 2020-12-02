<template>
    <Page>
        <ListView for="qpon in qponredeemed.redeemed" @itemTap="onItemTap">
            <v-template>
                <StackLayout orientation="vertical" height="350">
                    <Label :text="qpon.restaurant" class="h2" />
                </StackLayout>
            </v-template>
        </ListView>
    </Page>
</template>

<script>
    import QponDetail from "./Qpondetail";
    export default {
        props: ["user"],
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
            var response = await fetch(
                global.baseUrl + "/user" + user.id + "/redeemed"
            );
            if (response.ok) {
                this.qponredeemed = await response.json();
                console.log(JSON.stringify(this.qponredeemed));
            } else {
                console.log(response.statusText);
            }
        },

        data() {
            return {
                qponredeemed: []
            };
        }
    };
</script>

<style>
</style>