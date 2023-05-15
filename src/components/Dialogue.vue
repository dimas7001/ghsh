<template>
  <OverlayBlock :theme="theme">
    <div
      class="overlay"
      :class="{'overlay_hidden': overlayInfo.overlayHidden}"
      @click.self="$emit('toggle-overlay')"
    >
      <div class="overlay__content">
        <div class="overlay__question"></div>
        <div class="overlay__buttons">
          <div class="overlay__choise">Nope</div>
          <div class="overlay__choise">Yes</div>
        </div>
      </div>
    </div>
  </OverlayBlock>
</template>