import { Link } from "react-router-dom";
import { Home, Compass, Settings, HelpCircle, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import NavItem from "@/components/ui/nav-item";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <div
      className={cn(
        "fixed h-screen border-r border-border transition-all duration-300",
        isOpen ? "w-[72px]" : "w-60",
      )}
    >
      <Button
        variant="default"
        size="icon"
        className="absolute -right-2.5 top-10 z-10 h-6 w-6 rounded-full border border-border bg-gray-800 hover:bg-accent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ChevronLeft
          className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
        />
      </Button>
      <div className="p-4">
        <Link to="/" className="flex items-center justify-center gap-2">
          {!isOpen && <h1 className="font-bold text-xl">Tain의 블로그</h1>}
        </Link>
      </div>

      <nav className="space-y-1 px-3 py-5">
        <NavItem href="/" icon={Home} collapsed={isOpen}>
          Home
        </NavItem>
        <NavItem href="#" icon={Compass} collapsed={isOpen}>
          Rust
        </NavItem>
        <NavItem href="#" icon={Settings} collapsed={isOpen}>
          Blockchain
        </NavItem>
        <NavItem href="#" icon={HelpCircle} collapsed={isOpen}>
          Computer
        </NavItem>
      </nav>

      {!isOpen && (
        <div className="absolute bottom-6 px-6 text-sm text-neutral-500">
          <div>Blockchain Developer</div>
        </div>
      )}
    </div>
  );
}
