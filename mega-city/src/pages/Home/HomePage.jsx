import { Layout, Typography, Card, Row, Col, Button } from "antd";
import { useState } from "react";
import "./Home.css";
import CreateBookingForm from "./CreateBookingForm";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const HomePage = () => {
  const [createBookingOpened, setCreateBookingOpened] = useState(false);
  return (
    <Layout className="layout">
      <Content className="content">
        <div className="hero-section">
          <Title>Welcome to Mega City Cab</Title>
          <Paragraph className="subtitle">
            Your Trusted Cab Service in Colombo City
          </Paragraph>
        </div>

        <div className="info-section">
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={8}>
              <Card title="About Us" className="info-card">
                <Paragraph>
                  Mega City Cab is Colombo's leading cab service, trusted by
                  thousands of customers monthly. We provide reliable, safe, and
                  comfortable transportation solutions across the city.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card title="Our Services" className="info-card">
                <Paragraph>
                  • 24/7 Cab Booking
                  <br />
                  • Corporate Services
                  <br />
                  • Airport Transfers
                  <br />
                  • City Tours
                  <br />• Package Deliveries
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card title="Why Choose Us" className="info-card">
                <Paragraph>
                  • Professional Drivers
                  <br />
                  • Modern Vehicle Fleet
                  <br />
                  • Competitive Rates
                  <br />
                  • Real-time Tracking
                  <br />• Secure Payments
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>

        <div className="cta-section">
          <Title level={2}>Ready to Book Your Ride?</Title>
          <Button
            disabled={!localStorage.getItem("user")}
            type="primary"
            size="large"
            onClick={() => {
              setCreateBookingOpened(true);
            }}
          >
            Book Now
          </Button>
        </div>
      </Content>
      <CreateBookingForm
        createBookingOpened={createBookingOpened}
        onClose={() => {
          setCreateBookingOpened(false);
        }}
      />
    </Layout>
  );
};

export default HomePage;
