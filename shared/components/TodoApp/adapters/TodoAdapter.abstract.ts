export interface ITodoItem {
  id: string;
  content: string;
  timestamp: number;
  completed: boolean;
}

export type ICreateTodoItem = Omit<ITodoItem, "id">;

export abstract class TodoAdapter {
  abstract async add(todo: ICreateTodoItem): Promise<ITodoItem>;

  abstract async update(
    id: string,
    payload: ICreateTodoItem
  ): Promise<ITodoItem>;

  abstract async delete(id: string): Promise<void>;

  abstract async getList(): Promise<ITodoItem[]>;

  abstract async getById(id: string): Promise<ITodoItem | null>;
}
