import React from "react"
import ReactDOM from "react-dom"
import "./assets/main.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { ErrorBoundary } from "react-error-boundary"

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error?: any
  resetErrorBoundary: any
}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
