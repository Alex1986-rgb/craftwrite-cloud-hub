
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function PaymentSuccessReceipt() {
  const handleDownload = () => {
    // Implement receipt download logic
    console.log('Downloading receipt...');
  };

  return (
    <div className="mt-6">
      <Button 
        variant="ghost" 
        size="sm"
        onClick={handleDownload}
        className="text-gray-600 hover:text-gray-800"
        aria-label="Скачать чек об оплате"
      >
        <Download className="w-4 h-4 mr-2" aria-hidden="true" />
        Скачать чек
      </Button>
    </div>
  );
}
