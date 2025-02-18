import { useState, useEffect } from "react";
import { Modal, Form, Input, Button, DatePicker, Select, message } from "antd";
import { getAllVehicles } from "../../api/vehicleService";
import { getAllCoupons } from "../../api/couponService";
import { createBooking } from "../../api/bookingService";

const { RangePicker } = DatePicker;
const { Option } = Select;

const CreateBookingForm = ({ onClose, createBookingOpened }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountedBill, setDiscountedBill] = useState(0);
  const [couponCode, setCouponCode] = useState("");

  const userId = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user["id"];
  };

  const getData = async () => {
    const v = await getAllVehicles();
    const c = await getAllCoupons();
    setCoupons(c);
    setVehicles(v);
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle form submission
  const handleSubmit = async (values) => {
    const [fromDate, toDate] = values.dateRange.map((date) =>
      date.format("YYYY-MM-DD")
    );
    setLoading(true);
    const bookingData = {
      userId: userId(),
      user: {
        id: userId(),
      },
      vehicle: {
        id: values.vehicleId,
      },
      vehicleId: values.vehicleId,
      fromDate,
      toDate,
      totalBill: parseFloat(discountedBill),
      couponCode: appliedCoupon?.code || null,
    };

    try {
      await createBooking(bookingData);
      form.resetFields();
      onClose();
      message.success("Booking placed successfully");
    } catch (err) {
      message.error("Error while creating the booking");
    } finally {
      setLoading(false);
    }
  };

  const handleCouponApply = () => {
    const coupon = coupons.find((c) => c.code === couponCode);
    if (coupon) {
      const discount = (totalBill * coupon.discountPercentage) / 100;
      setAppliedCoupon(coupon);
      setDiscountedBill(totalBill - discount);
      message.success(
        `Coupon applied! Discount: ${coupon.discountPercentage}%`
      );
    } else {
      setAppliedCoupon(null);
      setDiscountedBill(totalBill);
      message.error("Invalid coupon code");
    }
  };

  const handleVehicleChange = (vehicleId) => {
    const selectedVehicle = vehicles.find((v) => v.id === vehicleId);
    if (selectedVehicle) {
      const pricePerDay = selectedVehicle.pricePerDay;
      const dateRange = form.getFieldValue("dateRange");
      if (dateRange && dateRange.length === 2) {
        const [fromDate, toDate] = dateRange;
        const days = toDate.diff(fromDate, "days");
        const bill = pricePerDay * days;
        setTotalBill(bill);
        setDiscountedBill(bill); // Reset to full bill
      }
    }
  };

  const handleDateChange = (dates) => {
    const vehicleId = form.getFieldValue("vehicleId");
    if (vehicleId) {
      handleVehicleChange(vehicleId); // Recalculate total bill when date range changes
    }
  };

  return (
    <Modal
      title="Create Booking"
      open={createBookingOpened}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ totalBill: 0 }}
      >
        <Form.Item
          label="Vehicle"
          name="vehicleId"
          rules={[{ required: true, message: "Please select a vehicle" }]}
        >
          <Select onChange={handleVehicleChange}>
            {vehicles?.map((vehicle) => (
              <Option key={vehicle.id} value={vehicle.id}>
                {vehicle.vehicleNumber}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Date Range"
          name="dateRange"
          rules={[{ required: true, message: "Please select date range" }]}
        >
          <RangePicker onChange={handleDateChange} />
        </Form.Item>

        <Form.Item label="Total Bill">
          <Input value={`$${discountedBill}`} readOnly />
        </Form.Item>

        <Form.Item label="Coupon Code">
          <Input
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
          />
        </Form.Item>

        <Form.Item>
          <Button type="default" onClick={handleCouponApply}>
            Add Coupon
          </Button>
        </Form.Item>

        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit">
            Submit
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={onClose}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateBookingForm;
