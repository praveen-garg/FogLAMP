<template>
  <canvas class="canvas-gauges"></canvas>
</template>

<script>
import { RadialGauge } from 'canvas-gauges'

export default {

  props: {
    value: Number,
    options: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {
      chart: null
    }
  },

  mounted () {
    if (this.value) this.options.value = this.value
    this.options.renderTo = this.$el
    this.options.colorNumbers = 'red'
    // this.options.colorPlate = 'blue'
    // this.options.height = 300
    this.options.minValue = 0
    this.options.maxValue = 255
    this.chart = new RadialGauge(this.options).draw()
  },

  beforeDestroy() {
    this.chart.destroy()
  },

  watch: {
    value (val) {
      this.chart.value = val
    }
  }

}
</script>
