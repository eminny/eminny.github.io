<template>
  <div class="single-page">
    <div class="single-page__content">
      <form action="https://formspree.io/{{ recipientEmail }}"
            method="POST"
            class="contact-form"
      >
        <input type="hidden" name="_next" value="/contact/thanks">
        <input type="hidden" name="_format" value="plain">
        <input class="contact-form__input--text"
               autocomplete="off"
               autocapitalize="on"
               type="text"
               name="name"
               id="name"
               placeholder="NAME"
               required
        >
        <input class="contact-form__input--text"
               autocomplete="off"
               autocapitalize="off"
               type="email"
               name="_replyto"
               id="_replyto"
               placeholder="EMAIL ADDRESS"
               required
        >
        <input class="contact-form__input--text"
               autocomplete="off"
               autocapitalize="on"
               type="text"
               name="subject"
               id="subject"
               placeholder="INQUIRY SUBJECT"
        >
        <input class="contact-form__input--text"
               autocomplete="off"
               autocapitalize="on"
               type="text"
               name="message"
               id="message"
               placeholder="MESSAGE"
               required
        >
        <input type="text" name="_gotcha" style="display: none;">
        <input
          id="btn-submit"
          type="submit"
          value="Submit"
          class="contact-form__input--btn"
          @click.prevent="submitForm"
        >
      </form>
    </div>
    <site-footer></site-footer>
  </div>
</template>

<style lang="sass" scoped>
  @import "../../stylesheets/variables";
  @import "../../stylesheets/mixins/mixins";

  .contact-form {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 80%;
    min-height: 40rem;
    width: $content-width-medium;
  }

  input.contact-form__input--text {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid $color__gray-light;
    color: $color__black;
    display: block;
    font-size: 1.2rem;
    line-height: 4;
    max-height: 6rem;
    padding: 4.5rem 0 2rem 0;
    transition: all $transition-standard;
    user-select: auto;
    width: 100%;

    &:focus {
      border-color: $color__black;
      box-shadow: none;
      outline: none;
    }
  }

  input.contact-form__input--btn,
  button.contact-form__input--btn {
    @include btn;
    margin: 5rem auto;
    max-width: 100%;
    width:  100%;

    @media screen and ($large-screens) {
      margin: 5rem auto 0 auto;
      max-width: 100%;
      width:  100%;
    }
  }
</style>

<script>
  import 'whatwg-fetch'
  import { compact, endsWith, forEach, map, replace, trim } from 'lodash'
  import SiteFooter from './SiteFooter.vue'

  export default {
    data () {
      return {
        recipientEmail: 'alex@mister.nyc',
        form: null,
        requiredFields: [
          'name',
          '_replyto',
          'message',
        ],
        submitBtn: null,
        formOptions: {},
      }
    },
    components: {
      SiteFooter,
    },
    methods: {
      formValidates (fields = this.requiredFields) {
        const requiredLength = fields.length
        const givenLength = compact(map(fields, (field) => trim(document.getElementById(field).value))).length
        if (givenLength < requiredLength) {
          return false
        }
        return true
      },
      submitForm () {
        if (!this.formValidates()) {
          // Validation failed, so append 'REQUIRED' to placeholders of required fields
          forEach(this.requiredFields, function (field) {
            let fieldEl = document.getElementById(field)
            if (trim(fieldEl.value) == '' && !endsWith(fieldEl.placeholder, 'REQUIRED')) {
              fieldEl.placeholder = fieldEl.placeholder + ' REQUIRED'
            }
          })
          return
        }

        if (this.submitBtn.disabled) {
          // Form is submitting
          return
        }

        // Set form options
        this.formOptions = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            _format: 'plain',
            _replyto: document.getElementById('_replyto').value,
            name: document.getElementById('name').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
          }),
        }

        // Show that form was submitted
        this.submitBtn.value = 'Submitting...'
        this.submitBtn.disabled = true

        fetch(this.form.action, this.formOptions)
          .then(this.checkStatus)
          .then((response) => response.json())
          .then(this.displaySuccessMsg)
          .catch(this.handleError)
      },
      checkStatus (response) {
        if (response.status >= 200 && response.status < 300) {
          return response
        } else {
          let error = new Error(response.statusText)
          error.response = response
          throw error
        }
      },
      displaySuccessMsg (data) {
        this.submitBtn.value = data.success || 'Thank you!'
        setTimeout(this.resetForm, 3000)
      },
      handleError (error) {
        alert('We apologize for any inconvenience. Please email us.')
        console.error('Request failed: ', error)
        this.submitBtn.value = 'Error'
        setTimeout(this.resetForm, 3000)
      },
      resetForm () {
        // Remove 'REQUIRED' from field placeholders
        forEach(this.requiredFields, function (field) {
          let fieldEl = document.getElementById(field)
          if (endsWith(fieldEl.placeholder, 'REQUIRED')) {
            fieldEl.placeholder = replace(fieldEl.placeholder, 'REQUIRED', '')
          }
        })
        this.submitBtn.disabled = false
        this.submitBtn.value = 'Submit'
        this.form.reset()
      },
    },
    ready () {
      this.form = document.querySelector('form')
      this.submitBtn = document.getElementById('btn-submit')
    },
  }
</script>
