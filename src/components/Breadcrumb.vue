<template>
    <ol class="breadcrumb">
        <template v-for="bcName in entries">
            <li v-if="bcName == entries[entries.length-1]" class="breadcrumb-item tx-15"><a style="color: #0090d0!important;" :href="bcName.href">{{bcName.name}}</a></li>
            <li v-else class="breadcrumb-item tx-15"><a :href="bcName.href">{{bcName.name}} </a></li>
        </template>
    </ol>
</template>

<script>
export default {
    name: "Breadcrumb",
    props: ['entries']
}
</script>

<style scoped>

</style>
