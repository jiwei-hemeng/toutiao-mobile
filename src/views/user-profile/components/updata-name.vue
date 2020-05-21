<template>
  <div class="updata-name">
    <van-nav-bar
      class="app-nav-bar"
      title="修改昵称"
      left-arrow
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <div class="name-field-wrap">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpDataName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidclick: true, // 禁止背景点击
        duration: 0 // 展示时间，0 表示持续展示
      })
      try {
        await updateUserProfile({
          name: this.localName
        })
        this.$emit('input', this.localName)
        this.$emit('close')
        this.$toast.success('修改成功')
      } catch (err) {
        if (err && err.response && err.response.status === 409) {
          this.$toast.fail('昵称已存在')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
