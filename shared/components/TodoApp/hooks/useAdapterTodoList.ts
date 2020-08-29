import * as React from "react";
import {
  ITodoItem,
  TodoAdapter,
  ICreateTodoItem,
} from "../adapters/TodoAdapter.abstract";

export function useAdapterTodoList(adapter: TodoAdapter) {
  const [items, setItems] = React.useState<ITodoItem[]>([]);

  const refreshList = React.useCallback(() => {
    adapter.getList().then((list) => setItems(list));
  }, []);

  const addItem = React.useCallback(
    (item: ICreateTodoItem) => {
      adapter.add(item).then((todo) => setItems([...items, todo]));
    },
    [items]
  );

  const updateItem = React.useCallback(
    (id: string, payload: ICreateTodoItem) => {
      adapter.update(id, payload).then(refreshList);
    },
    [items]
  );

  const deleteItem = React.useCallback(
    (id: string) => {
      adapter.delete(id).then(refreshList);
    },
    [items]
  );

  React.useEffect(refreshList, []);

  return [items, setItems, addItem, updateItem, deleteItem] as [
    ITodoItem[],
    any,
    any,
    any,
    any
  ];
}
