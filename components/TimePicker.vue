<template>
  <div class="d-flex">
    <input
      v-model="calculatedTime"
      type="hidden"
    >
    <div class="mr-2">
      <b-form-select
        v-model="hours"
        @change="$emit('time', calculatedTime)"
      >
        <option
          v-for="h in 12"
          :key="`hour-${h}`">
          {{ h &lt; 10 ? '0' + h : h }}
        </option>
      </b-form-select>
    </div>

    <div class="mr-2">
      <b-form-select
        v-model="minutes"
        @change="$emit('time', calculatedTime)"
      >
        <option>00</option>
        <option
          v-for="m in 60"
          :key="`minute-${m}`"
        >
          {{ m &lt; 10 ? '0' + m : m }}
        </option>
      </b-form-select>
    </div>

    <div>
      <b-form-select
        v-model="amPm"
        @change="$emit('time', calculatedTime)"
      >
        <option>AM</option>
        <option>PM</option>
      </b-form-select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    defaultTime: {
      type: String,
      required: false,
      default: null
    }
  },

  data () {
    return {
      hours: '12',
      minutes: '00',
      amPm: 'PM'
    }
  },

  computed: {
    time () {
      if (this.hours) {
        return this.hours + ':' + this.minutes + ' ' + this.amPm
      }
    },
    calculatedTime () {
      if (this.amPm === 'PM' && parseInt(this.hours) !== 12) {
        return parseInt(this.hours) + 12 + ':' + this.minutes
      } else if (this.amPm === 'AM' && parseInt(this.hours) === 12) {
        return '00:' + this.minutes
      } else {
        return this.hours + ':' + this.minutes
      }
    }
  },

  created () {
    if (this.defaultTime) {
      this.hours = this.defaultTime.slice(0, 2)
      this.minutes = this.defaultTime.slice(3, 5)
      if (this.hours >= 12) {
        this.amPm = 'PM'
        if (this.hours > 12) {
          this.hours = parseInt(this.hours) - 12
        }
        if (this.hours < 10) {
          this.hours = '0' + this.hours.toString()
        } else {
          this.hours = this.hours.toString()
        }
      } else {
        this.amPm = 'AM'
        if (this.hours < 10) {
          this.hours = '0' + this.hours.toString()
        } else {
          this.hours = this.hours.toString()
        }
      }
    }

    this.$emit('time', this.calculatedTime)
  }
}
</script>

<style scoped>
.hours,
.minutes {
  margin-right: 0.5rem;
}
</style>
