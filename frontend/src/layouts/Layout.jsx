import React from 'react'
import TopBar from '../components/layout/TopBar'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import SearchOverlay from '../components/common/SearchOverlay'
import ErrorBoundary from '../components/common/ErrorBoundary'
import ScrollToTop from '../components/common/ScrollToTop'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <TopBar />
      <Navbar />
      <SearchOverlay />
      <main className="flex-1">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
