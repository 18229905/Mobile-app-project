<template>
    <Page>
        <StackLayout>
            <Image :src="tappedQpon.image" height="400"
                stretch="aspectFit" />
            <ScrollView>
                <StackLayout class="m-10">
                    <Label class="h2" :text="tappedQpon.restaurant" />
                    <Label class="h4" :text="'Detail: ' + tappedQpon.detail" />
                    <Label class="h4" :text="'Mall: ' + tappedQpon.mall" />
                    <Label class="h4" :text="'Coins: ' + tappedQpon.coins" />
                    <Label class="h4"
                        :text="'Expiry Date: ' + tappedQpon.date" />

                    <Button class="h2 -primary -rounded-lg" text="Reedem"
                        @tap="onButtonTap1" />
                    <Button class="h2 -primary -rounded-lg" text="Address"
                        @tap="onButtonTap2" />

                </StackLayout>
            </ScrollView>
        </StackLayout>
    </Page>
</template>

<script>
    import Address from "./Address";
    import Login from "./Login";

    export default {
        props: ["tappedQpon", "user"],
        methods: {
            onButtonTap1: async function() {
                //console.log("Button was pressed");
                //console.log(this.user);
                var result = await confirm({
                    title: "Are you sure?",
                    message: "To redeem this coupon?",
                    okButtonText: "Yes",
                    cancelButtonText: "No"
                });

                if (this.user != null) {
                    if (result && this.qponredeemed.coin >= this.tappedQpon.coins && this.tappedQpon.quota >= 1) {
                    var response = await fetch(
                        global.baseUrl + "/qpon/read/" + this
                        .tappedQpon.id, {
                            method: "POST"
                        }
                    );
                    if (response.ok) {
                        console.log("ok");
                        var result2 = await confirm({
                            title: "Redeem successfully",
                            okButtonText: "OK"
                        });
                        this.$navigateBack();
                    } else {
                        alert("You have already redeeded!");
                        console.log(response.statusText);
                    }
                } else if (
                    result &&
                    (this.qponredeemed.coin <= this.tappedQpon.coins ||
                        this.tappedQpon.quota <= 1)
                ) {
                    var result2 = await confirm({
                        title: "No quota / Not enough coins",
                        okButtonText: "OK"
                    });
                }
                } else {
                    alert("You haven't login. Please login!");
                    this.$navigateTo(Login, {
                    transition: {},
                    props: {}
                });
                }
                
            },

            onButtonTap2: function(args) {
                //console.log("onButtonTap2 " + this.tappedQpon.mall);
                this.$navigateTo(Address, {
                    transition: {},
                    props: {
                        qponmall: this.tappedQpon.mall
                    }
                });
            }
        },

        async mounted() {
            //console.log(this.user.id);
            var response = await fetch(
                global.baseUrl + "/user/" + this.user.id + "/redeemed"
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