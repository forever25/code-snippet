import { ref } from 'vue'

export default ({
  loadListApi,
  params = {},
  disposeParamsCallBack,
}) => {
  const tableData = ref([])
  const pageTotal = ref(0)

  async function loadData() {
    if (typeof disposeParamsCallBack === 'function') {
      params = disposeParamsCallBack(params)
    }
    const { data } = await loadListApi(params);

    tableData.value = data.list

  }


  return {
    tableData,
    loadData,
    pageTotal
  }

}