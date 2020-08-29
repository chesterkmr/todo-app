import classnames from "classnames";
import styles from "./TodoItemTextArea.module.scss";
import { ChangeEvent, HTMLProps } from "react";
import { TextAreaProps } from "antd/lib/input";

interface Props extends HTMLProps<HTMLTextAreaElement> {
  height: number;
  value: string;
  elRef: React.Ref<HTMLTextAreaElement>;
}

export function TodoItemTextArea(props: Props) {
  const { className, height, value, elRef, ...rest } = props;

  return (
    <textarea
      className={classnames(styles.textarea, className)}
      style={{ height: `${height}px` }}
      value={value}
      ref={elRef}
      {...rest}
    />
  );
}
