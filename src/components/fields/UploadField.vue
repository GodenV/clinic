<template>
  <ValidationProvider
    v-slot="{ errors, validate }"
    :vid="vid"
    :name="$attrs.name || $attrs.label"
    :rules="typeof files === 'string' ? '' : rules"
  >
    <b-field
      v-bind="$attrs"
      :type="{ 'is-danger': errors[0]}"
      :message="errors"
      class="p-l-sm p-r-sm"
    >
      <b-upload
        v-model="innerFile"
        v-bind="$attrs"
        drag-drop
        accept="image/*"
        style="width: 100%;"
        @change="validate"
      >
        <div class="box">
          <div class="has-text-centered">
            <template v-if="innerFile===null">
              <template v-if="typeof files === 'string'">
                <figure class="image">
                  <img
                    alt="photo"
                    class="is-3by4 ratio"
                    :src="files"
                  >
                </figure>
              </template>
              <template v-else>
                <span class="title far fa-file-alt fa-3x has-text-dark" />
                <span class="heading is-size-7">
                  {{ $attrs.title }}
                </span>
              </template>
            </template>
            <template
              v-else
              class="is-square"
            >
              <figure class="image">
                <img
                  alt="photo"
                  class="is-3by4 ratio"
                  :src="getFileUrl"
                >
              </figure>
            </template>
          </div>
        </div>
      </b-upload>
    </b-field>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {

  name: 'UploadField',

  components: {
    ValidationProvider
  },

  props: {
    vid: {
      type: String
    },
    rules: {
      type: [Object, String],
      default: ''
    },
    value: {
      type: null
    },
    files: {
      type: [File, String]
    }
  },

  data: () => ({
    innerFile: null
  }),

  computed: {
    getFileUrl () {
      return window.URL.createObjectURL(this.innerFile)
    }
  },

  watch: {
    // Handles internal model changes.
    innerFile (newVal) {
      this.$emit('update:files', newVal)
    },
    // Handles external model changes.
    value (newVal) {
      this.innerFile = newVal
    }
  },

  created () {
    if (this.value) {
      this.innerFile = this.value
    }
  }

}
</script>

<style lang="scss">

  .close-image {
    position: absolute;
    top:-10px;
    right: -10px;
  }

  .image-gallery-item {
    display: inline-block;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .ratio {
    object-fit: cover !important;
    width: 192px !important;
    height: 128px !important;
  }

</style>
