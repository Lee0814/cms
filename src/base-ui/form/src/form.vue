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
    //?????????????????????
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, //>1920px  ??????4???
        lg: 8, //???1200px 3???
        md: 12, //???992px 2???
        sm: 24, //???768px 1???
        xs: 24 //<768px 1???
      })
    }
  },
  setup(props, { emit }) {
    //????????????????????? ?????????????????????
    //  ??????   1.??????????????????????????????????????????
    //        2.???????????????????????????????????????
    //        3.????????????????????????
    //        4.?????????????????????
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
