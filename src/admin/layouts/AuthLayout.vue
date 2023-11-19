<template>
  <div class="bg-main-login">
    <div class="page">
      <div class="page-single">
        <div class="container">
          <div class="row">
            <div
                class="col-xl-5 col-lg-6 col-md-8 col-sm-8 col-xs-10 card-sigin-main py-4 justify-content-center mx-auto">
              <div class="card-sigin " style="margin-top: 140px">
                <div class="main-card-signin d-md-flex">
                  <div class="wd-100p">
                    <!--                                        <div class="d-flex mb-4">-->
                    <!--                                          <a href="{{ route('home') }}" style="margin: auto">-->
                    <!--                                            <img src="/assets/img/brand/logo.svg" class="sign-favicon"-->
                    <!--                                                 style="width: 100%"-->
                    <!--                                                 alt="logo"></a>-->
                    <!--                                        </div>-->
                    <div
                        style="display: flex; flex-direction: column; width: 100%;align-items: center; justify-content: center">
                      <img src="/assets/vnpost_logo.svg" style="width: 180px; height:135px">
                    </div>
                    <router-view/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "AuthLayout"
}
</script>

<style scoped>
#loginForm .form-control {
  width: 100%;
}

.bg-main-login {
  width: 100%;
  min-height: 100%;
  background: url("/assets/img/brand/bg_main.png") no-repeat 50% bottom, url("/assets/img/brand/bg.jpg") bottom;
  background-size: 100%;
  height: 100%;
  position: relative;
}
</style>