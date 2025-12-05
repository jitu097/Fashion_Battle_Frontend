import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API, { setAuthToken } from '../../api/axiosConfig'
import './Auth.css'

/**
 * Login Page Component
 * 
 * Clean, minimal login form with gradient accent border.
 * Matches the landing page aesthetic with centered layout.
 * 
 * Features:
 * - Email and password inputs
 * - Primary CTA button
 * - Link to signup page
 * - Fully responsive design
 * - No inline styles - all CSS in Auth.css
 * 
 * File structure:
 * - Component: src/pages/Login.jsx
 * - Styles: src/pages/styles/Auth.css
 */
const Login = () => {
	const navigate = useNavigate()
	const [phone, setPhone] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		try {
			const res = await API.post('/auth/login', { phone, password })
			const { token } = res.data
			setAuthToken(token)
			alert('Login successful!')
			navigate('/home')
		} catch (err) {
			console.error('Login failed', err)
			const msg = err?.response?.data?.error || 'Invalid phone or password'
			alert(msg)
		} finally {
			setLoading(false)
		}
	}

	return (
		<main className="auth-root">
			<div className="auth-container">
				<div className="auth-card">
					{/* Card Header */}
					<div className="auth-header">
						<h1 className="auth-title">Fashion Battle</h1>
						<p className="auth-subtitle">
							<i>Where Fashion Meets Frame</i>
						</p>
					</div>

					{/* Login Form */}
					<form className="auth-form" onSubmit={handleSubmit}>
						<h2 className="auth-heading">Welcome back</h2>
						<p className="auth-description">Sign in to continue</p>

						{/* mobile Field */}
						<div className="auth-field">
							<label className="auth-label mobile-size" htmlFor="mobile">
								Mobile
							</label>
							<input
								id="phone"
								className="auth-input"
								type="tel"
								name="phone"
								placeholder="Enter your mobile number"
								required
								autoComplete="phone"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/>
						</div>

						{/* Password Field */}
						<div className="auth-field">
							<label className="auth-label pass-size" htmlFor="password">
								Password
							</label>
							<input
								id="password"
								className="auth-input"
								type="password"
								name="password"
								placeholder="Enter your password"
								required
								autoComplete="current-password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						{/* Submit Button */}
						<button className="auth-button" type="submit" disabled={loading}>
							{loading ? 'Signing in...' : 'Sign in'}
						</button>

						{/* Footer Link */}
						<div className="auth-footer">
							<p className="auth-footer-text">
								Don't have an account?{' '}
								<Link className="auth-link" to="/signup">
									Sign up
								</Link>
							</p>
						</div>
					</form>
				</div>
			</div>
		</main>
	)
}

export default Login
