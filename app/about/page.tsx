export default function About() {
  return (
    <main className="min-h-screen px-6 py-16 text-gray-900 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <p className="mb-3 text-sm font-semibold tracking-wider text-gray-500 uppercase">
          About the App
        </p>

        <h1 className="mb-6 text-4xl font-bold tracking-tight">
          Simple tasks. Better organization.
        </h1>

        <p className="mb-6 text-lg leading-8 text-gray-600">
          This Todo App is a simple productivity tool designed to help you keep
          track of the things that matter. You can create tasks, add
          descriptions, update them whenever your plans change, and remove tasks
          when they are no longer needed.
        </p>

        <p className="mb-10 leading-7 text-gray-600">
          The application is built with Next.js, TypeScript, Tailwind CSS, and
          Supabase. It is also a learning project for practicing frontend
          development, database operations, and CRUD functionality.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="p-5 bg-white border rounded-lg shadow-sm">
            <h2 className="mb-2 font-semibold">Create</h2>
            <p className="text-sm text-gray-500">
              Add new tasks with a title and description.
            </p>
          </div>

          <div className="p-5 bg-white border rounded-lg shadow-sm">
            <h2 className="mb-2 font-semibold">Edit</h2>
            <p className="text-sm text-gray-500">
              Update your tasks whenever something changes.
            </p>
          </div>

          <div className="p-5 bg-white border rounded-lg shadow-sm">
            <h2 className="mb-2 font-semibold">Organize</h2>
            <p className="text-sm text-gray-500">
              Keep your daily tasks organized in one place.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
