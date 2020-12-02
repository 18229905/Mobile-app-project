<template>
    <Page>
        <StackLayout>
            <Image :src="tappedQpon.image" height="300"
                stretch="aspectFill" />
            <ScrollView>
                <StackLayout class="m-10">
                    <Label class="h2" :text="tappedQpon.name" />
                    <Label class="h4" :text="tappedQpon.detail" />
                    <Label class="h4" :text="'Mall: ' + tappedQpon.detail" />
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

    export default {
        props: ["tappedQpon", "user"],
        methods: {
            onButtonTap1: async function() {
                console.log("Button was pressed");
                var result = await confirm({
                    title: "Are you sure?",
                    message: "To redeem this coupon?",
                    okButtonText: "Yes",
                    cancelButtonText: "No"
                });
                if (result && this.user.coin >= this.tappedQpon.coins && this.tappedQpon.quota >= 1) {
                    var result2 = await confirm({
                        title: "Redeem successfully",
                        okButtonText: "OK"
                    });
                } else if (result && (this.user.coin <= this.tappedQpon.coins || this.tappedQpon.quota <= 1)) {
                        var result2 = await confirm({
                            title: "No quota / Not enough coins",
                            okButtonText: "OK"
                        });
                    }
                this.$navigateBack();
                },

                onButtonTap2: function(args) {
                    console.log("onButtonTap2 " + this.tappedQpon
                        .mall);
                    this.$navigateTo(Address, {
                        transition: {},
                        props: {
                            qponmall: this.tappedQpon.mall
                        }
                    });
                }
            },
            data() {
                return {};
            }
        };
</script>

<style>
</style>