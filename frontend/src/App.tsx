import './App.scss'
import { Route, Routes } from 'react-router-dom'
import { PATHS } from 'utils/consts'
import SharedLayout from 'components/templates/SharedLayout'
import HomePage from 'pages/HomePage'
import RegisterPage from 'pages/RegisterPage'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<SharedLayout />}>
          <Route path={PATHS.home} element={<HomePage />} />
          <Route path={PATHS.register} element={<RegisterPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
