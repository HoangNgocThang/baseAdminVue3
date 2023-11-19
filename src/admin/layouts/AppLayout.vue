<template>
    <AuthLayout v-if="route.meta.layout==='auth'"/>
    <BlankLayout v-else-if="route.meta.layout==='blank'"/>
    <div v-else class="page">
        <div>
            <NavBar/>
            <div class="jumps-prevent" style="padding-top: 63px;"></div>
            <SideBar/>
            <div class="jumps-prevent" style="padding-top: 63px;"></div>
        </div>

        <router-view/>

        <SiteFooter/>
    </div>
</template>
<script setup>
    import {useRoute} from "vue-router";
    import BlankLayout from "@/admin/layouts/BlankLayout.vue";

    const route = useRoute();

</script>
<script>
import AuthLayout from "@/admin/layouts/AuthLayout.vue";
import SideBar from "@/admin/includes/SideBar.vue";
import NavBar from "@/admin/includes/NavBar.vue";
import SiteFooter from "@/admin/includes/SiteFooter.vue";

export default {
    name: "AppLayout",
    components: {SiteFooter, NavBar, SideBar, AuthLayout},
    mounted() {
    },
    data() {
        return {}
    }
}
</script>

<style scoped>

</style>
