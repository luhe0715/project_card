<template>
  <div ref="echartRef" style="width: 100%; height: 500px"></div>
</template>

<script setup>
onMounted(() => {
  renderEchart()
})

/**渲染图表 */
const echartRef = ref(null)
// const myChart = ref({})
const renderEchart = () => {
  const myChart = window.$echarts.init(echartRef.value)
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [150, 230, 11, 218, 21, 147, 260],
        type: 'line',
      },
    ],
  }
  myChart.setOption(option)
  window.addEventListener('resize', function () {
    myChart.resize()
  })
}
</script>

<style lang="less" scoped></style>
