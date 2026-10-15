// app/dashboard/loading.tsx
export default function Loading() {
  // You can design a spinner, skeleton screens, or text here
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-purple-700" />
    </div>
  );
}
