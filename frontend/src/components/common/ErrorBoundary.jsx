import React from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo })
    console.error('Unhandled React Exception captured by ErrorBoundary:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[70vh] flex items-center justify-center bg-[var(--sand)]/40 p-6 text-[var(--navy-deep)]">
          <div className="max-w-lg w-full bg-white border border-gray-200 shadow-md p-8 text-center rounded-none">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-[#ea580c] mb-4">
              <AlertTriangle size={30} />
            </div>

            <div className="text-xs font-bold uppercase tracking-widest text-[var(--gold)]">
              UNHANDLED APPLICATION ERROR
            </div>

            <h1 className="mt-2 text-2xl font-bold font-serif text-[var(--navy-deep)]">
              Something Went Wrong
            </h1>

            <p className="mt-3 text-xs md:text-sm text-gray-600 leading-relaxed font-normal">
              An unexpected error occurred while rendering this section. Our system has logged the issue for investigation.
            </p>

            {/* Collapsible Error Message in Dev */}
            {this.state.error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-left overflow-auto max-h-32 text-[11px] font-mono text-red-700">
                {this.state.error.toString()}
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={this.handleReload}
                className="inline-flex items-center gap-2 bg-[var(--navy-deep)] !text-white px-6 py-3 font-bold text-xs uppercase tracking-wider hover:bg-[var(--gold)] transition-colors rounded-none shadow-sm"
              >
                <RefreshCw size={15} className="!text-white text-white" />
                <span className="!text-white text-white">Reload Page</span>
              </button>

              <button
                onClick={this.handleGoHome}
                className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 font-bold text-xs uppercase tracking-wider hover:bg-gray-100 transition-colors rounded-none"
              >
                <Home size={15} />
                <span>Return to Home</span>
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
