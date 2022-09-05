import { ref } from 'vue'

import pageModal from '@/components/page-modal/src/page-modal.vue'
type CallbackFn = (item?: any) => void
export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  // 新建用户 和 编辑用户
  const defaultInfo = ref({})
  const pageModalRef = ref<InstanceType<typeof pageModal>>()
  //新建用户
  const handleNewData = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    newCb && newCb()
  }
  //编辑用户
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }

    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    editCb && editCb(item)
  }
  return [pageModalRef, defaultInfo, handleEditData, handleNewData]
}
