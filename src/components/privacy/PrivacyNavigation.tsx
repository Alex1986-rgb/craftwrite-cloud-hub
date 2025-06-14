
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, Shield, Lock, Eye, FileText, Users, Database } from "lucide-react";

const sections = [
  { id: "general", title: "Общие положения", icon: Shield },
  { id: "collection", title: "Сбор данных", icon: Database },
  { id: "usage", title: "Использование данных", icon: Eye },
  { id: "storage", title: "Хранение данных", icon: Lock },
  { id: "rights", title: "Ваши права", icon: Users },
  { id: "contacts", title: "Контакты", icon: FileText }
];

interface PrivacyNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function PrivacyNavigation({ activeSection, onSectionChange }: PrivacyNavigationProps) {
  return (
    <Card className="p-6 sticky top-24 bg-gradient-to-br from-white/95 to-green-50/30 backdrop-blur-sm border-green-200/30">
      <h3 className="text-lg font-bold mb-4 text-green-800 flex items-center gap-2">
        <Shield className="w-5 h-5" />
        Содержание
      </h3>
      <nav className="space-y-2">
        {sections.map((section) => (
          <Button
            key={section.id}
            variant={activeSection === section.id ? "default" : "ghost"}
            className={`w-full justify-start gap-3 transition-all duration-300 ${
              activeSection === section.id 
                ? "bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg" 
                : "hover:bg-green-50 hover:text-green-700"
            }`}
            onClick={() => onSectionChange(section.id)}
          >
            <section.icon className="w-4 h-4" />
            <span className="flex-1 text-left">{section.title}</span>
            <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
              activeSection === section.id ? "rotate-90" : ""
            }`} />
          </Button>
        ))}
      </nav>
    </Card>
  );
}
