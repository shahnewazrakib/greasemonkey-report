import { Alert, Spin } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Disclaimer from "../components/Disclaimer";
import RatingGuide from "../components/RatingGuide";
import InspectorComment from "../components/InspectorComment";
import Vehicle from "../components/Vehicle";
import Rating from "../components/Rating";
import InspectionResult from "../components/InspectionResult";
import { useStore } from "../store/zustand";
import PoorParts from "../components/PoorParts";
import History from "../components/History";
import HistoryDetail from "../components/HistoryDetail";
import ScrollToTop from "../components/ScrollToTop";

export default function Report() {
  const { reportId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { setData } = useStore();

  const fetchReport = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_BASE_URL}/report/public/${reportId}`
      );
      setData(response.data.report);
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (reportId) {
      fetchReport();
    }
  }, [reportId]);

  return loading ? (
    <div className="flex items-center justify-center min-h-screen">
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </div>
  ) : error ? (
    <div className="max-w-[800px] mx-auto mt-10">
      <Alert message={error} type="error" showIcon />
    </div>
  ) : (
    <div>
      <Header reportId={reportId} />
      <main className="max-w-[1140px] px-4 mx-auto my-5 space-y-5">
        <Vehicle />
        <History />
        <Rating />
        <InspectorComment />
        <PoorParts />
        <InspectionResult />
        <HistoryDetail />
        <RatingGuide />
        <Disclaimer />
        <ScrollToTop />
      </main>
      <Footer />
    </div>
  );
}
