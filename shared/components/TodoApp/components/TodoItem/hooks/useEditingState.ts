import * as React from "react";

export function useEditingState() {
  const [editing, setEditing] = React.useState<boolean>(false);
  const [editingValue, setEditingValue] = React.useState<string>("");

  return [editing, setEditing, editingValue, setEditingValue] as any[];
}
