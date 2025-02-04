import { Link, useSearchParams, useNavigate } from "react-router-dom";
import {
  Home,
  Compass,
  Settings,
  HelpCircle,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import NavItem from "@/components/ui/nav-item";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  const handleCategoryClick = (category: string) => {
    setSearchParams({ category });
    navigate(`/?category=${category}`);
    setIsOpen(false); // 모바일에서는 클릭 시 자동으로 닫힘
  };

  return (
    <div
      className={cn(
        "fixed top-0 left-0 h-screen bg-background dark:bg-background border-r border-border transition-all duration-300 z-50",
        isOpen
          ? "translate-x-0 w-60"
          : "-translate-x-full md:w-[72px] md:translate-x-0",
      )}
    >
      {/* 사이드바 헤더 */}
      {isOpen && (
        <Button
          variant="default"
          size="icon"
          className="absolute -right-2.5 top-10 z-10 h-6 w-6 rounded-full border border-border bg-background hover:bg-accent"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform")} />
        </Button>
      )}
      <div className="px-3 py-4">
        {!isOpen ? (
          <span className="hidden md:block">
            <div className="flex items-center justify-center px-3 py-1 hover:bg-accent rounded-lg transition-colors">
              <Menu className="w-5 h-5" onClick={() => setIsOpen(!isOpen)} />
            </div>
          </span>
        ) : (
          <Link to="/" className="flex items-center justify-center gap-2">
            <h1 className="font-bold text-xl">Tain의 블로그</h1>
          </Link>
        )}
      </div>

      {/* 내비게이션 */}
      <nav className="space-y-1 px-3 py-5">
        <NavItem href="/" icon={Home} collapsed={!isOpen}>
          Home
        </NavItem>
        <button onClick={() => handleCategoryClick("rust")} className="w-full">
          <NavItem href="#" icon={Compass} collapsed={!isOpen}>
            Rust
          </NavItem>
        </button>
        <button
          onClick={() => handleCategoryClick("blockchain")}
          className="w-full"
        >
          <NavItem href="#" icon={Settings} collapsed={!isOpen}>
            Blockchain
          </NavItem>
        </button>
        <button
          onClick={() => handleCategoryClick("computer")}
          className="w-full"
        >
          <NavItem href="#" icon={HelpCircle} collapsed={!isOpen}>
            Computer
          </NavItem>
        </button>
      </nav>

      {isOpen && (
        <div className="absolute bottom-6 px-6 text-sm text-neutral-500">
          <div>Blockchain Developer</div>
        </div>
      )}
    </div>
  );
}
