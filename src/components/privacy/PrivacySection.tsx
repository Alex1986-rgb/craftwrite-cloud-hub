
import { Card } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, Info } from "lucide-react";
import { ReactNode } from "react";

interface PrivacySectionProps {
  id: string;
  title: string;
  icon: ReactNode;
  children: ReactNode;
  type?: "info" | "warning" | "success";
}

export default function PrivacySection({ id, title, icon, children, type = "info" }: PrivacySectionProps) {
  const getTypeStyles = () => {
    switch (type) {
      case "warning":
        return "border-orange-200/50 bg-gradient-to-br from-orange-50/80 to-orange-100/30";
      case "success":
        return "border-green-200/50 bg-gradient-to-br from-green-50/80 to-green-100/30";
      default:
        return "border-blue-200/50 bg-gradient-to-br from-blue-50/80 to-blue-100/30";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section id={id} className="scroll-mt-24">
      <Card className={`p-8 mb-8 shadow-lg ${getTypeStyles()} relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-white/80 rounded-xl shadow-sm">
              {icon}
            </div>
            <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
            {getIcon()}
          </div>
          
          <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
            {children}
          </div>
        </div>
      </Card>
    </section>
  );
}
