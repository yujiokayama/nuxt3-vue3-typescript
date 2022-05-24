<script setup lang="ts">
type Props = {
  checkBoxes?: {
    prefCode: number;
    prefName: string;
  }[];
};

type Emits = {
  (e: "checkedValue", value: number): void;
  (e: "updateCheckedValues", value: number[]): void;
};

const { checkBoxes } = defineProps<Props>();
const checkedValues = ref<number[]>([]);

const emit = defineEmits<Emits>();

const handleChange = (e: Event) => {
  emit("checkedValue", Number((e.target as HTMLInputElement).value));
  emit("updateCheckedValues", checkedValues.value);
};
</script>

<template>
  <div v-if="checkBoxes" class="checkbox">
    <label
      v-for="checkBox in checkBoxes"
      :key="checkBox.prefCode"
      :for="`pref_${checkBox.prefCode}`"
      class="checkbox__input"
    >
      <input
        type="checkbox"
        v-model="checkedValues"
        :value="checkBox.prefCode"
        :id="`pref_${checkBox.prefCode}`"
        @change="handleChange"
        class="checkbox__input--input"
      />
      <span class="checkbox__dummy"></span>
      <span class="checkbox__label-text">{{ checkBox.prefName }}</span>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  flex-wrap: wrap;
  &__input {
    padding: 12px 8px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
    &--input {
      margin: 0;
      width: 0;
      opacity: 0;
      &:checked + .checkbox__dummy {
        background: #333333;
      }
      &:checked + .checkbox__dummy:before {
        content: "";
        display: block;
        position: absolute;
        top: 35%;
        left: 55%;
        width: 40%;
        height: 4px;
        border-radius: 2px;
        transform: translate(-6px, 5px) rotateZ(-135deg);
        transform-origin: 2px 2px;
        background: #ffffff;
      }
      &:checked + .checkbox__dummy:after {
        content: "";
        display: block;
        position: absolute;
        top: 35%;
        left: 55%;
        width: 76%;
        height: 4px;
        border-radius: 2px;
        transform: translate(-6px, 5px) rotateZ(-45deg);
        transform-origin: 2px 2px;
        background: #ffffff;
      }
    }
  }
  &__dummy {
    position: relative;
    top: 0;
    left: 0;
    display: block;
    width: 18px;
    height: 18px;
    border: solid 2px transparent;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
  &__label-text {
    margin-left: 12px;
    display: block;
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
