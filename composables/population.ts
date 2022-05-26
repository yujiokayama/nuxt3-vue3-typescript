import type { Ref } from "vue";

type TPopulationComposition = {
  message: string | null;
  result: {
    boundaryYear: number;
    data: {
      label: string;
      data: {
        year: number;
        value: number;
      }[];
    }[];
  };
};

type TPopulationData = {
  year: number;
  value: number;
};

const fetchPopulation = (populationData: Ref<TPopulationData[]>) => {
  return async (prefCode: number) => {
    const response: TPopulationComposition = await $fetch(
      `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
      {
        headers: {
          "X-Api-Key": "xkQnzVoWWXsE0d2ubcIjpBIAHQbx3aJJ27HqxyjS",
        },
      }
    );
    populationData.value = response.result.data[0].data;
  };
};

export const usePopulation = () => {
  const population = useState("population", () => [] as TPopulationData[]);
  return {
    population: readonly(population),
    fetchPopulation: fetchPopulation(population),
  };
};
