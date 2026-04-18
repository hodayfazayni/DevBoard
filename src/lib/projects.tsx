export type Project = {
  id: string;
  title: string;
  description: string;
  status: "active" | "completed" | "in-progress";
  createdAt: string;
};

export let projects : Project[] =  [{
    id: "1",
    title: " TO-DO app ",
    description: "A to-do app that lets yout create, delete, update or read a task with full controle",
    status: "completed",
    createdAt: "2026-03-20"
  }
];