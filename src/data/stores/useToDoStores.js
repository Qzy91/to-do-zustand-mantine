import { create } from "zustand"
import { generateId } from './../utils';
import { persist, createJSONStorage } from 'zustand/middleware'

export const useToDoStores = create(persist((set, get) => ({
    tasks: [
        
    ],
    createTask: (title) => {
        const {tasks} = get();
        const newTask = {
            id: generateId(),
            title,
            status: false,
            description: '',
            createdAt: Date.now(),
        }
        set({
            tasks: [newTask].concat(tasks),
        })
    },
    updateTask: (id, title, desc = false) => {
        const {tasks} = get()
        set({
            tasks: tasks.map((task) => ({
                ...task,
                title: task.id === id ? title : task.title,
                description: (task.id === id) &&  desc ? desc : task.description
            })),
            
        })
    },
    onDone: (id, statusNew) => {
        const {tasks} = get()
        set({
            tasks: tasks.map((task) => (
                id === task.id
                ? { ...task, status: statusNew }
                : task  
            )),
        })
    },
    removeTask: (id) => {
        const {tasks} = get()
        set({
            tasks: tasks.filter((task) => task.id !== id),
        })
    },
  }),
  {
    name: 'tasks', // name of the item in the storage (must be unique)
    storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
  },
  ))