<template>
  <el-button-group>
    <template v-for="(button, index) in buttons">
      <slot v-if="button.slot" :name="button.slot"></slot>
      <el-button v-else-if="!button.children" :key="index + 'button'" :type="button.type" :icon="button.icon"
        @click="button.click">
        {{ button.text }}
      </el-button>
      <el-dropdown v-else :key="index + 'dropdown-button'">
        <el-button :type="button.type">
          {{ button.text }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="(childButton, childIndex) in button.children" :key="childIndex"
              @click="childButton.click">
              {{ childButton.text }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
  </el-button-group>
</template>

<script setup lang="ts">
const props = defineProps({
  buttons: {
    type: Array as () => Array<any>
  }
})
</script>

<style scoped lang="scss">
</style>
