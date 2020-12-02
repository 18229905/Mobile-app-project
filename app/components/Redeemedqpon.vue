<template>
    <Page>

        <ListView for="qpon in qponredeemed.redeemed" @itemTap="onItemTap">
            <v-template>
                <StackLayout orientation="vertical" height="350">
                    <Label :text="qpon.restaurant" class="h2" />
                    <Label :text="qpon.mall" class="h4" />
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
            console.log(this.user.id);
            var response = await fetch(
                global.baseUrl + "/user/" + this.user.id + "/redeemed"
            );
            if (response.ok) {
                this.qponredeemed = await response.json();
                console.log(JSON.stringify(this.qponredeemed));
            } else {
                var result = await confirm({
                    title: "Conflict",
                    okButtonText: "OK"
                });
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