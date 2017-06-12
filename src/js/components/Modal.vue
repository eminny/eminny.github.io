<template>
  <div class="modal-wrap" @click="closeModal">
    <div class="modal">
      <button @click="closeModal" class="btn-close"></button>
      <h1 class="modal-title gamma" v-if="modal.title">{{ modal.title }}</h1>
      <p class="modal-body p-beta" v-if="modal.body">{{ modal.body }}</p>
      <form id="sold_out_form"
            class="newsletter__form newsletter__form--in-modal group"
            action="https://www.enformed.io/sgttqhhh"
            method="post"
      >
        <!-- <label for="getEmail" class="newsletter__label">Enter your email</label> -->
        <div class="newsletter__form__inner">
          <input id="getEmail" name="user-email" class="newsletter__email" type="email" placeholder="EMAIL ADDRESS" autocomplete="off" autocorrect="off" required>
          <input v-if="modal.productOfInterest" type="hidden" name="product-of-interest" value="{{ modal.productOfInterest }}">
          <button class="newsletter__form__btn-submit" type="submit">Submit</button>
        </div>
      </form>
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
