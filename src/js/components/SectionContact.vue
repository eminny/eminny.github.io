<template>
  <header>
  <!-- Facebook Pixel Code -->
  <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window,document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', '200282564039202');
    fbq('track', 'PageView');
  </script>
  <noscript>
    <img height="1" width="1"
  src="https://www.facebook.com/tr?id=200282564039202&ev=PageView
  &noscript=1"/>
  </noscript>
  <!-- End Facebook Pixel Code -->
  </header>
  <div class="single-page">
    <div class="single-page__content">
      <form action="//formspree.io/{{ recipientEmail }}"
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
    height: 4rem;
    line-height: 1;
    margin-top: 2.5rem;
    padding: 0;
    transition: all $transition-standard;
    user-select: auto;
    width: 100%;

    &:focus {
      border-color: $color__black;
      box-shadow: none;
      outline: none;
    }

    &.validation-failed::-webkit-input-placeholder {
      color: $color__black;
    }

    &.validation-failed:-moz-placeholder {
      color: $color__black;
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
  import { addClass, removeClass } from '../helpers'
  import SiteFooter from './SiteFooter.vue'

  export default {
    data () {
      return {
        recipientEmail: 'info@canderparis.com',
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
            addClass(fieldEl, 'validation-failed')
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
        let formHeaders = {
          'Accept': 'application/json',
        }
        // prevent fuckery with magical getters/setters being added by Vue
        Object.freeze(formHeaders)

        this.formOptions = {
          method: 'POST',
          headers: formHeaders,
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
          removeClass(fieldEl, 'validation-failed')
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
