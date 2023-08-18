<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="I need to ..." v-model="newTask" />
    <button>Add</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useTaskStore } from "../stores/TaskStore";
export default {
  setup() {
    const taskStore = useTaskStore();
    const newTask = ref("");
    const uniqueID = () => {
      const timestamp = Date.now().toString(36); // Convert timestamp to base36
      const randomPart = Math.random().toString(36).substr(2, 5); // Random alphanumeric string
      return `${timestamp}-${randomPart}`;
    };
    const handleSubmit = () => {
      if (newTask.value.length > 0) {
        taskStore.addTask({
          id: uniqueID,
          title: newTask.value,
          isFav: false,
        });
        newTask.value = ''
      }
    };
    return { newTask, handleSubmit };
  },
};
</script>