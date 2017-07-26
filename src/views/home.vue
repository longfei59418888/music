<template>
  <div>
      <transition :name="transitionName">
        <router-view class="child-view" ></router-view>
      </transition>
    <bottom></bottom>
  </div>
</template>
<script>
  import {bind_getPushMessage} from '../lib/utils/appUtil'
  import findNav from './unit/findNav.vue'
  import bottom from './unit/bottom.vue'
  export default {
      data () {
        return {
            styles:require('../style/scss/index.scss'),
        }
      },
      computed:{
          transitionName(){
              return this.$store.state.transitionName.nav
          }
      },
      methods:{},
      created(){},
      components: {
          findNav,
          bottom
      }


  }
</script>

