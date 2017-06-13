<!-- Sorry, the component is mis-named. It's the "SUBSCRIBE" Modal -->
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
            v-show="showForm"
      >
        <!-- <label for="user-email" class="newsletter__label">Enter your email</label> -->
        <div class="newsletter__form__inner">
          <input v-model="modal.userEmail" id="user-email" name="user-email" class="newsletter__email" type="email" placeholder="EMAIL ADDRESS" autocomplete="off" autocorrect="off">
          <input v-if="modal.productOfInterest" type="hidden" name="product-of-interest" value="{{ modal.productOfInterest }}">
          <input type="hidden" name="*formname" value="Product Interest Form">
          <input type="hidden" name="*honeypot">
          <button id="btn-submit" class="newsletter__form__btn-submit" type="submit" @click.prevent="submitForm">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="sass" scoped>
  @import "stylesheets/modal";
</style>

<script>
  import 'whatwg-fetch'
  import { endsWith } from 'lodash'
  import store from '../store'
  import { addClass, removeClass, hasClass } from '../helpers'

  const KEYCODE_ESC = 27;

  export default {
    data() {
      return {
        modal: store.data.modal,
        showForm: true,
        form: null,
        submitBtn: null,
      }
    },
    methods: {
      closeModal(event) {
        if (event && event.target !== event.currentTarget) {
          return
        }

        this.modal.visible = false
      },
      emailIsValid() {
        const isValidEmail = Boolean(/\S+@\S+\.\S+/.test(this.modal.userEmail))
        if (isValidEmail) {
          return true
        }
        return false
      },
      submitForm() {
        if (!this.emailIsValid()) {
          const fieldEl = document.getElementById('user-email')

          if (fieldEl.value.trim() === '' && !endsWith(fieldEl.placeholder, 'REQUIRED')) {
            fieldEl.placeholder = `${fieldEl.placeholder} REQUIRED`
          }

          addClass(fieldEl, 'validation-failed')
          return
        }

        if (this.submitBtn.disabled) {
          // Form is submitting
          return
        }

        // Set form options
        const formHeaders = {
          'accept': 'application/javascript',
        }
        // prevent fuckery with magical getters/setters being added by Vue
        Object.freeze(formHeaders)

        const formOptions = {
          method: 'POST',
          headers: formHeaders,
          body: new FormData(this.form),
        }

        // Show that form was submitted
        this.submitBtn.disabled = true

        fetch(this.form.action, formOptions)
          .then(this.checkStatus)
          .then((response) => response.json())
          .then(this.displaySuccessMsg)
          .catch(this.handleError)
      },
      checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
          return response
        } else {
          let error = new Error(response.statusText)
          error.response = response
          throw error
        }
      },
      displaySuccessMsg(data) {
        this.showForm = false

        this.modal.originalTitle = this.modal.title
        this.modal.originalBody = this.modal.body

        this.modal.title = 'Thank you'
        this.modal.body = 'We will reach out to you when this item becomes available.'

        setTimeout(() => {
          this.closeModal()
          this.resetForm()
          this.modal.title = this.modal.originalTitle
          this.modal.body = this.modal.originalBody
        }, 3500)
      },
      handleError(error) {
        console.error('Request failed: ', error)
        setTimeout(() => this.resetForm(), 3000)
      },
      resetForm() {
        this.showForm = true
        this.submitBtn.disabled = false
        this.form.reset()
      },
      lockScroll(el) {
        addClass(el, 'overlay-open')
      },
      unlockScroll(el) {
        removeClass(el, 'overlay-open')
      },
    },
    ready() {
      this.form = this.$el.querySelector('#sold_out_form')
      this.submitBtn = this.$el.querySelector('#btn-submit')

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
