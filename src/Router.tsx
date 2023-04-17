import { Route, Routes } from 'react-router-dom'

import { Certification } from './pages/Certification'
import { Home } from './pages/Home'

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/certificiation/:title" element={<Certification />} />
        </Routes>
    )
}