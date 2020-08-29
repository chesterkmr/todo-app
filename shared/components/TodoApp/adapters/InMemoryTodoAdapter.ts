import {
  TodoAdapter,
  ICreateTodoItem,
  ITodoItem,
} from "./TodoAdapter.abstract";
import { getRandomId } from "utils/getRandomId";

export class InMemoryTodoAdapter implements TodoAdapter {
  private todoStore: Map<string, ITodoItem> = new Map();

  async add(todo: ICreateTodoItem): Promise<ITodoItem> {
    const id = getRandomId();

    if (this.todoStore.has(id)) return this.add(todo); // will do recursive call in case of collision, may never occur.

    const todoItem = this.buildTodo(todo, id);
    this.todoStore.set(id, todoItem);

    return todoItem;
  }

  async delete(id: string) {
    if (!this.todoStore.has(id))
      throw new Error("Todo not registered in store.");

    this.todoStore.delete(id);

    return;
  }

  async update(id: string, payload: ICreateTodoItem) {
    if (!this.todoStore.has(id))
      throw new Error("Todo not registered in store.");

    const updatedTodo = {
      ...this.todoStore.get(id),
      ...payload,
    };

    this.todoStore.set(id, updatedTodo);

    return updatedTodo;
  }

  async getList() {
    return this.convertMapToList();
  }

  async getById(id: string) {
    if (!this.todoStore.has(id)) return null;

    return this.todoStore.get(id);
  }

  private buildTodo(todo: ICreateTodoItem, id): ITodoItem {
    const todoItem: ITodoItem = {
      ...todo,
      id,
      completed: false,
    };

    return todoItem;
  }

  private convertMapToList = (): ITodoItem[] => {
    const items = Array.from(this.todoStore.entries()).map((t) => t[1]);
    return items;
  };
}
