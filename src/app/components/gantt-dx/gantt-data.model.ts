export interface Task {
  id: number;
  parentId: number;
  title: string;
  start: Date;
  end: Date;
  progress?: number;
}

export interface Dependency {
  id: number;
  predecessorId: number;
  successorId: number;
  type: number;
}

export const tasks: Task[] = [
  {
    id: 1,
    parentId: 0,
    title: 'First Parent',
    start: new Date(Date.now() +1000000),
    end: new Date(Date.now() + 2000000)
  },
  {
    id: 2,
    parentId: 1,
    title: 'Second Parent',
    start: new Date(Date.now() + 4000000),
    end: new Date(Date.now() + 8000000)
  },
  {
    id: 3,
    parentId: 2,
    title: 'First Child',
    start: new Date(Date.now() + 5000000),
    end: new Date(Date.now() + 7000000)
  },
  {
    id: 4,
    parentId: 2,
    title: 'Second Child',
    start: new Date(Date.now() + 7000000),
    end: new Date(Date.now() + 8000000)
  },
  {
    id: 5,
    parentId: 1,
    title: 'Third Parent',
    start: new Date(Date.now()),
    end: new Date(Date.now() + 10000000)
  },
  {
    id: 6,
    parentId: 5,
    title: 'First Child',
    start: new Date(Date.now() + 1000000),
    end: new Date(Date.now() + 5000000)
  },
  {
    id: 7,
    parentId: 5,
    title: 'Second Child',
    start: new Date(Date.now() + 5000000),
    end: new Date(Date.now() + 10000000)
  }
];
export const dependencies: Dependency[] = [
  {
    id: 1,
    predecessorId: 1,
    successorId: 2,
    type: 1
  },
  {
    id: 2,
    predecessorId: 2,
    successorId: 3,
    type: 0
  },
  {
    id: 3,
    predecessorId: 6,
    successorId: 7,
    type: 0
  },
  {
    id: 4,
    predecessorId: 1,
    successorId: 5,
    type: 1
  }
];
