import styles from "styles/Welcome.module.scss";
import { Typography, Button, Row, Col } from "antd";
import { RootPageLink } from "shared/components/RootPageLink";
import Link from "next/link";
import { AuthLayout } from "shared/layouts";

const { Title } = Typography;

export default function WelcomePage() {
  return (
    <AuthLayout>
      <Row className={styles.wrapper}>
        <Col span={24}>
          <Row className={styles.brandWrapper}>
            <Col span={8} className={styles.brandIconWrapper}>
              <RootPageLink>
                <img
                  src="/brand-icon.png"
                  className={styles.brandIcon}
                  alt="ToDo - App brand icon."
                />
              </RootPageLink>
            </Col>
            <Col span={16} className={styles.textContainer}>
              <Title className={styles.title}>Todo - App</Title>
              <Title className={styles.subtitle} level={2}>
                Create, read, update, delete.
              </Title>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row className={styles.navigation} gutter={[8, 8]}>
            <Col span={8}>
              <Link href="/signin">
                <Button type="default" block>
                  Sign In
                </Button>
              </Link>
            </Col>
            <Col span={8}>
              <Link href="/signup">
                <Button type="primary" block>
                  Sign Up
                </Button>
              </Link>
            </Col>
            <Col span={8}>
              <Link href="/apppage">
                <Button type="default" block>
                  Demo
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </AuthLayout>
  );
}
