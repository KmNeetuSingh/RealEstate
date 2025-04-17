import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">RealEstatePro</h1>
        <nav className="space-x-4">
          <a href="#" className="text-gray-600 hover:text-blue-600">Home</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Properties</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Contact</a>
        </nav>
      </header>

      <main className="p-8">
        <section className="text-center">
          <h2 className="text-4xl font-bold mb-4">Find Your Dream Home</h2>
          <p className="text-gray-600 mb-6">Search through thousands of properties available at your fingertips.</p>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Browse Listings</button>
        </section>
      </main>

      <footer className="bg-white shadow-inner p-4 text-center mt-auto">
        <p className="text-sm text-gray-500">&copy; 2025 RealEstatePro. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
