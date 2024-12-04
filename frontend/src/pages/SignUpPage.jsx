import React, { useState } from "react"; 
import { useAuthStore } from "../store/useAuthStore";
import { Mail, MessageSquare, User, Lock, EyeOff, Eye, Loader, Loader2 } from "lucide-react"; // Added Eye and EyeOff
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    const fullNamePattern = /^[a-zA-Z\s]{3,}$/; // Only letters and spaces, minimum 3 characters
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard email regex// At least 1 uppercase, 1 lowercase, 1 number, 1 special char, and 8 chars total
  
    // Full Name validation
    if (!fullNamePattern.test(formData.fullName.trim())) {
      return toast.error(
        "Full Name must be at least 3 characters long and contain only letters and spaces"
      );
    }
  
    // Email validation
    if (!emailPattern.test(formData.email.trim())) {
      return toast.error("Enter a valid email address");
    }
  
    // Password validation
    if (!formData.password) {
      return toast.error("Password is required");
    }
  
    return true; // All validations passed
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm()
    if (success === true) await signup(formData)
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="flex items-center justify-center w-14 h-14 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="text-primary w-8 h-8" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
            <p className="text-base-content/60">
              Get started with your free account
            </p>
          </div>

          {/* SIGNUP FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute left-0 inset-y-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute left-0 inset-y-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute left-0 inset-y-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button" // Button type corrected
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}>
              {isSigningUp ?(
                  <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                  </>
              ):(
                "Create Account"
              )
            }
            </button>
          </form>

            <div className="text-center">
              <p className="text-base-content/60">
               Alredy have an account?{" "}
               <Link to="/login" className="link link-primary">
                Sign in
               </Link>
              </p>
            </div>

        </div>
      </div>

            {/* right side */}
      <AuthImagePattern
        title = "Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />

    </div>
  );
};

export default SignUpPage;
