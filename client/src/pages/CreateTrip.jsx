import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Upload, Sparkles, Instagram, Youtube, Video, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { generateTripStory } from '../services/api';

const STEPS = [
    { id: 1, title: 'Details' },
    { id: 2, title: 'Style' },
    { id: 3, title: 'Media' },
    { id: 4, title: 'Magic' }
];

const MOODS = [
    { id: 'cinematic', label: 'Cinematic', desc: 'Slow, dramatic, emotional' },
    { id: 'adventure', label: 'Adventure', desc: 'Fast, energetic, upbeat' },
    { id: 'calm', label: 'Calm', desc: 'Peaceful, relaxing, nature' },
    { id: 'romantic', label: 'Romantic', desc: 'Soft, warm, dreamy' }
];

export default function CreateTrip() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        destination: '',
        dates: '',
        mood: '',
        platform: 'instagram'
    });
    const { mutate, isPending } = useMutation({
        mutationFn: generateTripStory,
        onSuccess: (data) => {
            navigate(`/story/${data.id}`);
        },
        onError: (error) => {
            const message = error.response?.data?.error || "Failed to generate story. Make sure backend is running.";
            alert(message); // Simple alert for now, can be UI toast later
        }
    });

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else {
            mutate(formData);
        }
    };

    return (
        <div className="min-h-screen bg-background pt-32 px-6 pb-20">
            <div className="container mx-auto max-w-3xl">

                {/* Progress Bar */}
                <div className="mb-12 flex justify-between items-center relative">
                    <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-white/10 -z-10" />
                    {STEPS.map((step) => (
                        <div key={step.id} className={`flex flex-col items-center gap-2 ${currentStep >= step.id ? 'text-primary' : 'text-gray-600'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors ${currentStep >= step.id ? 'bg-background border-primary' : 'bg-background border-gray-700'}`}>
                                {step.id}
                            </div>
                            <span className="text-xs font-medium uppercase tracking-wider bg-background px-2">{step.title}</span>
                        </div>
                    ))}
                </div>

                {/* Content */}
                <AnimatePresence mode='wait'>
                    {isPending ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center text-center py-20"
                        >
                            <div className="relative w-32 h-32 mb-8">
                                <div className="absolute inset-0 border-4 border-primary/30 rounded-full animate-ping" />
                                <div className="absolute inset-0 border-4 border-t-primary rounded-full animate-spin" />
                                <Sparkles className="absolute inset-0 m-auto text-primary w-12 h-12" />
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Weaving your story...</h2>
                            <p className="text-gray-400">Analyzing footage • Writing script • Composing music</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-surface border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl"
                        >
                            {currentStep === 1 && (
                                <div className="space-y-6">
                                    <h2 className="text-3xl font-bold">Where did you go?</h2>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-400">Destination</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-4 top-4 text-gray-500 w-5 h-5" />
                                                <input
                                                    type="text"
                                                    value={formData.destination}
                                                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                                    placeholder="Paris, France"
                                                    className="w-full bg-black/20 border border-white/10 rounded-xl p-4 pl-12 text-lg focus:border-primary outline-none transition-colors"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-400">Dates</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-4 top-4 text-gray-500 w-5 h-5" />
                                                <input
                                                    type="text"
                                                    value={formData.dates}
                                                    onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                                                    placeholder="Spring 2024"
                                                    className="w-full bg-black/20 border border-white/10 rounded-xl p-4 pl-12 text-lg focus:border-primary outline-none transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="space-y-6">
                                    <h2 className="text-3xl font-bold">Set the mood</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        {MOODS.map((m) => (
                                            <button
                                                key={m.id}
                                                onClick={() => setFormData({ ...formData, mood: m.id })}
                                                className={`p-6 rounded-2xl border text-left transition-all ${formData.mood === m.id ? 'bg-primary/20 border-primary' : 'bg-black/20 border-white/5 hover:border-white/20'}`}
                                            >
                                                <div className="font-bold text-lg mb-1">{m.label}</div>
                                                <div className="text-sm text-gray-400">{m.desc}</div>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="pt-6">
                                        <label className="text-sm text-gray-400 block mb-4">Target Platform</label>
                                        <div className="flex gap-4">
                                            {['Instagram', 'TikTok', 'YouTube'].map((p) => (
                                                <button
                                                    key={p}
                                                    onClick={() => setFormData({ ...formData, platform: p.toLowerCase() })}
                                                    className={`px-6 py-3 rounded-full border text-sm font-medium transition-all ${formData.platform === p.toLowerCase() ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 hover:border-white/30'}`}
                                                >
                                                    {p}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className="space-y-6">
                                    <h2 className="text-3xl font-bold">Upload Media</h2>

                                    {/* Drop Zone */}
                                    {!formData.files?.length ? (
                                        <div
                                            className="border-2 border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors cursor-pointer group relative"
                                            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                            onDrop={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                const files = Array.from(e.dataTransfer.files);
                                                setFormData({ ...formData, files });
                                            }}
                                        >
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*,video/*"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                onChange={(e) => {
                                                    const files = Array.from(e.target.files);
                                                    setFormData({ ...formData, files });
                                                }}
                                            />
                                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                <Upload className="w-6 h-6 text-gray-400 group-hover:text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold mb-2">Drag photos & videos here</h3>
                                            <p className="text-gray-400 max-w-sm mx-auto mb-6">Support for JPG, PNG, MP4. We recommend 10-20 clips.</p>
                                            <span className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-medium pointer-events-none">Browse Files</span>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-medium text-gray-300">{formData.files.length} files selected</h3>
                                                <button
                                                    onClick={() => setFormData({ ...formData, files: [] })}
                                                    className="text-sm text-red-400 hover:text-red-300"
                                                >
                                                    Clear All
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-[400px] overflow-y-auto">
                                                {formData.files.map((file, i) => (
                                                    <div key={i} className="aspect-square rounded-xl bg-white/5 overflow-hidden relative group">
                                                        {file.type.startsWith('image') ? (
                                                            <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center bg-black/20">
                                                                <Video className="w-8 h-8 text-gray-500" />
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                                <div className="aspect-square rounded-xl border border-dashed border-white/10 flex items-center justify-center hover:bg-white/5 cursor-pointer relative">
                                                    <input
                                                        type="file"
                                                        multiple
                                                        accept="image/*,video/*"
                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                        onChange={(e) => {
                                                            const newFiles = Array.from(e.target.files);
                                                            setFormData({ ...formData, files: [...formData.files, ...newFiles] });
                                                        }}
                                                    />
                                                    <Upload className="w-6 h-6 text-gray-500" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="flex justify-between mt-12 pt-8 border-t border-white/5">
                                <button
                                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                                    disabled={currentStep === 1}
                                    className={`px-6 py-3 rounded-full font-medium transition-colors ${currentStep === 1 ? 'opacity-0 cursor-default' : 'hover:bg-white/5'}`}
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="px-8 py-3 bg-primary hover:bg-blue-600 rounded-full font-bold transition-all flex items-center gap-2"
                                >
                                    {currentStep === 3 ? (
                                        <>Generate Story <Sparkles className="w-4 h-4" /></>
                                    ) : (
                                        <>Next Step <Play className="w-3 h-3" /></>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
