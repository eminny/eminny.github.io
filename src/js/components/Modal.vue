<template>
  <div class="modal-wrap" @click="closeModal">
    <div class="modal">
      <span @click="closeModal" class="btn-menu btn-menu--open"></span>
      <h1>Sold Out</h1>
      <p>Unfortunately, this item is currently sold out.</p>
    </div>
  </div>
</template>

<style lang="sass" scoped>
  @import "stylesheets/modal";
</style>

<script>
  import store from '../store'
  import { addClass, removeClass, hasClass } from '../helpers'
  const KEYCODE_ESC = 27;

  export default {
    data() {
      return {
        modal: store.data.modal,
      }
    },
    methods: {
      closeModal (event) {
        if (event && event.target !== event.currentTarget) {
          return
        }

        this.modal.visible = false
      },
      lockScroll(el) {
        addClass(el, 'overlay-open')
      },
      unlockScroll(el) {
        removeClass(el, 'overlay-open')
      },
    },
    ready() {
      this.lockScroll(document.body)
      this.lockScroll(document.querySelector('html'))
      window.addEventListener('keydown', (event) => {
        if (event.keyCode === KEYCODE_ESC) {
          this.closeModal()
        }
      })
    },
    destroyed() {
      this.unlockScroll(document.body)
      this.unlockScroll(document.querySelector('html'))
    },
  }
</script>
