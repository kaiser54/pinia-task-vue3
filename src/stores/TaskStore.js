import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    loading: false,
    name: "Yoshida",
  }),
  getters: {
    favs() {
      return this.tasks.filter((t) => t.isFav);
    },
    favCount() {
      return this.tasks.reduce((previousValue, currentValue) => {
        return currentValue.isFav ? previousValue + 1 : previousValue;
      }, 0);
    },
    totalCount: (state) => {
      return state.tasks.length;
    },
  },
  actions: {
    async getTasks() {
      this.loading = true;
      const res = await fetch("https://my-json-server.typicode.com/kaiser54/pinia-task-vue3/tasks");
      const data = await res.json();
      this.tasks = data;
      this.loading = false;
    },
    async addTask(task) {
      this.tasks.push(task);

      const res = await fetch("https://my-json-server.typicode.com/kaiser54/pinia-task-vue3/tasks", {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.error) {
        console.log(res.error);
      }

    },
    async deleteTask(id) {
      this.tasks = this.tasks.filter((t) => {
        return t.id !== id;
      });

      const res = await fetch("https://my-json-server.typicode.com/kaiser54/pinia-task-vue3/tasks" + id, {
        method: "DELETE",
      });

      if (res.error) {
        console.log(res.error);
      }

    },
    async toggleFav(id) {
      const task = this.tasks.find((t) => t.id === id);

      task.isFav = !task.isFav;

      const res = await fetch("https://my-json-server.typicode.com/kaiser54/pinia-task-vue3/tasks" + id, {
        method: "PATCH",
        body: JSON.stringify({ isFav: task.isFav }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.error) {
        console.log(res.error);
      }

    },
  },
});
