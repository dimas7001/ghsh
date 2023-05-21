<template>
  <HeaderBlock :theme="theme">
    <ContainerHeader>
      <div class="header__left-part">
        <BurgerBlock :theme="theme">
          <div
            class="burger"
            :class="{'burger_off': !sidebarHidden}"
            @click="$emit('toggle-sidebar')"
          >
            <div class="burger__bullet"></div>
          </div>
        </BurgerBlock>
        <div class="header__logo">GHSH</div>
      </div>
      <div class="header__right-part">
        <div class="header__customize">
          <img
            class="header__customize-img"
            :src="require(`@/assets/img/icons/pantone/pantone_${themeInfo.themeMode === 'light' ? 'b' : 'w'}.png`)"
          >
          <div class="header__dropdown">
            <div
              class="header__dropdown-item"
              :class="{'header__dropdown-item_active': themeInfo.theme === 'default'}"
              @click="$emit('update-theme', 'default')"
            >Default</div>
            <div
              class="header__dropdown-item"
              :class="{'header__dropdown-item_active': themeInfo.theme === 'fresh'}"
              @click="$emit('update-theme', 'fresh')"
            >Fresh</div>
            <div
              class="header__dropdown-item"
              :class="{'header__dropdown-item_active': themeInfo.theme === 'experimental'}"
              @click="$emit('update-theme', 'experimental')"
            >Experimental</div>
          </div>
        </div>
        <img
          v-if="themeInfo.themeMode === 'dark'"
          :src="require(`@/assets/img/icons/sun/sun_${themeInfo.themeMode === 'light' ? 'b' : 'w'}.png`)"
          @click="$emit('update-theme-mode', 'light')"
        >
        <img
          v-else
          :src="require(`@/assets/img/icons/moon/moon_${themeInfo.themeMode === 'light' ? 'b' : 'w'}.png`)"
          @click="$emit('update-theme-mode', 'dark')"
        >
        <img
          class="header__settings"
          :src="require(`@/assets/img/icons/gear/gear_${themeInfo.themeMode === 'light' ? 'b' : 'w'}.png`)"
        >
      </div>
    </ContainerHeader>
  </HeaderBlock>
</template>

<script>
import { HeaderBlock, ContainerHeader, BurgerBlock } from "@/styles/styledBlocks.js"

export default {
  name: 'Header',
  components: {
    HeaderBlock, ContainerHeader, BurgerBlock
  },
  props: {
    sidebarHidden: Boolean,
  },
  emits: ['toggle-sidebar', 'update-theme', 'update-theme-mode'],
  inject: ['theme', 'themeInfo'],
}
</script>