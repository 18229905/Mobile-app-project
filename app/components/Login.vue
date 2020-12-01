<template>
    <Page>
        <StackLayout>
            <TextField v-model="username" hint="username" />
            <TextField v-model="password" hint="password" />
        </StackLayout>
    </Page>
</template>

<script>
    export default {
        data() {
            return {
                textFieldValue: ""
            };
        }
    };
</script>

<style>
</style>