<template>
    <div class="row">
        <div class="col-xl-8">
            <form class="form-inline form-inline-2">
                <div class="form-group mx-sm-3 mb-2">
                    <label>Tỉnh</label>
                    <input class="form-control" readonly :value="auth.province_name">
                </div>
                <div class="form-group mx-sm-3 mb-2">
                    <label>Quận/huyện </label>      <input class="form-control" readonly :value="auth.district_name">
                </div>


            </form>
        </div>

    </div>
</template>

<script>
export default {
    name: "ProvinceInfo"
}
</script>

<style scoped>

</style>
