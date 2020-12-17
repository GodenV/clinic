<template>
  <b-field :label="label">
    <b-datepicker
      :position="isBottom ? 'is-top-left' : 'is-bottom-left'"
      v-model="dateField"
      size="is-small"
      editable
      placeholder="ДД.ММ.ГГГГ"
      @input="getString"
    />
  </b-field>
</template>

<script>
import dayjs from 'dayjs'
import { dateParse } from '@/utils/constructors'

export default {

  name: 'DateField',

  components: {

  },

  props: ['label', 'stringDate', 'isBottom'],

  data () {
    return {
      dateField: null,
    }
  },

  computed: {

  },

  watch: {

    stringDate: function (newVal) {
      this.dateField = dateParse(newVal)
    }

  },

  created () {

  },

  // mounted () {
  //   this.dateField = dateParse(this.stringDate)
  //   window.addEventListener('scroll', () => {
  //       if (this.$el.offsetTop + this.$el.offsetHeight + 500 > window.innerHeight + window.scrollY) {
  //         this.isBottom = true
  //       } else {
  //         this.isBottom = false
  //       }
  //     })
  // },

  methods: {
    getString (date) {
      let parsedDate = dayjs(date).format('YYYY-MM-DD')
      this.$emit('update:stringDate', parsedDate)
    }
  }


}
</script>
