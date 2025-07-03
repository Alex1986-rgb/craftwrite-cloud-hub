-- ПРЯМОЕ СОЗДАНИЕ ТРИГГЕРА БЕЗ ДОПОЛНИТЕЛЬНОЙ ЛОГИКИ

CREATE TRIGGER trigger_order_processing_on_insert
  AFTER INSERT ON public.orders
  FOR EACH ROW
  WHEN (NEW.status = 'pending')
  EXECUTE FUNCTION public.trigger_order_processing();