import * as React from "react";
import styles from "./TodoItem.module.scss";
import classnames from "classnames";
import { useEditingState } from "./hooks/useEditingState";
import { Row, Col, Button } from "antd";
import ta from "time-ago";
import { calculateTimeDifFromToNow } from "utils/calculateTimeDifFromToNow";
import { TimeAgoText } from "shared/components/TimeAgoText";
import { TodoItemTextArea } from "./components/TodoItemTextArea";

const ONE_MINUTE_IN_MS = 1000 * 60;

interface Props {
  onEditEvent: (payload: string) => void;
  onDeleteEvent: () => void;
  onCompleteEvent: () => void;
  content: string;
  timestamp: number;
  completed?: boolean;
  className?: string;
}

export function TodoItem(props: Props) {
  const [
    editing,
    setEditing,
    editingValue,
    setEditingValue,
  ] = useEditingState();

  const [contentHeight, setContentHeight] = React.useState<number>(0);

  const {
    onEditEvent,
    onDeleteEvent,
    onCompleteEvent,
    content,
    timestamp,
    className,
    completed,
  } = props;

  const inputRef = React.useRef<HTMLTextAreaElement>();
  const contentRef = React.useRef<HTMLDivElement>();

  const handleEditTrigger = React.useCallback(() => {
    if (!contentRef.current) return;

    if (!editing) {
      const contentHeight = contentRef.current.getBoundingClientRect().height;

      setContentHeight(contentHeight);
      setEditingValue(content);
      setEditing(true);

      setTimeout(() => {
        if (!inputRef.current) return;

        inputRef.current.focus();

        // moving input pointer to end of text
        inputRef.current.selectionStart = inputRef.current.value.length;
        inputRef.current.selectionEnd = inputRef.current.value.length;
      });
    }
  }, [content, editing, contentRef]);

  const handleEditSubmit = React.useCallback(() => {
    setEditing(false);
    setEditingValue("");
    onEditEvent(editingValue);
  }, [editing, editingValue]);

  const handleTextAreaChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setEditingValue(e.target.value);
    },
    []
  );

  return (
    <div
      className={classnames(
        styles.todoItem,
        { [styles.completed]: completed },
        className
      )}
    >
      <div
        className={classnames(styles.content, { [styles.editing]: editing })}
        onDoubleClick={completed ? undefined : handleEditTrigger}
        ref={contentRef}
      >
        {editing ? (
          <TodoItemTextArea
            value={editingValue}
            onBlur={handleEditSubmit}
            elRef={inputRef}
            height={contentHeight}
            className={styles.textArea}
            onChange={handleTextAreaChange}
          />
        ) : (
          content
        )}{" "}
      </div>
      <div className={styles.timestamp}>
        <TimeAgoText timestamp={timestamp} refreshRateInMs={ONE_MINUTE_IN_MS} />
      </div>
      <div className={styles.controls}>
        <Row gutter={[8, 0]}>
          <Col span={8}>
            <Button
              type="primary"
              block
              className={styles.doneBtn}
              onClick={onCompleteEvent}
              disabled={completed}
            >
              Done
            </Button>
          </Col>
          <Col span={8}>
            <Button
              type="default"
              block
              onClick={editing ? handleEditSubmit : handleEditTrigger}
              disabled={completed}
            >
              Edit
            </Button>
          </Col>
          <Col span={8}>
            <Button
              type="default"
              block
              onClick={onDeleteEvent}
              disabled={completed}
            >
              Delete
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}
