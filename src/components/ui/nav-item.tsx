import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
  collapsed: boolean;
  onClick?: () => void; // onClick을 선택적으로 추가
}

export default function NavItem({
  href,
  icon: Icon,
  children,
  collapsed,
  onClick,
}: NavItemProps) {
  return (
    <div
      onClick={onClick} // onClick 처리
    >
      <Link
        to={href}
        className={cn(
          "flex items-center gap-3 px-3 py-2 hover:bg-gray-400 rounded-lg transition-colors text-sm",
          collapsed && "justify-center",
        )}
        title={collapsed ? String(children) : undefined}
      >
        <Icon className="h-5 w-5" />
        {!collapsed && children}
      </Link>
    </div>
  );
}
