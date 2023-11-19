<template>
  <div class="sticky dark-theme" style="margin-bottom: -63px;">
    <aside id="sidebar" ref='sidebar' class="app-sidebar ps--active-y navbar-nav-scroll">

      <div class="main-sidebar-header active"><a class="header-logo active d-flex" href="/">
        <!--                <img src="/assets/img/brand/logo.svg" class="main-logo desktop-logo" alt="logo">-->
        <!--                <img src="/assets/img/brand/logo.svg" class="main-logo desktop-logo desktop-dark" alt="logo">-->
        <!--                <img src="/assets/img/brand/vnpost_logo.svg" style="position: absolute" class="main-logo  mobile-logo" alt="logo">-->
        <!--                <img src="/assets/img/brand/vnpost_logo.svg" class="main-logo  mobile-dark" alt="logo">-->
          <img src="/images/logo.png"  class="main-logo desktop-logo" alt="logo" style="object-fit: contain">
          <img src="/images/logo.png"  class="main-logo desktop-logo desktop-dark" alt="logo" style="object-fit: contain">
      </a></div>
      <div class="main-sidemenu is-expanded">
        <div class="slide-left disabled active d-none" id="slide-left">
          <svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24"
               viewBox="0 0 24 24">
            <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
          </svg>
        </div>
        <ul class="side-menu open" style="margin-right: 0px;">
          <li class="slide " v-for="(menu,index) in menus" :key="index" :class="{'is-expanded':menu.showSubMenu }">
            <router-link class="side-menu__item"
                         :class="{'is-expanded':menu.showSubMenu }"
                         @click="toggleMenu(menu)"
                         data-bs-toggle="slide" :to="menu.url ?? 'javascript:;'">
              <i :class="menu.icon"/>
              <span class="side-menu__label">{{ menu.name }}</span>
              <i v-if="menu.subs && menu.subs.length" class="angle fe fe-chevron-right"></i></router-link>
            <ul class="slide-menu" v-if="menu.subs && menu.subs.length" :class="{open: menu.showSubMenu}">
              <li class="side-menu__label1"><a href="javascript:void(0);">Dashboards</a></li>
              <li class="sub-slide" :key="sIndex" v-for="(sub, sIndex) in menu.subs"
                  :class="{'is-expanded':sub.showSubMenu }">
                <router-link class="sub-side-menu__item"
                             :class="{'active': sub.active , 'is-expanded':sub.showSubMenu}"
                             @click="toggleMenu(sub)" data-bs-toggle="slide"
                             :to="sub.subs && sub.subs.length > 0 ? 'javascript:;' : sub.url">

                  <!--                                    <i :class="sub.icon"/>-->
                  <span class="sub-side-menu__label">{{ sub.name }}</span>
                  <i v-if="sub.subs && sub.subs.length" class="angle fe fe-chevron-right"></i></router-link>
                <ul class="sub-slide-menu" v-if="sub.subs && sub.subs.length" :class="{open: sub.showSubMenu}">
                  <li class="is-expanded" :key="subIndex" v-for="(subMenu, subIndex) in sub.subs">
                    <router-link class="slide-item"
                                 :class="{'active': subMenu.active }"
                                 :to="subMenu.url">
                      {{ subMenu.name }}
                    </router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <div class="slide-right" id="slide-right">
          <svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24"
               viewBox="0 0 24 24">
            <path
                d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
          </svg>
        </div>
      </div>
      <!--            <div class="ps__rail-x" style="left: 0px; bottom: 0px;">-->
      <!--                <div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div>-->
      <!--            </div>-->
      <!--            <div class="ps__rail-y" style="top: 0px; height: 536px; right: 0px;">-->
      <!--                <div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 347px;"></div>-->
      <!--            </div>-->
    </aside>
  </div>
</template>

<script lang="ts">
import menus from "@/configs/menus.ts";

const pathnameMap = {
  '/batch-transfers/show': '/batch-transfers/index'
}
export default {
  name: "SideBar",
  data() {
    let pathname = location.pathname.split('?')[0];
    if (pathnameMap[pathname]) {
      pathname = pathnameMap[pathname];
    }

    menus.forEach(menu => {
      menu.showSubMenu = false;
      menu.active = false;
      if (!menu.base) {
        menu.base = menu.url;
      }

      if (pathname.indexOf(menu.base) >= 0) {
        menu.active = true;
        menu.showSubMenu = true;
      }

      if (menu.subs && menu.subs.length > 0) {
        menu.subs.forEach(sub => {
          sub.showSubMenu = false;
          sub.active = false;
          if (pathname.indexOf(sub.url) >= 0) {
            sub.active = true;
            menu.active = true;
            menu.showSubMenu = true;
          }

          if (sub.subs && sub.subs.length > 0) {
            sub.subs.forEach(subMenu => {
              subMenu.active = false;
              subMenu.showSubMenu = false;
              if (pathname.indexOf(subMenu.url) >= 0) {
                subMenu.active = true;
                menu.active = true;
                menu.showSubMenu = true;
                sub.showSubMenu = true;
              }
            })
          }
        })
      }
    });

    return {
      menus,
      hoverMenu: false
    }
  },
  methods: {
    toggleMenu(menu) {
      if (menu.subs && menu.subs.length) {
        menu.showSubMenu = !menu.showSubMenu;
      }

    },
    hovermenu() {
      this.hover = true

      // if ($('.app').hasClass('sidenav-toggled')) {
      //     $('.app').removeClass('sidenav-toggled-open');
      // }
    }
  }
}
</script>

<style scoped>

</style>
