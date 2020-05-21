<template>
  <div class="updata-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpDataBirthday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidclick: true, // 禁止背景点击
        duration: 0 // 展示时间，0 表示持续展示
      })
      const date = dayjs(this.currentDate).format('YYYY-MM-DD')
      await updateUserProfile({
        birthday: date
      })
      this.$emit('input', date)
      this.$emit('close')
      this.$toast.success('修改成功')
    },
    onGenderChange (picker, value, index) {
      this.defaultIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
</style>
