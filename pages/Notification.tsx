import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator } from
"@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface NotificationData {
  id: number;
  from_id: string;
  to_id: string;
  body: string;
  category: string;
  created_at: string;
}

interface NotificationProps {
  messages: {
    notifications: NotificationData[];
  };
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'referal':
    case 'referral':
      return '🔄';
    case 'appointment':
      return '📅';
    case 'lab':
    case 'lab_results':
      return '🧪';
    case 'prescription':
      return '💊';
    case 'alert':
      return '⚠️';
    default:
      return '📢';
  }
};

export default function Notification({ messages }: NotificationProps) {
  const notifications = messages?.notifications || [];

  return (
    <DropdownMenu data-id="fhi27w8tt" data-path="src/components/Notification.tsx">
      <DropdownMenuTrigger asChild data-id="ty5neip6h" data-path="src/components/Notification.tsx">
        <Button variant="ghost" size="icon" className="relative" data-id="2wdbhvy9n" data-path="src/components/Notification.tsx">
          <Bell className="h-5 w-5" data-id="dll8rubap" data-path="src/components/Notification.tsx" />
          {notifications.length > 0 &&
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center" data-id="hiqvdxbdg" data-path="src/components/Notification.tsx">
              {notifications.length > 9 ? '9+' : notifications.length}
            </span>
          }
          <span className="sr-only" data-id="8vx8o2bj2" data-path="src/components/Notification.tsx">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" data-id="utwkp5hex" data-path="src/components/Notification.tsx">
        <DropdownMenuLabel data-id="lz8p2o7m2" data-path="src/components/Notification.tsx">Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator data-id="lingpcr6p" data-path="src/components/Notification.tsx" />
        {notifications.length > 0 ?
        <>
            {notifications.map((notification) =>
          <DropdownMenuItem
            key={notification.id}
            className="flex items-start gap-2 p-3 cursor-pointer hover:bg-gray-50" data-id="a8zmf8efc" data-path="src/components/Notification.tsx">

                <span className="text-lg flex-shrink-0 mt-0.5" data-id="t2zmu7kkg" data-path="src/components/Notification.tsx">
                  {getCategoryIcon(notification.category)}
                </span>
                <div className="flex flex-col flex-1 min-w-0" data-id="osl85z9qr" data-path="src/components/Notification.tsx">
                  <span className="text-sm text-gray-900 leading-relaxed" data-id="3mvzejook" data-path="src/components/Notification.tsx">
                    {notification.body}
                  </span>
                  <span className="text-xs text-gray-500 mt-1 capitalize" data-id="pam93hqfq" data-path="src/components/Notification.tsx">
                    {notification.category}
                  </span>
                </div>
              </DropdownMenuItem>
          )}
          </> :
        <DropdownMenuItem className="text-gray-500 text-center py-4" data-id="yb8bem3py" data-path="src/components/Notification.tsx">
            No new notifications
          </DropdownMenuItem>
        }
      </DropdownMenuContent>
    </DropdownMenu>);

}