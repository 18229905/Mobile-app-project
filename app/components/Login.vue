<template>
    <Page>
        <StackLayout>
            <TextField v-model="username" hint="username" />
            <TextField v-model="password" hint="password" />
            <Button class="h2 -primary -rounded-lg" text="Login"
                @tap="onButtonTap" />
        </StackLayout>
    </Page>
</template>

<script>
    import HelloWorld from "./HelloWorld";
    export default {
        methods: {
            onButtonTap: async function() {
                console.log("Button was pressed");
                this.account = this.username;
                this.pw = this.password;
                console.log(this.username);
                console.log(this.password);
                var response = await fetch(global.baseUrl +
                "/user/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password
                    })
                });
                if (response.ok) {
                    var abc = await response.json();
                    alert("Welcome back, " + abc.username);
                    this.$navigateTo(HelloWorld, {
                        transition: {},
                        props: {
                            data: abc
                        }
                    });
                } else if (response.status == 401) {
                    var msg = await response.json();
                    alert(msg);
                } else {
                    console.log(response.status);
                }
            }
        },
        data() {
            return {
                
            };
        }
    };
</script>

<style>
</style>