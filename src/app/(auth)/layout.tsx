export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="w-full max-w-md bg-white p-8 shadow rounded border border-neutral/30">
        {children}
      </div>
    </div>
  );
}