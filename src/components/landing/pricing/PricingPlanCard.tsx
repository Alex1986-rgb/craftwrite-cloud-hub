
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, LucideIcon } from "lucide-react";

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  period: string;
  icon: LucideIcon;
  popular: boolean;
  features: string[];
  gradient: string;
  bgGradient: string;
}

interface PricingPlanCardProps {
  plan: PricingPlan;
}

export default function PricingPlanCard({ plan }: PricingPlanCardProps) {
  return (
    <Card 
      className={`group relative p-8 hover:shadow-2xl transition-all duration-700 border-0 overflow-hidden ${
        plan.popular 
          ? 'bg-gradient-to-br from-primary/5 to-purple-500/5 scale-105 ring-2 ring-primary/20' 
          : `bg-gradient-to-br ${plan.bgGradient}`
      } hover:scale-105 hover:-translate-y-2`}
    >
      {plan.popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-purple-600 text-white border-0 px-6 py-2 font-bold">
          Популярный
        </Badge>
      )}
      
      <div className="text-center mb-8">
        <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-2xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
          <plan.icon className="w-8 h-8 text-white" />
        </div>
        
        <h3 className="text-2xl font-bold mb-2 text-foreground">
          {plan.name}
        </h3>
        <p className="text-muted-foreground mb-4">
          {plan.description}
        </p>
        
        <div className="mb-6">
          <span className="text-4xl font-bold text-primary">{plan.price}</span>
          <span className="text-muted-foreground ml-2">{plan.period}</span>
        </div>
      </div>
      
      <div className="space-y-3 mb-8">
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-foreground">{feature}</span>
          </div>
        ))}
      </div>
      
      <Button 
        asChild 
        size="lg" 
        className={`w-full group-hover:scale-105 transition-all duration-300 ${
          plan.popular 
            ? 'bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90' 
            : 'bg-gradient-to-r ' + plan.gradient + ' hover:opacity-90'
        }`}
      >
        <Link to="/order" className="flex items-center justify-center gap-2">
          Заказать сейчас
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </Button>
    </Card>
  );
}
