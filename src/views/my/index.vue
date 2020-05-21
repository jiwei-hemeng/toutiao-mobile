<template>
  <div class="my-container">
    <van-cell-group v-if="user" class="my-info">
      <van-cell
        class="user-info"
        center
        :border="false"
      >
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          :src="CurrentUser.photo"
        />
        <div class="nickname" slot="title">{{CurrentUser.name}}</div>
        <van-button
          class="edit-button"
          size="small"
          round
          to="/user/profile"
        >编辑资料</van-button>
      </van-cell>
      <van-grid class="info-grid" :border="false">
        <van-grid-item>
          <div slot="text" class="text-wrap">
            <div class="count">{{CurrentUser.art_count}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text" class="text-wrap">
            <div class="count">{{CurrentUser.follow_count}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text" class="text-wrap">
            <div class="count">{{CurrentUser.fans_count}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text" class="text-wrap">
            <div class="count">{{CurrentUser.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <div v-else class="not-login" @click="toLogin">
      <div>
        <img class="mobile" src="./iphone.png" alt="">
      </div>
      <div>
        <span class="text"> 点击登录</span>
      </div>
    </div>

    <van-grid :column-num="2" class="nav-grid mb-4">
      <van-grid-item
        icon-prefix="toutiao"
        icon="shoucang"
        text="文字"
      />
      <van-grid-item
        icon-prefix="toutiao"
        icon="lishi"
        text="文字"
      />
    </van-grid>

    <van-cell title="消息通知" is-link to="/" />
    <van-cell class="mb-4" title="小智同学" is-link to="/" />
    <van-cell title="退出登录" v-if="user" class="logout-cell" @click="toLogout" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user'
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {
      CurrentUser: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.onloadUser()
  },
  mounted () {},
  methods: {
    toLogin () {
      this.$router.push('/login')
    },
    toLogout () {
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗？'
      })
        .then(() => { // 确认执行这里
          // 清除用户登录状态
          this.$store.commit('setItem', null)
        })
        .catch(() => { // 退出执行这里
          // on cancel
        })
    },
    async onloadUser () {
      const { data } = await getCurrentUser()
      this.CurrentUser = data.data
    }
  }
}
</script>

<style scoped lang="less">
.my-info {
  background: url('./banner.png') no-repeat;
  background-size: cover;
  .user-info {
    height: 115px;
    background-color: unset;
    .avatar {
      box-sizing: border-box;
      width: 65px;
      height: 65px;
      border: 1px solid #fff;
      margin-right: 10px;
    }
    .nickname {
      font-size: 15px;
      color: #fff;
    }
    .edit-button {
      height: 16px;
      line-height: 16px;
      font-size: 10px;
      color: #a3a3a3;
    }
  }
  /deep/ .info-grid {
    height: 65px;
    .van-grid-item__content {
      border-width: unset;
      background-color: unset;
      .text-wrap {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .count {
          font-size: 18px;
        }
        .text {
          font-size: 12px;
        }
      }
    }
  }
}
.not-login {
  height: 180px;
  background: url('./banner.png') no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .mobile {
    height: 66px;
    width: 66px;
  }
  .text {
    font-size: 14px;
    color: #fff;
  }
}
/deep/ .nav-grid {
  height: 70px;
  .van-grid-item__text {
    font-size: 14px;
    color: #333333;
  }
  .toutiao {
    font-size: 22px;
  }
  .toutiao-shoucang {
    color: #eb5253;
  }
  .toutiao-lishi {
    color: #ff9d1d;
  }
}
.logout-cell {
  text-align: center;
  color: #d86262;
}
.mb-4 {
  margin-bottom: 4px;
}
</style>
