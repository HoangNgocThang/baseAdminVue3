<template>
    <div>
        <template v-if="errors&& errors.length > 0">
            <label class="error" v-for="err in errors" v-text="err"></label>
        </template>

    </div>
</template>

<script>
let timeOutId = false;
export default {
    props: ['errors', "for"],
    name: "Error",
    mounted() {
    },
    watch: {
        errors: function () {
            const $for = $('#' + this.for);
            if (this.for && $for.length) {
                if (timeOutId) {
                    return;
                }
                timeOutId = setTimeout(() => {
                    $('html, body').animate({
                        scrollTop: $for.offset().top - 200
                    }, 500);

                    setTimeout(() => {
                        $("label.error").effect("shake", {distance: 10});
                        timeOutId = 0;
                    }, 500)

                }, 500)
            }


        }
    }
}
</script>


