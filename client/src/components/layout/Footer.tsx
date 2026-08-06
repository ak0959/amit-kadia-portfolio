export function Footer() {
  return (
    <footer className="bg-[#3B2A60] py-8 border-t border-[#3B2A60]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[#D9CEF5] text-sm font-medium">
          © {new Date().getFullYear()} Amit Kadia. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
