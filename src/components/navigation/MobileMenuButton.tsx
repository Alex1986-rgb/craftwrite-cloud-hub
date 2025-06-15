
import { Menu, X } from "lucide-react";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function MobileMenuButton({ isOpen, onToggle }: MobileMenuButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="lg:hidden p-2 rounded-lg hover:glass-unified transition-colors duration-200"
      aria-label="Toggle mobile menu"
    >
      {isOpen ? (
        <X className="w-6 h-6 text-neutral-600" />
      ) : (
        <Menu className="w-6 h-6 text-neutral-600" />
      )}
    </button>
  );
}
