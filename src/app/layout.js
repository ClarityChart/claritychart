export const metadata = {
  title: 'ClarityChart — Hospice Documentation Platform',
  description: 'AI-powered clinical documentation built exclusively for hospice.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#0f1923' }}>
        {children}
      </body>
    </html>
  );
}
