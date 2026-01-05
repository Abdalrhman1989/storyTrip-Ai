import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Calendar, MapPin, Play, Music } from 'lucide-react';
import { getStories } from '../services/api';

export default function Dashboard() {
    const { data: stories, isLoading, error } = useQuery({
        queryKey: ['stories'],
        queryFn: getStories
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background pt-32 px-6 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background pt-32 px-6 text-center">
                <p className="text-red-500">Failed to load trips. Is the server running?</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-32 px-6 pb-20">
            <div className="container mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">My Journeys</h1>
                        <p className="text-gray-400">Revisit your generated cinematic stories.</p>
                    </div>
                    <Link to="/create" className="px-6 py-3 bg-primary hover:bg-blue-600 rounded-full font-bold flex items-center gap-2 transition-all">
                        <Plus className="w-5 h-5" />
                        New Trip
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stories?.map((trip, i) => (
                        <Link to={`/story/${trip.id}`} key={trip.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative aspect-video rounded-2xl overflow-hidden bg-surface border border-white/5 hover:border-white/20 transition-all cursor-pointer"
                            >
                                {/* Placeholder Gradient since we don't save images yet */}
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800 to-black group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <h3 className="text-xl font-bold mb-1 truncate pr-4">{trip.title}</h3>
                                            <div className="flex items-center gap-4 text-xs text-gray-300 font-medium uppercase tracking-wide">
                                                <span className="flex items-center gap-1"><Music className="w-3 h-3" /> {trip.genre}</span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(trip.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                                            <Play className="w-4 h-4 ml-0.5 fill-current" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}

                    {/* Empty State / Create New Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link to="/create" className="block h-full min-h-[250px] rounded-2xl border-2 border-dashed border-white/10 hover:border-white/30 hover:bg-white/5 transition-all flex flex-col items-center justify-center text-gray-500 hover:text-white group">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Plus className="w-8 h-8" />
                            </div>
                            <span className="font-semibold">Create New Trip</span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
