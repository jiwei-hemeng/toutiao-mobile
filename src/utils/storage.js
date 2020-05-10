// 封装获取本地存储
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
// 封装设置本地存储
export const setItem = (name, value) => {
  if (value instanceof Object) {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}
// 封装移除本地存储
export const removeItem = name => {
  window.localStorage.removeItem(name)
}
