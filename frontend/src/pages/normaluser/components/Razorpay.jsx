const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Razorpay = async ({ amount, userId, eventId, onSuccess }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        reject(new Error("Failed to load Razorpay SDK"));
        return;
      }

      const options = {
        key: "rzp_test_DwptmlE6gLwR5G", // Replace with your Razorpay key
        currency: "INR",
        amount: amount * 100, // Razorpay takes amount in paise
        name: "EcoImpact",
        description: `Donation for environmental cause`,
        handler: async function (response) {
          try {
            // Make API call to your backend to record the donation
            const donationResponse = await fetch(
              `${import.meta.env.VITE_BACKEND_URL}/api/donations`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify({
                  userId,
                  eventId,
                  amount,
                  paymentId: response.razorpay_payment_id,
                }),
              }
            );

            const data = await donationResponse.json();
            if (data.success) {
              onSuccess(response.razorpay_payment_id);
              resolve({
                success: true,
                paymentId: response.razorpay_payment_id,
              });
            } else {
              reject(new Error("Donation recording failed"));
            }
          } catch (error) {
            reject(error);
          }
        },
        prefill: {
          name: localStorage.getItem("userName") || "Donor",
          email: localStorage.getItem("userEmail") || "",
        },
        theme: {
          color: "#166856",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Razorpay Error:", error);
      reject(error);
    }
  });
};

export default Razorpay;
