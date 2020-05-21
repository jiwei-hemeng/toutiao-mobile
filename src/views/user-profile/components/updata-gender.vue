<template>
  <div class="updata-gendre">
    <van-picker
      show-toolbar
      :columns="columns"
      :default-index="defaultIndex"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onGenderChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpDataGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      defaultIndex: this.value
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidclick: true, // 禁止背景点击
        duration: 0 // 展示时间，0 表示持续展示
      })
      await updateUserProfile({
        gender: this.defaultIndex
      })
      this.$emit('input', this.defaultIndex)
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
