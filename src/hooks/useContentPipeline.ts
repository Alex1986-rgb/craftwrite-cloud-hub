
import { useState, useEffect, useCallback } from 'react';
import { contentPipeline, GenerationOrder } from '@/services/contentGenerationPipeline';
import { toast } from '@/hooks/use-toast';

export function useContentPipeline() {
  const [orders, setOrders] = useState<GenerationOrder[]>([]);
  const [activeOrder, setActiveOrder] = useState<GenerationOrder | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const createOrder = useCallback((orderData: {
    userId: string;
    serviceId: string;
    parameters: any;
  }) => {
    const orderId = contentPipeline.createOrder(orderData);
    
    toast({
      title: "Заказ создан",
      description: `Заказ ${orderId} добавлен в очередь обработки`,
    });
    
    return orderId;
  }, []);

  const startProcessing = useCallback(async (orderId: string) => {
    setIsProcessing(true);
    
    try {
      await contentPipeline.startProcessing(orderId, (updatedOrder) => {
        setActiveOrder(updatedOrder);
        setOrders(prev => prev.map(order => 
          order.id === updatedOrder.id ? updatedOrder : order
        ));
        
        // Уведомления о ключевых этапах
        if (updatedOrder.status === 'completed') {
          toast({
            title: "Заказ готов! 🎉",
            description: `Заказ ${orderId} успешно завершен`,
          });
          setIsProcessing(false);
        } else if (updatedOrder.status === 'failed') {
          toast({
            title: "Ошибка обработки",
            description: updatedOrder.errorMessage || "Произошла ошибка при обработке заказа",
            variant: "destructive"
          });
          setIsProcessing(false);
        }
      });
    } catch (error) {
      console.error('Ошибка запуска обработки:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось запустить обработку заказа",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  }, []);

  const createAndProcessOrder = useCallback(async (orderData: {
    userId: string;
    serviceId: string;
    parameters: any;
  }) => {
    const orderId = createOrder(orderData);
    await startProcessing(orderId);
    return orderId;
  }, [createOrder, startProcessing]);

  const getOrder = useCallback((orderId: string) => {
    return contentPipeline.getOrder(orderId);
  }, []);

  const getAllOrders = useCallback(() => {
    return contentPipeline.getAllOrders();
  }, []);

  // Загружаем все заказы при инициализации
  useEffect(() => {
    setOrders(getAllOrders());
  }, [getAllOrders]);

  return {
    orders,
    activeOrder,
    isProcessing,
    createOrder,
    startProcessing,
    createAndProcessOrder,
    getOrder,
    getAllOrders
  };
}
