
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import OrderProgressTracker from './advanced/OrderProgressTracker';

export default function OrderTrackingPage() {
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
      console.log('Fetching order data for ID:', orderId);
    }
  }, [searchParams]);

  const handleBackToOrders = () => {
    window.location.href = '/client/orders';
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Загрузка данных заказа...</h2>
          <p className="text-gray-600">Пожалуйста, подождите</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <OrderProgressTracker 
          orderData={orderData}
          onBack={handleBackToOrders}
        />
      </div>
    </div>
  );
}
