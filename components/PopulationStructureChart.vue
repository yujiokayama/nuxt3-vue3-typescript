<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
const apexchart = VueApexCharts;

type TSeries = {
  name: string;
  data: number[];
  color: string;
}[];

// 都道府県データ
const { data: prefectures } = useFetch("/api/prefectures");
// 人口構成データ取得
const { population, fetchPopulation } = usePopulation();
// チェックされた値
const checkedItem = ref<number[]>([]);
// 描画用データ
const series = ref<TSeries>([]);
// チャートオプション
const chartOptions = ref({
  chart: {
    id: "population-chart",
    zoom: {
      enabled: false,
    },
  },
  legend: {
    show: false,
  },
  xaxis: {
    categories: [],
    title: { text: "年度" },
  },
  yaxis: {
    title: { text: "人口" },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
});

const handleChangeValues = (values) => {
  checkedItem.value = values;
};

const handleChangeValue = async (prefCode: number) => {
  // チェックボックのON・OFF判定
  if (checkedItem.value.includes(prefCode)) {
    // OFF判定
    checkedItem.value = checkedItem.value.filter((item) => item !== prefCode);
    series.value = series.value.filter(
      ({ name }) => name !== prefectures.value[prefCode - 1].prefName
    );
  } else {
    // ON判定
    checkedItem.value = [...checkedItem.value, Number(prefCode)];
    // チェックボックスの値をparamsにセットしAPI fetch
    await fetchPopulation(prefCode);
    // API fetch初回のみ年号をセット
    if (chartOptions.value.xaxis.categories.length === 0) {
      chartOptions.value.xaxis.categories = population.value.map(({ year }) =>
        String(year)
      );
    }
    series.value = [
      ...series.value,
      {
        name: prefectures.value[prefCode - 1].prefName,
        data: population.value.map(({ value }) => value),
        color: "#" + Math.random().toString(16).slice(-3),
      },
    ];
  }
};
</script>

<template>
  <PrefectureCheckBox
    :check-boxes="prefectures"
    @checked-value="handleChangeValue"
    @update-checked-values="handleChangeValues"
  />
  <div v-if="series.length > 0 && chartOptions.xaxis.categories.length > 0">
    <apexchart type="area" :options="chartOptions" :series="series"></apexchart>
  </div>
  <div v-else>
    <p class="text">人口構成を確認したい都道府県を選択してください</p>
  </div>
</template>

<style lang="scss" scoped>
.text {
  display: flex;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
}
</style>
