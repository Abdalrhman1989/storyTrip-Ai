import { Link } from 'react-router-dom';
import { Camera, Map, User } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center glass">
            <Link to="/" className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2">
                <Camera className="w-6 h-6 text-primary" />
                StoryTrip<span className="text-primary">.AI</span>
            </Link>

            <div className="flex gap-6 items-center">
                <Link to="/trips" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                    My Trips
                </Link>
                <Link to="/create" className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all text-sm font-medium border border-white/10 backdrop-blur-md">
                    + New Story
                </Link>
                <Link to="/auth" className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                </Link>
            </div>
        </nav>
    );
}
