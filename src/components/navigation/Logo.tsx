
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

interface LogoProps {
  onLogoClick?: () => void;
}

export default function Logo({ onLogoClick }: LogoProps) {
  return (
    <Link 
      to="/" 
      className="flex items-center gap-3 font-bold text-xl md:text-2xl text-primary min-w-0 group"
      onClick={onLogoClick}
    >
      <div className="w-8 h-8 md:w-10 md:h-10 gradient-brand-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
      </div>
      <span className="gradient-text-brand truncate">
        CopyPro<span className="text-neutral-600">Cloud</span>
      </span>
    </Link>
  );
}
