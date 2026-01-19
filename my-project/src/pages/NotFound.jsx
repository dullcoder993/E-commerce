import React from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-lg text-gray-600">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      <Link
        to="/"
        className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded text-sm"
      >
        Go back home
      </Link>
    </div>
      </Layout>
    </div>
  )
}

export default NotFound
