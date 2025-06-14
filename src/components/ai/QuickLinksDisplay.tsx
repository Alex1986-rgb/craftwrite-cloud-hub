
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface QuickLink {
  title: string;
  url: string;
  description: string;
  icon?: string;
}

interface QuickLinksDisplayProps {
  links: QuickLink[];
  onLinkClick?: (url: string) => void;
}

export const QuickLinksDisplay = ({ links, onLinkClick }: QuickLinksDisplayProps) => {
  const handleLinkClick = (url: string) => {
    if (url.startsWith('http') || url.startsWith('tel:') || url.startsWith('mailto:')) {
      window.open(url, '_blank');
    } else {
      window.location.href = url;
    }
    onLinkClick?.(url);
  };

  if (links.length === 0) return null;

  return (
    <div className="ml-11 mt-3 space-y-2">
      <p className="text-xs text-slate-600 font-medium">🔗 Быстрые переходы:</p>
      <div className="grid grid-cols-1 gap-2">
        {links.map((link, index) => (
          <Button
            key={index}
            onClick={() => handleLinkClick(link.url)}
            variant="outline"
            size="sm"
            className="h-auto p-3 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-blue-200 text-left justify-start"
          >
            <div className="flex items-center gap-2 w-full">
              <span className="text-lg">{link.icon}</span>
              <div className="flex-1 text-left">
                <div className="font-medium text-blue-700 text-sm">{link.title}</div>
                <div className="text-xs text-slate-600">{link.description}</div>
              </div>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};
