export default function Header({ reportId }) {
  return (
    <header className="bg-primary px-4 py-2">
      <div className="max-w-[1140px] mx-auto flex items-center justify-between gap-2">
        <img src="/logo.png" alt="Logo" width={80} />
        <p className="text-sm font-medium text-white">Report ID: {reportId}</p>
      </div>
    </header>
  );
}
