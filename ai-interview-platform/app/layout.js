// app/layout.js
import './globals.css';

export const metadata = {
  title: 'AI Interview Platform',
  description: 'An AI-powered interview platform.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
