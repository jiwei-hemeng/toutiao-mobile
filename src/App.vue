<template>
  <div id="app">
    <!-- 一级路由的出口，路由表中所有的顶层路由都是一级路由
      因为 router-view 是一级路由出口
      keep-alive 仅对该路由出口渲染的组件有效
    -->
    <keep-alive :include="['LayoutIndex']">
      <router-view/>
    </keep-alive>
  </div>
</template>

<style lang="less"></style>
