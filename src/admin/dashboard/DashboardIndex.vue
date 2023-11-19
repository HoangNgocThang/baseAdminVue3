<template>
    <div class="main-content app-content"> <!-- container -->
        <div class="main-container container-fluid"> <!-- breadcrumb -->
            <div class="breadcrumb-header justify-content-between">
<!--                <div class="left-content"><span class="main-content-title mg-b-0 mg-b-lg-1">DASHBOARD</span></div>-->
                <div class="justify-content-center mt-2">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item tx-15"><a href="javascript:void(0);">TRANG CHỦ</a></li>
                        <li class="breadcrumb-item tx-15 active" aria-current="page">DASHBOARD</li>
                    </ol>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-sm-12">
                    <div class="card" style="width: 90%">

                        <div class="card-body row">
                            <div class="col-xl-7 col-md-7 col-xs-12 float-left">
                                <div class="font-weight-bold my-5 font-large">
                                    PostPay là hệ sinh thái thanh toán được phát triển bởi Tổng công ty Bưu Điện Việt
                                    Nam,
                                    được Ngân hàng Nhà nước cấp phép số 13/GP-NHNN ngày 12/04/2021
                                </div>
                                <div class="d-flex mt-5">
                                    <div>
                                        <img src="/assets/img/qr-taiapp.svg">
                                    </div>
                                    <div>
                                        <div class="mt-2 font-large mb-5">Cùng trải nghiệm PostPay<br>
                                            Ứng dụng thuần Việt dành cho người Việt
                                        </div>
                                        <ul>
                                            <li style="padding-right: 2px">
                                                <a href="https://postpay.vn/tai-app/ios" target="_blank">
                                                    <img class="btn-download-app" src="/assets/img/btn-app-store.svg">
                                                </a>

                                            </li>
                                            <li>
                                                <a href="https://play.google.com/store/apps/details?id=com.vnpost.postpay">
                                                    <img class="btn-download-app" src="/assets/img/btn-google-play.svg">
                                                </a>

                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                            <div class="col-xl-5 col-md-5 col-xs-12 float-right">
                                <img src=/assets/img/image-in-banner.png>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {$get} from "@/lib/utils";

export default {
    name: "DashboardIndex",
    components: {},
    data() {
        return {

        }
    },
    mounted() {
    },
    methods: {
        onUpdateQuarter(value) {
            $router.setQuery({
                type: this.filter.type,
                quarter: value.quarter,
                year: value.year
            })
        },
        filterClear() {
            for (const key in this.filter) {
                this.filter[key] = '';
            }
            $router.setQuery({});
        },
        doFilter(field, value, event) {
            if (event) {
                event.preventDefault();
            }
            const params = {page: 1};
            params[field] = value;
        }
    }
}
</script>

<style scoped>
.font-large {
    font-size: 18px;
}

.btn-download-app {
    width: 170px;
}

.box-search {
    width: 90%;
    min-height: 150px;
    border: 1px solid #000;
    border-radius: 5px
}

.btn-export {
    margin-left: auto;
    order: 2;
    padding-right: 10px;
}

ul {
    margin-top: 58px !important;
    margin-left: 0 !important;
    padding-left: 0 !important;
    margin-bottom: 10px;
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
}

ul li {
    list-style: none;
    display: inline-block;
}

</style>
