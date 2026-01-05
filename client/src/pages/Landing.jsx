import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Sparkles, MapPin } from 'lucide-react';

export default function Landing() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden text-white selection:bg-primary selection:text-white">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=3506&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

            <div className="relative z-10 container mx-auto px-6 pt-32 pb-20 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium tracking-wide uppercase text-gray-300"
                >
                    <Sparkles className="w-3 h-3 text-primary" />
                    AI-Powered Travel Storytelling
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 max-w-4xl"
                >
                    Turn your <span className="text-gradient">memories</span> into <span className="text-white italic font-serif">cinema.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12"
                >
                    Don't just store photos. Create immersive video narratives with AI director, voiceover, and soundtrack. No editing skills required.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-wrap justify-center gap-4"
                >
                    <Link
                        to="/create"
                        className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition-all flex items-center gap-2"
                    >
                        Create Your Story
                        <Play className="w-4 h-4 fill-black group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        to="/trips"
                        className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-medium text-lg hover:bg-white/10 transition-all"
                    >
                        View Example
                    </Link>
                </motion.div>
            </div>

            {/* Feature Highlights */}
            <div className="relative z-10 container mx-auto px-6 py-20 border-t border-white/5">
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: MapPin, title: "Smart Organization", desc: "Instantly groups your media by location and time." },
                        { icon: Sparkles, title: "AI Director", desc: "Auto-selects the best shots and syncs them to music." },
                        { icon: Play, title: "Cinematic Output", desc: "Export 4K ready reels for Instagram & TikTok." }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 + (i * 0.1) }}
                            className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                        >
                            <feature.icon className="w-8 h-8 text-primary mb-4" />
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
