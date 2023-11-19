<template>
    <div class="tab-navigation">
        <ul class="nav nav-tabs ">
            <li class="nav-item" v-for="tab in tabs" :key="tab.id">
                <a class="nav-link" @click.prevent="changeTab(tab)" :class="{active: tab.id === currentTabId}"
                   href="">{{ tab.name }}</a>
            </li>
        </ul>
        <div class="tab-navigation-content">
            <keep-alive>
                <component ref="currentTab" @onValidate="onValidate" :error="error" :is="currentTab.component" :id="id"
                           :entry="entry"></component>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import {clone} from "../lib/utils";
import {forEach} from '../lib/collection';

export default {
    name: "TabNavigation",
    props: ['tabs', 'id', 'entry', 'error', 'checkData'],
    mounted() {
        this.$emit('tabChange', this.currentTab);
    },
    methods: {
        changeTab(tab) {
            this.currentTab = tab;
            this.currentTabId = tab.id;
            location.hash = tab.id;
            this.$emit('tabChange', tab)
        },
        onValidate() {
            this.$emit('onValidate')
        },
        getTabData(key) {
            return this.$refs.currentTab[key];
        },
        setTabData(key, value, checkData) {
            const keyType = typeof key;

            if (keyType === 'object') {
                forEach(key, (v, k) => {
                    this.$refs.currentTab[k] = v;
                });
            } else {
                if (keyType !== 'string') {
                    throw new Error('TabNavigation.setTabData: key must be a string or object')
                }

                this.$refs.currentTab[key] = value;
            }
        },
    },
    data() {
        if (!Array.isArray(this.tabs)) {
            throw new Error('TabNavigation: props.tabs is invalid');
        }

        if (this.tabs.length === 0) {
            throw new Error('TabNavigation: tabs is empty')
        }

        this.tabs.forEach(tab => {
            if (!tab.id) {
                throw new Error('TabNavigation: Missing tab.id')
            }

            if (!tab.name) {
                throw new Error('TabNavigation:Missing tab.name')
            }

            if (!tab.component) {
                throw new Error('TabNavigation:Missing tab.component')
            }
        });

        let currentTabId;

        try {
            currentTabId = location.hash.split('?')[0].substring(1);
        } catch (err) {

        }

        let current = this.tabs.find(tab => tab.id === currentTabId);


        return {
            currentTabId: current ? current.id : this.tabs[0].id,
            currentTab: current ? current : this.tabs[0]
        }
    }
}
</script>

<style>
.tab-navigation-content {
    margin-top: 5px;
}

.tab-navigation {
    margin-bottom: 5px;
}

.tab-navigation .nav-link {
    text-decoration: none;
    color: #000;
    /*background: #0090D0;*/
    border-color: #fff;
}

.tab-navigation .nav-link.active {
    font-weight: bold;
    border-top: 1px solid #0090D0;
    border-left: 1px solid #0090D0;
    border-right: 1px solid #0090D0;
    color: #0090D0;
}
</style>
