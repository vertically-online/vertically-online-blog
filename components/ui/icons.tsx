import type { CSSProperties, SVGProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Lucide icons, served from one cached sprite (public/icons.svg) instead of
 * inlining ~400 bytes of SVG per use. Same names and props as lucide-react,
 * so swapping the import is all a component needs.
 *
 * To add an icon: add a line below, then run `npm run icons` (prebuild runs
 * it too). Stroke defaults live on the .icon class in app/globals.css.
 */

export type IconProps = Omit<SVGProps<SVGSVGElement>, "ref"> & { strokeWidth?: number | string };
export type IconComponent = ((props: IconProps) => React.JSX.Element) & { displayName?: string };

const SPRITE_URL = "/icons.svg";

function icon(name: string): IconComponent {
  const Icon = ({ className, strokeWidth, style, ...props }: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("icon", className)}
      // Inline style beats the .icon stroke-width default (an attribute wouldn't).
      style={strokeWidth ? ({ strokeWidth, ...style } as CSSProperties) : style}
      {...props}
    >
      <use href={`${SPRITE_URL}#${name}`} />
    </svg>
  );
  Icon.displayName = name;
  return Icon;
}

export const ArrowRight = icon("ArrowRight");
export const ArrowUpRight = icon("ArrowUpRight");
export const BarChart3 = icon("BarChart3");
export const CalendarCheck = icon("CalendarCheck");
export const CalendarDays = icon("CalendarDays");
export const Check = icon("Check");
export const CheckCircle2 = icon("CheckCircle2");
export const ChevronDown = icon("ChevronDown");
export const ChevronRight = icon("ChevronRight");
export const ClipboardList = icon("ClipboardList");
export const Clock = icon("Clock");
export const EyeOff = icon("EyeOff");
export const FileText = icon("FileText");
export const Inbox = icon("Inbox");
export const Lightbulb = icon("Lightbulb");
export const Lock = icon("Lock");
export const Mail = icon("Mail");
export const MessageSquareText = icon("MessageSquareText");
export const MonitorPlay = icon("MonitorPlay");
export const Paperclip = icon("Paperclip");
export const Phone = icon("Phone");
export const PhoneCall = icon("PhoneCall");
export const PhoneIncoming = icon("PhoneIncoming");
export const Play = icon("Play");
export const Plus = icon("Plus");
export const Quote = icon("Quote");
export const RefreshCw = icon("RefreshCw");
export const Send = icon("Send");
export const Server = icon("Server");
export const ShieldCheck = icon("ShieldCheck");
export const Star = icon("Star");
export const TrendingUp = icon("TrendingUp");
export const Unplug = icon("Unplug");
export const UserCheck = icon("UserCheck");
export const UserPlus = icon("UserPlus");
export const Users = icon("Users");
export const X = icon("X");
export const Zap = icon("Zap");
