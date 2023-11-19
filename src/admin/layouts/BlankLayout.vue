<template>
  <div id="userLayout" :class="['user-layout-wrapper']">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'BlankRegisterLayout'

}
</script>

<style lang="scss" scoped>
#userLayout.user-layout-wrapper {
  height: 100%;

  &.mobile {
    .container-blank-layout {
      .main {
        max-width: 368px;
        width: 98%;
      }
    }
  }

  .container-blank-layout {
    //width: 100%;
    //min-height: 100%;
    ////background: url('../assets/bg.jpg') ;
    //background: url('/public/bg.jpg') repeat;
    //background-size: 100%;
    //height: 100%;

    width: 100%;
    min-height: 100%;
    background: url("/assets/img/brand/bg_main.png") no-repeat 50% bottom, url("/public/bg.jpg") bottom;
    background-size: 100%;
    height: 100%;

    /* Center and scale the image nicely */
    padding: 30px 0 0 0;
    position: relative;

    a {
      text-decoration: none;
    }

    .top {
      text-align: center;

      .header {
        height: 44px;
        line-height: 44px;

        .badge {
          position: absolute;
          display: inline-block;
          line-height: 1;
          vertical-align: middle;
          margin-left: -12px;
          margin-top: -10px;
          opacity: 0.8;
        }

        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
          border-style: none;
        }

        .title {
          font-size: 33px;
          color: rgba(0, 0, 0, .85);
          font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }

      .desc {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }

    .main {
      min-width: 260px;
      width: 368px;
      margin: 0 auto;
    }

    .footer {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 0 16px;
      margin: 48px 0 24px;
      text-align: center;

      .links {
        margin-bottom: 8px;
        font-size: 14px;

        a {
          color: rgba(0, 0, 0, 0.45);
          transition: all 0.3s;

          &:not(:last-child) {
            margin-right: 40px;
          }
        }
      }

      .copyright {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
      }
    }
  }
}
</style>
