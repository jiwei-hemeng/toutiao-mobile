<template>
  <div class="user-profile">
    <van-nav-bar
      class="app-nav-bar"
      title="个人中心"
      left-arrow
      @click-left="$router.back()"
    />
    <input
      type="file"
      hidden
      ref="file"
      accept="images/*"
      @change="onFileChange"
    />
    <van-cell
      title="用户头像"
      is-link
      center
      @click="$refs.file.click()"
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
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
      @click="isEditBirthday = true"
    />
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
    <van-popup
      v-model="isEditBirthday"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <updata-birthday
        v-if="isEditBirthday"
        v-model="user.birthday"
        @close="isEditBirthday = false"
      />
    </van-popup>
    <van-popup
      v-model="isEditPhotoShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <updata-photo
        v-if="isEditPhotoShow"
        :file="previewImage"
        @update-photo="user.photo = $event"
        @close="isEditPhotoShow = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import updataName from './components/updata-name'
import updataGender from './components/updata-gender'
import updataBirthday from './components/updata-birthday'
import updataPhoto from './components/updata-photo'
export default {
  name: 'userFile',
  components: {
    updataName,
    updataGender,
    updataBirthday,
    updataPhoto
  },
  data () {
    return {
      user: {},
      isEditname: false,
      isEditGender: false,
      isEditBirthday: false,
      previewImage: null,
      isEditPhotoShow: false
    }
  },
  created () {
    this.loadUser()
  },
  methods: {
    async loadUser () {
      const { data } = await getUserProfile()
      this.user = data.data
    },
    onFileChange () {
      const file = this.$refs.file.files[0]
      // const blob = window.URL.createObjectURL(this.$refs.file.files[0])
      this.previewImage = file
      // 展示弹出层
      this.isEditPhotoShow = true
      // 为了解决相同文件不触发 change 事件，所以在这里手动的清空 file 的 value
      this.$refs.file.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
</style>
