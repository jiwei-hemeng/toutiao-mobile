<template>
  <div class="search-history">
    <van-cell
      title="搜索历史"
    >
      <div v-if="isDel">
        <span @click="delAll">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDel = false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isDel = true" />
    </van-cell>
    <van-cell
      :title="history"
      v-for="(history, index) in searchHistories"
      :key="index"
      @click="$emit('search', history)"
    >
      <van-icon name="close" v-show="isDel" />
    </van-cell>
  </div>
</template>

<script>
import { removeItem } from '@/utils/storage'
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDel: false
    }
  },
  methods: {
    delAll () {
      removeItem('search-histories')
      this.searchHistories = []
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {}
}
</script>

<style scoped lang="less"></style>
