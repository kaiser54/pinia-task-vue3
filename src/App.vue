<template>
  <main>
    <!-- Heading -->
    <header class="p-16">
      <img src="./assets/pinia-logo.svg" alt="pinia logo" />
      <h1>Pinia Tasks</h1>
    </header>
    <!-- ========= -->

    <!-- New task form -->
    <div class="new-task-form p-16">
      <TaskForm />
    </div>
    <!-- ========= -->

    <!-- filter nav -->
    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Favorite</button>
    </nav>
    <!-- ========== -->

    <!-- Loading -->
    <div class="loading" v-if="taskStore.loading">Loading tasks ...</div>
    <!-- ======= -->

    <!-- Task list -->
    <div class="task-list p-16" v-if="filter === 'all'">
      <p>You have {{ taskStore.totalCount }} tasks left to do</p>
      <div class="" v-for="(task, index) in taskStore.tasks" :key="index">
        <TaskDetails :task="task" />
      </div>
    </div>
    <!-- ========= -->

    <!-- favs list -->
    <div class="task-list p-16" v-if="filter === 'favs'">
      <p>You have {{ taskStore.favCount }} fav(s) left to do</p>
      <div class="" v-for="(task, index) in taskStore.favs" :key="index">
        <TaskDetails :task="task" />
      </div>
    </div>
    <!-- ========= -->
  </main>
</template>

<script>
import { ref } from "vue";
import TaskDetails from "./components/TaskDetails.vue";
import TaskForm from "./components/TaskForm.vue";

import { useTaskStore } from "./stores/TaskStore";
export default {
  components: { TaskDetails, TaskForm },
  setup() {
    const taskStore = useTaskStore();
    taskStore.getTasks();
    const filter = ref("all");
    return { taskStore, filter };
  },
};
</script>
