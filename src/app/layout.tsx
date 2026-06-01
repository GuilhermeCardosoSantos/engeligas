// fonts
import { Outfit, Geist } from 'next/font/google';
// css
import './globals.css';
import "flatpickr/dist/flatpickr.css";
// sidebar
import { SidebarProvider } from '@/context/SidebarContext';
// theme
import { ThemeProvider } from '@/context/ThemeContext';
import { cn } from "@/lib/utils";
// provider
import QueryProvider from '@/providers/QueryProvider';
// fonts
const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });
const outfit = Outfit({
  subsets: ["latin"],
});
// toastify
import ToastProvider from '@/providers/ToastProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <QueryProvider>
          <ThemeProvider>
            <SidebarProvider>{children}</SidebarProvider>
            <ToastProvider />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
