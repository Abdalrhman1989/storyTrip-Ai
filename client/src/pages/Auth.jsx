import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Mail, Lock, ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-background pt-20 lg:pt-0">
            {/* Visual Side */}
            <div className="hidden lg:flex flex-col justify-center items-center relative overflow-hidden bg-surface p-12">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=3386&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />

                <div className="relative z-10 max-w-lg text-center">
                    <h2 className="text-4xl font-bold mb-6">Unlock your <span className="text-gradient">travel memories.</span></h2>
                    <p className="text-gray-400 text-lg">Join 10,000+ travelers turning photos into cinematic masterpieces.</p>
                </div>
            </div>

            {/* Form Side */}
            <div className="flex flex-col justify-center items-center p-6 md:p-12">
                <div className="w-full max-w-md">
                    <div className="mb-8 text-center">
                        <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold tracking-tighter mb-8">
                            <Camera className="w-6 h-6 text-primary" />
                            StoryTrip<span className="text-primary">.AI</span>
                        </Link>
                        <h1 className="text-3xl font-bold mb-2">{isLogin ? 'Welcome back' : 'Start your journey'}</h1>
                        <p className="text-gray-400">
                            {isLogin ? 'Enter your details to access your stories.' : 'Create an account to start narrating your trips.'}
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-primary transition-colors text-white placeholder-gray-600"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-primary transition-colors text-white placeholder-gray-600"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-primary transition-colors text-white placeholder-gray-600"
                                />
                            </div>
                        </div>

                        <button className="w-full py-4 bg-primary hover:bg-blue-600 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group">
                            {isLogin ? 'Sign In' : 'Create Account'}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-400">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="ml-2 text-primary hover:text-blue-400 font-semibold transition-colors"
                            >
                                {isLogin ? "Sign up" : "Log in"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
