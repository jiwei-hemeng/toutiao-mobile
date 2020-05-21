<template>
  <div class="user-profile">
    <van-nav-bar
      class="app-nav-bar"
      title="个人中心"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell
      title="用户头像"
      is-link
      center
    >
      <van-image
      width="30"
      height="30"
      :src="user.photo"
      round
    />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="user.name"
      @click="isEditname = true"
    />
    <van-cell
      title="性别"
      is-link
      :value="user.gender ? '女' : '男'"
      @click="isEditGender = true"
    />
    <van-cell title="生日" is-link :value="user.birthday" />
    <van-popup
      v-model="isEditname"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <updata-name
        v-model="user.name"
        @close="isEditname = false"
      />
    </van-popup>
    <van-popup
      v-model="isEditGender"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <updata-gender
        v-if="isEditGender"
        v-model="user.gender"
        @close="isEditGender = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import updataName from './components/updata-name'
import updataGender from './components/updata-gender'
export default {
  name: 'userFile',
  components: {
    updataName,
    updataGender
  },
  data () {
    return {
      user: {},
      isEditname: false,
      isEditGender: false
    }
  },
  created () {
    this.loadUser()
  },
  methods: {
    async loadUser () {
      const { data } = await getUserProfile()
      this.user = data.data
    }
  }
}
</script>

<style lang="less" scoped>
</style>
