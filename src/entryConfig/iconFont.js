import {
  loadStyle
} from '@/utils/util'
// 图表库为avue和pig2套地址
const iconfontVersion = ['667895_v7uduh4zui', '1638883_qi08jij1ln', '2893575_tt78jmitj2e']
const iconfontUrl = '//at.alicdn.com/t/font_$key.css'
const loadStyles = () => {
  iconfontVersion.forEach(ele => {
    loadStyle(iconfontUrl.replace('$key', ele))
  })
}
loadStyles()