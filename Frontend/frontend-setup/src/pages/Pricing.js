import React, { useEffect, useState } from "react";
import BottomBanner from "../components/BottomBanner.js";
import Loading from "../components/Loading.js";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:5000";

function PricingPage() {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (performance.getEntriesByType("navigation")[0]?.type === "back_forward") {
        setIsLoading(false);
      } 
    
    const query = new URLSearchParams(window.location.search);
    if (query.get("status") === "success") {
      setShowSuccessPopup(true);
    } else if (query.get("status") === "cancel") {
      setShowCancelPopup(true);
    }
  }, []);

  const handleSubscribe = async () => {
    setIsLoading(true); // show loading spinner
    try {
      const response = await fetch(`${API_BASE_URL}/api/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Unable to create Stripe session");
        setIsLoading(false); // hide loading on failure
      }
    } catch (err) {
      console.error("Error:", err);
      setIsLoading(false); // hide loading on error
    }
  };

  return (
    <div>
      <div style={{ padding: "80px 20px", textAlign: "center" }}>
        <h1 style={{ color: "#5A153D", fontSize: "2.5rem" }}>Unlock Premium Access</h1>
        <p style={{ fontSize: "1.2rem", color: "#333" }}>
        We're still figuring out the best way to price Viserra to make it accessible. For now, everything's free. Just sign up and explore!
        </p>

        <button
          onClick={handleSubscribe}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#faf0fb";
            e.currentTarget.style.color = "#5A153D";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#5A153D";
            e.currentTarget.style.color = "#fff";
          }}
          style={{
            backgroundColor: "#5A153D",
            color: "#fff",
            padding: "12px 28px",
            fontSize: "1.1rem",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "30px",
          }}
        >
          Subscribe Now
        </button>
      </div>

      {/* SUCCESS POPUP */}
      {showSuccessPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "25px",
              borderRadius: "10px",
              textAlign: "center",
              width: "320px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ color: "#5A153D" }}>Payment Successful!</h3>
            <p style={{ color: "#333" }}>
              You are now a premium subscriber. Thank you!
            </p>
            <button
              onClick={() => setShowSuccessPopup(false)}
              style={{
                backgroundColor: "#5A153D",
                color: "white",
                padding: "10px 16px",
                border: "none",
                borderRadius: "6px",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* CANCEL POPUP */}
      {showCancelPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "25px",
              borderRadius: "10px",
              textAlign: "center",
              width: "320px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ color: "#5A153D" }}>Payment Canceled</h3>
            <p style={{ color: "#333" }}>
              Your subscription was not completed.
            </p>
            <button
              onClick={() => setShowCancelPopup(false)}
              style={{
                backgroundColor: "#5A153D",
                color: "white",
                padding: "10px 16px",
                border: "none",
                borderRadius: "6px",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isLoading && <Loading />}
      <BottomBanner />
    </div>
  );
}

export default PricingPage;