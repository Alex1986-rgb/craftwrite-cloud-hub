
import { Facebook, Instagram, Linkedin, Youtube, MessageCircle, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialLinksProps {
  variant?: "default" | "footer" | "contact";
  showLabels?: boolean;
  className?: string;
}

const socialLinks = [
  {
    name: "Telegram",
    icon: MessageCircle,
    url: "https://t.me/Koopeerayter",
    color: "text-blue-500 hover:text-blue-600",
    bgColor: "bg-blue-100 hover:bg-blue-200"
  },
  {
    name: "Instagram", 
    icon: Instagram,
    url: "https://instagram.com/copyprocloud",
    color: "text-pink-500 hover:text-pink-600",
    bgColor: "bg-pink-100 hover:bg-pink-200"
  },
  {
    name: "LinkedIn",
    icon: Linkedin, 
    url: "https://linkedin.com/company/copyprocloud",
    color: "text-blue-600 hover:text-blue-700",
    bgColor: "bg-blue-100 hover:bg-blue-200"
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://youtube.com/@copyprocloud",
    color: "text-red-500 hover:text-red-600", 
    bgColor: "bg-red-100 hover:bg-red-200"
  },
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://facebook.com/copyprocloud",
    color: "text-blue-600 hover:text-blue-700",
    bgColor: "bg-blue-100 hover:bg-blue-200"
  }
];

const contactLinks = [
  {
    name: "Телефон",
    icon: Phone,
    url: "tel:+79257338648",
    label: "+7 (925) 733-86-48",
    color: "text-green-600 hover:text-green-700",
    bgColor: "bg-green-100 hover:bg-green-200"
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:optteem@mail.ru",
    label: "optteem@mail.ru", 
    color: "text-purple-600 hover:text-purple-700",
    bgColor: "bg-purple-100 hover:bg-purple-200"
  }
];

export default function SocialLinks({ variant = "default", showLabels = false, className = "" }: SocialLinksProps) {
  if (variant === "contact") {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        {contactLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 p-3 rounded-xl ${link.bgColor} ${link.color} transition-all duration-300 hover:scale-105 hover:shadow-md`}
          >
            <link.icon className="w-5 h-5" />
            {showLabels && (
              <span className="font-medium text-sm">{link.label}</span>
            )}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center w-10 h-10 rounded-xl ${social.bgColor} ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg group`}
          title={social.name}
        >
          <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
        </a>
      ))}
    </div>
  );
}
