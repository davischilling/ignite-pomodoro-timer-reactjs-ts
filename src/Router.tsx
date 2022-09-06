import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layouts'
import { Home, History } from './pages'

export const Router = () => (
  <Routes>
    <Route path="/" element={<DefaultLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History />} />
    </Route>
  </Routes>
)
