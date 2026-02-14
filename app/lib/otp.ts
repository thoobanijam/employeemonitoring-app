export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString() // 6-digit OTP
}

export function otpExpiry() {
  const expiry = new Date()
  expiry.setMinutes(expiry.getMinutes() + 5) // OTP valid 5 minutes
  return expiry
}
