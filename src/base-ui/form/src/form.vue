<template>
  <div class="ly-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :style="itemLayout"
              v-if="!item.isHidden"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-bind="item.options"
                  v-model="formData[`${item.field}`]"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :value="option.value"
                    :key="option.value"
                    >{{ option.title }}</el-option
                  ></el-select
                >
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, computed } from 'vue'
import { IFormItem } from '../types/'
export default defineComponent({
  components: {},
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemLayout: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    //设置响应式布局
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, //>1920px  每行4个
        lg: 8, //≥1200px 3个
        md: 12, //≥992px 2个
        sm: 24, //≥768px 1个
        xs: 24 //<768px 1个
      })
    }
  },
  setup(props, { emit }) {
    //父组件传入的值 双向绑定并修改
    //  通过   1.创建一个新的对象（解构赋值）
    //        2.自己手动监听组件里值的变化
    //        3.发送事件给父组件
    //        4.父组件自己修改
    const formData = ref({ ...props.modelValue })

    watch(formData, (newValue) => emit('update:modelValue', newValue), {
      deep: true
    })
    return {
      formData
    }
  }
})
</script>
<style lang="less" scoped>
.ly-form {
  padding-top: 22px;
}
</style>
