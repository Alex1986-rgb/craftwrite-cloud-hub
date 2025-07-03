import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface HolographicCardProps {
  children: ReactNode;
  className?: string;
  variant?: "standard" | "ultra" | "neon";
}

export default function HolographicCard({ 
  children, 
  className = "", 
  variant = "standard" 
}: HolographicCardProps) {
  const getVariantClass = () => {
    switch (variant) {
      case "ultra":
        return "glass-ultra floating-3d";
      case "neon":
        return "glass-holographic neon-glow";
      default:
        return "glass-premium magnetic-hover";
    }
  };

  return (
    <Card className={`${getVariantClass()} ${className}`}>
      {children}
    </Card>
  );
}