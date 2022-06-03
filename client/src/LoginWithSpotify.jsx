import React, { useState } from "react";
import { Typography, Button, Row, Col } from "antd";

export default function LoginWithSpotify() {
  const [loading, setLoading] = useState(false);
  const { Title } = Typography;

  return (
    <>
      <Row>
        <Col span={24}>
          <Title>Pomodoro Buddy</Title>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Title level={4}>a workflow enhancer by matt teran</Title>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <a
            href="/auth/spotify"
            style={{ height: "10vh" }}
          >
            <Button
              size="large"
              shape="round"
              type="primary"
              loading={loading}
              onClick={() => {
                setLoading(true);
              }}
            >
              Get Started with Spotify
            </Button>
          </a>
        </Col>
      </Row>
    </>
  );
}
