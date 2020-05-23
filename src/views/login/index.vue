<template>
  <div class="login-container">
    <van-nav-bar
      class="page-nav-bar"
      title="登录"
      left-arrow
      @click-left="$router.back()"
    />
    <van-form
      :show-error="false"
      :show-error-message="false"
      validate-first
      ref="login-form"
      @submit="onLogin"
      @failed="onFailed"
    >
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入手机号"
        name="mobile"
        :rules="userFormRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        placeholder="请输入验证码"
        name="code"
        :rules="userFormRules.code"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            size="small"
            round
            ref="login-form"
            v-else
            :loading="isSendSmsLoading"
            @click.prevent="sendSms"
          >发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button type="info" block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      userFormRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false,
      isSendSmsLoading: false
    }
  },
  methods: {
    async onLogin () {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '登陆中...'
      })
      try {
        const { data } = await login(this.user)
        this.$toast.success('登录成功')
        this.$store.commit('setItem', data.data)
        this.$store.commit('removeCachePage', 'LayoutIndex')
        this.$router.push(this.$route.query.redirect || '/')
      } catch (err) {
        console.log(err)
        this.$toast.fail('登录失败！手机号或验证码不正确')
      }
    },
    onFailed (error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message, // 提示消息
          position: 'top' // 防止手机键盘太高看不见提示消息
        })
      }
    },
    async sendSms () {
      try {
        // 防止用户多次请求发送验证码
        this.isSendSmsLoading = true
        await this.$refs['login-form'].validate('mobile')
        // 等待服务器发送验证码之后开始计时
        const res = await sendSms(this.user.mobile)
        this.isCountDownShow = true
        console.log(res)
      } catch (err) {
        let message = ''
        if (err && err.response && err.response.status === 429) {
          // 发送短信失败的错误提示
          message = '发送太频繁了，请稍后重试'
        } else if (err.name === 'mobile') {
          // 表单验证失败的错误提示
          message = err.message
        } else {
          // 未知错误
          message = '发送失败，请稍后重试'
        }
        this.$toast({
          message,
          position: 'top'
        })
      }
      // 无论发送验证码成功还是失败，最后都要关闭发送按钮的 loading 状态
      this.isSendSmsLoading = false
    }
  }
}
</script>
<style scoped lang="less">
.login-container {
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666666;
    }
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>
