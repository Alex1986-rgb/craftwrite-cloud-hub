
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ChatbotProgressTracker from '@/components/order/chatbot/advanced/ChatbotProgressTracker';

export default function ChatbotOrderTracking() {
  const [searchParams] = useSearchParams();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Get order data from URL params or localStorage
    const orderId = searchParams.get('orderId');
    const storedOrderData = localStorage.getItem('lastOrderData');
    
    if (storedOrderData) {
      setOrderData(JSON.parse(storedOrderData));
    } else if (orderId) {
      // In a real app, fetch order data by ID
      console.log('Fetching chatbot order data for ID:', orderId);
    }
  }, [searchParams]);

  const handleBackToOrders = () => {
    window.location.href = '/order/chatbot-scripts';
  };

  if (!orderData) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Загрузка данных заказа...</h2>
            <p className="text-gray-600">Пожалуйста, подождите</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 py-8">
        <div className="container mx-auto px-4">
          <ChatbotProgressTracker 
            orderData={orderData}
            onBack={handleBackToOrders}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
