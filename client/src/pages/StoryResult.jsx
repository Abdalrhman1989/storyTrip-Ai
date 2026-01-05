import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Share2, Download, Music, Clock, Copy, Check, Loader2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getStory } from '../services/api';

export default function StoryResult() {
    const { id } = useParams();
    const [isPlaying, setIsPlaying] = useState(false);
    const [copied, setCopied] = useState(false);

    const { data: story, isLoading, error } = useQuery({
        queryKey: ['story', id],
        queryFn: () => getStory(id),
        retry: false
    });

    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Error loading story.</div>;

    const copyCaption = () => {
        navigator.clipboard.writeText(story.caption);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-background pt-24 px-6 pb-20">
            <div className="container mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                    <div>
                        <div className="text-sm text-primary font-bold uppercase tracking-wider mb-2">Trip #{id} Generated</div>
                        <h1 className="text-4xl md:text-5xl font-bold">{story.title}</h1>
                        <div className="flex items-center gap-4 mt-2 text-gray-400">
                            <span className="flex items-center gap-1"><Music className="w-4 h-4" /> {story.music}</span>
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 0:30s</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-full font-bold flex items-center gap-2 transition-colors">
                            <Download className="w-4 h-4" /> Export Video
                        </button>
                        <button className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column: Preview & Timeline */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Video Preview Placeholer */}
                        <div className="aspect-video bg-black rounded-2xl relative overflow-hidden group border border-white/10 shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=3546&auto=format&fit=crop"
                                alt="Preview"
                                className="w-full h-full object-cover opacity-50"
                            />
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="absolute inset-0 m-auto w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-110 transition-transform group-hover:bg-white/20"
                            >
                                {isPlaying ? <Pause className="w-8 h-8 fill-white" /> : <Play className="w-8 h-8 fill-white" />}
                            </button>
                        </div>

                        {/* Timeline Visualization */}
                        <div className="bg-surface rounded-2xl p-6 border border-white/5">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                Timeline Breakdown
                                <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-gray-400">AI Suggested</span>
                            </h3>
                            <div className="flex gap-2 overflow-x-auto pb-4">
                                {story.timeline.map((clip, i) => (
                                    <div key={i} className="flex-shrink-0 w-32 bg-white/5 border border-white/5 rounded-lg p-3 text-xs">
                                        <div className="font-bold mb-1 text-primary">{clip.duration}</div>
                                        <div className="text-gray-300">{clip.desc}</div>
                                        <div className="mt-2 text-[10px] uppercase text-gray-500 font-bold">{clip.type}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Narrative & Script */}
                    <div className="space-y-6">
                        {/* Story Card */}
                        <div className="bg-surface rounded-2xl p-6 border border-white/5">
                            <h3 className="text-xl font-bold mb-4 text-gradient">The Narrative</h3>
                            <p className="text-gray-300 leading-relaxed italic">
                                "{story.story}"
                            </p>
                        </div>

                        {/* Voiceover Script */}
                        <div className="bg-surface rounded-2xl p-6 border border-white/5">
                            <h3 className="text-xl font-bold mb-4">Voiceover Script</h3>
                            <div className="space-y-4">
                                {story.script.map((line, i) => (
                                    <div key={i} className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                                        <span className="text-xs font-mono text-gray-500 mt-1">{line.time}</span>
                                        <p className="text-sm text-gray-200">{line.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Social Caption */}
                        <div className="bg-surface rounded-2xl p-6 border border-white/5">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold">Social Caption</h3>
                                <button onClick={copyCaption} className="text-xs flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
                                    {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                                    {copied ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                            <div className="bg-black/30 p-4 rounded-xl text-sm text-gray-300 font-mono">
                                {story.caption}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
