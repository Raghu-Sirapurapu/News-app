import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import UploadPage from './pages/UploadPage'
import AdminPage from './pages/AdminPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import NewslettersPage from './pages/NewsLettersPage'
import NewsLetterDataPage from './pages/NewsLetterDataPage'
import PrivateRoute from './components/PrivateRoute'
import MySubmissionsPage from './pages/MySubmissionsPage'
import EditSubmissionPage from './pages/EditSubmissionPage';
import ChangePassword from './pages/ChangePassword';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/change-password" element={
          <PrivateRoute>
            <ChangePassword/>
          </PrivateRoute>
        } />
        <Route path="/admin/:id/dashboard" element={
          <PrivateRoute>
            <AdminPage />
          </PrivateRoute>
        } />
        <Route path="/newsletters/upload" element={
          <PrivateRoute>
            <UploadPage />
          </PrivateRoute>
        } />
        <Route path="/newsletters" element={<NewslettersPage />} />
        <Route path="/newsletters/:id" element={<NewsLetterDataPage />} />
        <Route
          path="/my-submissions/:id"
          element={
            <PrivateRoute>
              <MySubmissionsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-submissions/edit/:id"
          element={
            <PrivateRoute>
              <EditSubmissionPage />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer position='bottom-right'/>
    </div>
  )
}
export default App
