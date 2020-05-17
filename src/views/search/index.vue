<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
      <result :searchText="searchText" v-if="isResultShow" />
      <suggestion v-else-if="searchText" :searchText="searchText" @search="onSearch" />
      <history v-else :search-histories="searchHistories" @search="onSearch" />
    </form>
  </div>
</template>

<script>
import Suggestion from './components/search-suggestion'
import Result from './components/search-result'
import History from './components/search-history'
import { mapState } from 'vuex'
import { setItem, getItem } from '@/utils/storage'
import { getSearchHistories } from '@/api/search'
export default {
  name: 'SearchIndex',
  components: {
    Suggestion,
    Result,
    History
  },
  data () {
    return {
      isResultShow: false,
      searchText: '',
      searchHistories: [] // 搜索历史数据
    }
  },
  methods: {
    onSearch (searchText) {
      // 把输入框设置为你要搜索的文本
      this.searchText = searchText
      const index = this.searchHistories.indexOf(searchText)
      if (index !== -1) {
        // 把重复项删除
        this.searchHistories.splice(index, 1)
      }
      // 把最新的搜索历史记录放到顶部
      this.searchHistories.unshift(searchText)
      // 如果用户已登录，则把搜索历史记录存储到线上
      //    提示：只要我们调用获取搜索结果的数据接口，后端会给我们自动存储用户的搜索历史记录
      // 如果没有登录页，则把搜索历史记录存储到本地
      setItem('search-histories', this.searchHistories)
      // 展示搜索结果
      this.isResultShow = true
    },

    async loadSearchHistories () {
      let searchHistories = getItem('search-histories') || []
      if (this.user) {
        const { data } = await getSearchHistories()
        // 合并数组： [...数组, ...数组]
        // 把 Set 转为数组：[...Set对象]
        // 数组去重：[...new Set([...数组, ...数组])
        searchHistories = [...new Set([
          ...searchHistories,
          ...data.data.keywords
        ])]
      }
      this.searchHistories = searchHistories
    }
  },
  created () {
    this.loadSearchHistories()
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
</style>
