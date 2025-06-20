export default function Footer() {
  return (
    <footer className="w-full bg-white text-center py-6 text-sm text-gray-500">
      &copy; {new Date().getFullYear()} Flight Tracker App. All rights reserved.
    </footer>
  );
}
