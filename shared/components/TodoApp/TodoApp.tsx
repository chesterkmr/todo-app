import * as React from "react";
import styles from "./TodoApp.module.scss";
import {
  TodoAdapter,
  ITodoItem,
  ICreateTodoItem,
} from "./adapters/TodoAdapter.abstract";
import { InMemoryTodoAdapter } from "./adapters/InMemoryTodoAdapter";
import { useAdapterTodoList } from "./hooks/useAdapterTodoList";
import { TodoItem } from "./components/TodoItem";

interface Props {
  adapter?: TodoAdapter;
}

const adapter = new InMemoryTodoAdapter();

export function TodoApp(props: Props) {
  const [input, setInput] = React.useState("");
  const [items, setItems, addItem, updateItem, deleteItem] = useAdapterTodoList(
    adapter
  );

  const handleChange = React.useCallback(
    (e: React.SyntheticEvent<HTMLInputElement>) => {
      const value = (e.target as HTMLInputElement).value;

      setInput(value);
    },
    [input]
  );

  const handleEdit = React.useCallback(
    (id: string, payload: ICreateTodoItem) => {
      updateItem(id, payload);
    },
    []
  );

  const handleComplete = React.useCallback((id: string) => {
    updateItem(id, { completed: true });
  }, []);

  const handleSubmit = React.useCallback(() => {
    addItem({ content: input, timestamp: Date.now() });
  }, [input]);

  return (
    <div className={styles.todoApp}>
      <input type="text" value={input} onChange={handleChange} />
      <button onClick={handleSubmit}>submit</button>
      <div>
        <p>List:</p>
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.id}>
              <TodoItem
                onCompleteEvent={() => handleComplete(item.id)}
                onDeleteEvent={() => deleteItem(item.id)}
                onEditEvent={(payload) =>
                  handleEdit(item.id, { ...item, content: payload })
                }
                content={item.content}
                timestamp={item.timestamp}
                completed={item.completed}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
