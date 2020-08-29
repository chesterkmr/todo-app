import styles from "./AuthLayout.module.scss";

interface Props {
  children: JSX.Element;
}

export function AuthLayout(props: Props) {
  return (
    <div className={styles.authLayout}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}
