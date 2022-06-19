/* eslint-disable */
// @ts-nocheck

import { ElMessage } from 'element-plus'

/**
 * 返回元素的大小及其相对于视口的位置。
 * top 是元素上边到视窗上边的距离；
 * right 是元素右边到视窗左边的距离；
 * bottom 是元素下边到视窗上边的距离；
 * left	是元素左边到视窗左边的距离；
 * width 是元素自身的宽；
 * height 是元素自身的高。
 * @param element
 * @returns
 */
export function getBoundingClientRect(element: Element): DOMRect | number {
  if (!element || !element.getBoundingClientRect) {
    return 0
  }
  return element.getBoundingClientRect()
}

export function toggleFullscreen(fullscreen: boolean): boolean {
  if (fullscreen) {
    ElMessage.success('退出全屏模式')
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  } else {
    const element = document.documentElement
    ElMessage.success('进入全屏模式')
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    }
  }
  return !fullscreen
}
