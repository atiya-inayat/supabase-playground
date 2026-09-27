export default function Contact() {
  return (
    <main className="min-h-screen px-6 py-16 text-gray-900 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold tracking-wider text-gray-500 uppercase">
            Get in Touch
          </p>

          <h1 className="mb-4 text-4xl font-bold">Have a question?</h1>

          <p className="max-w-2xl mx-auto text-gray-600">
            Whether you have feedback about the Todo App or want to report an
            issue, feel free to get in touch. We would love to hear from you.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="p-6 bg-white border shadow-sm rounded-xl">
            <h2 className="mb-6 text-xl font-semibold">Contact Information</h2>

            <div className="space-y-5">
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="mt-1">hello@example.com</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="mt-1">+92 300 1234567</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Response Time
                </p>
                <p className="mt-1">Usually within 24 hours</p>
              </div>
            </div>
          </div>

          <form className="p-6 bg-white border shadow-sm rounded-xl">
            <h2 className="mb-6 text-xl font-semibold">Send a Message</h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-500"
              />

              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-500"
              />

              <textarea
                placeholder="Your message"
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none resize-none focus:border-gray-500"
              />

              <button
                type="submit"
                className="w-full px-4 py-3 font-medium text-white transition bg-gray-800 rounded-lg hover:bg-gray-700"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
