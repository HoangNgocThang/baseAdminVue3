<template>
  <div class="main-header side-header sticky nav nav-item " style="margin-bottom: -63px;">
    <div class=" main-container container-fluid">
      <div class="main-header-left ">
        <div class="responsive-logo"><a href="/" class="header-logo">
<!--          <img src="/assets/img/brand/logo.svg" class="mobile-logo logo-1" alt="logo">-->
<!--          <img src="/assets/img/brand/logo.svg" class="mobile-logo dark-logo-1" alt="logo">-->
          <img src="/assets/vnpost_logo.svg" style="width: 100px; height: 50px; object-fit: contain" alt="logo" >
        </a></div>
        <div class="app-sidebar__toggle" data-bs-toggle="sidebar">
          <a class="open-toggle" href="javascript:void(0);" @click.prevent="toggleMinimizedMenu(true)"><i
              style="color: #0090D0" class="header-icon fe fe-align-left"></i></a>
          <a class="close-toggle primary" href="javascript:void(0);" @click.prevent="toggleMinimizedMenu(false)">
            <i class="header-icon fe fe-x" style="color: #0090D0"></i>
          </a>
        </div>
        <div class="logo-horizontal"><a href="/" class="header-logo">
<!--          <img src="/assets/img/brand/logo.svg" class="mobile-logo logo-1" alt="logo">-->
<!--          <img src="/assets/img/brand/logo.svg" class="mobile-logo dark-logo-1" alt="logo">-->
        </a></div>
        <div class="main-header-center ms-4 d-sm-none d-md-none d-lg-block form-group"
             style="font-size: 20px;font-weight: 500;color: #0090D0">
          <!--                    {{ auth.full_name }}-->
        </div>
      </div>
      <div class="main-header-right">
        <button class="navbar-toggler navresponsive-toggler d-lg-none ms-auto" type="button"
                data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent-4"
                aria-controls="navbarSupportedContent-4" aria-expanded="false"
                aria-label="Toggle navigation"><span
            class="navbar-toggler-icon fe fe-more-vertical "></span></button>
        <div class="mb-0 navbar navbar-expand-lg navbar-nav-right responsive-navbar navbar-dark p-0">
          <div class="collapse navbar-collapse" id="navbarSupportedContent-4">
            <ul class="nav nav-item header-icons navbar-nav-right ms-auto">
              <div
                  style="display: flex; justify-content: center;align-items: center; font-weight: 500; font-size: 14px;">
                {{ full_name }}
              </div>

              <li class="dropdown main-profile-menu nav nav-item nav-link ps-lg-2"><a
                  class="new nav-link profile-user d-flex" href="javascript:;"
                  data-bs-toggle="dropdown"><img :alt="full_name" :src="avatar"
                                                 class=""></a>
                <div class="dropdown-menu">
                  <div class="menu-header-content p-3 border-bottom">
                    <div class="d-flex wd-100p">
                      <div class="main-img-user"><img :alt="full_name" :src="avatar"
                                                      class=""></div>
                      <div class="ms-3 my-auto"><h6
                          class="tx-15 font-weight-semibold mb-0" v-text="full_name"></h6>
                        <span
                            class="dropdown-title-text subtext op-6  tx-12"></span>
                      </div>
                    </div>
                  </div>

                  <div class="dropdown-item" @click="onClickInfoPer">
                    <i class="far fa-arrow-alt-circle-left"></i>Tài khoản cá nhân
                  </div>
                  <router-link class="dropdown-item" to="/account-info">
                    <i class="far fa-arrow-alt-circle-left"></i>Thông tin tài khoản
                  </router-link>
                  <div class="dropdown-item" @click="onClickChangePassword">
                    <i class="far fa-arrow-alt-circle-left"></i>Đổi mật khẩu
                  </div>
                  <div class="dropdown-item" @click="onClickLogout">
                    <i class="far fa-arrow-alt-circle-left"></i> Đăng xuất
                  </div>

                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="d-flex"></div>
      </div>
    </div>
  </div>
  <ModalForm
      v-if="visible"
      ref="modalFormComponent"
      @closeModal="closeModal"
      :visible-modal-form="visible"/>
  <ModalFormChangePassword
      v-if="visibleChangePassword"
      ref="modalForm"
      @closeModal="closeModalFormChangePassword"
      :visible-modal-form="visibleChangePassword"/>
</template>

<script>
import ModalForm from '../../components/ModalForm.vue';
import {removeAccessToken} from "@/lib/auth";
import {useAuthStore} from "@/store/auth";
import {mapActions, mapState} from "pinia";
import {RESET_AUTH, SAVE_AUTH} from "@/store/actionTypes";
import {$get, $post} from "@/lib/utils";
import ModalFormChangePassword from "@/components/ModalFormChangePassword.vue";
import {API_CODE} from "@/define";

const storageKey = 'MENU_MINIMIZED';

export default {
  name: "NavBar",
  components: {
    ModalFormChangePassword,
    ModalForm
  },
  setup() {
    const authStore = useAuthStore()

    return {authStore}
  },
  data() {
    return {
      visible: false,
      visibleChangePassword: false,
      full_name: '',
      avatar: 'https://www.gravatar.com/avatar/dasd?s=128&d=identicon'
    }
  },
  computed: {
    ...mapState(useAuthStore, {
      auth: 'auth',
    }),
  },
  mounted() {
    if (this.authStore.auth != null) {
      this.full_name = this.auth?.userInfo?.fullName
    }
    const value = localStorage.getItem(storageKey);
    if (value === '1') {
      this.toggleMinimizedMenu(true);
    }
  },
  methods: {
    ...mapActions(useAuthStore, {
      SAVE_AUTH,
      RESET_AUTH
    }),
    async onLogout() {
      try {
        removeAccessToken()
        this.authStore.RESET_AUTH()
        this.$router.push({name: 'login'})
        const res = await $post('/ew-web/user/auth/v1/logout')
        // const {code} = res;
        // if (code === API_CODE.SUCCESS) {
        //
        // }
      } catch (e) {
        console.log(e)
      }
    },
    onClickLogout() {
      this.onLogout()
    },
    onClickInfoPer() {
      // console.log("aAAA", this.auth,)
      this.visible = true
    },
    closeModal(reload = false) {
      // console.log('r', reload)
      this.visible = false
    },
    onClickChangePassword() {
      this.visibleChangePassword = true
    },
    closeModalFormChangePassword(reload = false) {
      this.visibleChangePassword = false
    },
    changeDB() {
      this.$refs.modalSelectDB.show();
    },
    toggleMinimizedMenu(value) {
      if (value) {
        localStorage.setItem(storageKey, '1');
        $(document.body).addClass('sidenav-toggled');
      } else {
        localStorage.setItem(storageKey, '0');
        $(document.body).removeClass('sidenav-toggled');
      }

    }
  }
}
</script>

<style scoped>

</style>
