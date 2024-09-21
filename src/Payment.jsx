import { useEffect, useRef } from "react"
import { loadPaymentWidget, PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk"
// import { ANONYMOUS } from "@tosspayments/payment-widget-sdk"
import { nanoid } from nanoid

const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq"
const customerKey = "YbX2HuSlsC9uVJW6NMRMj"

export default function App() {
    const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null)
    const price = 50_000
  
    useEffect(() => {
      (async () => {
        const paymentWidget = await loadPaymentWidget(clientKey, customerKey)
  
        paymentWidget.renderPaymentMethods("#payment-widget", price)
  
        paymentWidgetRef.current = paymentWidget
      })()
    }, [])

    const handlePayment = async () => {
        const paymentWidget = paymentWidgetRef.current;
    
        try {
            await paymentWidget?.requestPayment({
                orderId: nanoid(),
                orderName: "soft tofu stew",
                customerName: "Jenni",
                customerEmail: "customer123@knu.ac.kr",
                successUrl: `${window.location.origin}/success`,
                failUrl: `${window.location.origin}/fail`,
            });
        } catch (err) {
            console.log(err);
        }
    };
    
    
  
    return (
    <div className="App">
    <h1>주문서</h1>
    <div id="payment-widget" />
    <button onClick={handlePayment}>
        결제하기
    </button>
    </div>
    )
  }