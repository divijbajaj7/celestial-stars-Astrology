import React, { useState } from 'react';
import { AstrologerProfile } from '../data/astrologersData';
import { X, Star, Calendar, MapPin, Award, CheckCircle2, Send, Sparkles } from 'lucide-react';

interface AstrologerModalProps {
  astrologer: AstrologerProfile | null;
  onClose: () => void;
}

export const AstrologerModal: React.FC<AstrologerModalProps> = ({ astrologer, onClose }) => {
  const [selectedService, setSelectedService] = useState<string>('');
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [birthDetails, setBirthDetails] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  if (!astrologer) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className="liquid-glass w-full max-w-2xl max-h-[90vh] rounded-3xl flex flex-col text-white overflow-hidden shadow-2xl relative"
        style={{
          boxShadow: '0 0 80px rgba(0, 0, 0, 0.95), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
        }}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="liquid-glass-circle w-10 h-10 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-serif-instrument text-2xl tracking-tight">
                {astrologer.name}
              </h2>
              <p className="text-white/60 text-xs">{astrologer.title}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="liquid-glass-circle w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Profile Overview */}
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className="relative">
              <img
                src={astrologer.avatar}
                alt={astrologer.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border border-white/20 shadow-lg grayscale contrast-125"
              />
              <span className="absolute -bottom-2 -right-2 bg-white text-black px-2 py-0.5 rounded-full text-[10px] font-bold">
                ★ {astrologer.rating}
              </span>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-white border border-white/15">
                  {astrologer.tradition} Tradition
                </span>
                <span className="text-xs text-white/60 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {astrologer.location}
                </span>
                <span className="text-xs text-white/60 flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  {astrologer.experienceYears} Years Practice
                </span>
              </div>

              <p className="font-serif-instrument italic text-white/90 text-base">
                "{astrologer.quote}"
              </p>
              <p className="text-xs text-white/70 leading-relaxed">
                {astrologer.bio}
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-white/50">Readings Delivered</div>
              <div className="text-base font-mono font-bold text-white">{astrologer.readingsCount}+</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-white/50">Experience</div>
              <div className="text-base font-mono font-bold text-white">{astrologer.experienceYears} yrs</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-white/50">Client Rating</div>
              <div className="text-base font-mono font-bold text-white">★ {astrologer.rating} / 5.0</div>
            </div>
          </div>

          {/* Consultation Services Form */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-white/60 font-medium">
              Request a 1-on-1 Celestial Consultation
            </h4>

            {isBooked ? (
              <div className="p-6 rounded-2xl bg-white/10 border border-white/20 text-center space-y-2 animate-in fade-in">
                <CheckCircle2 className="w-8 h-8 text-white mx-auto" />
                <h3 className="font-serif-instrument text-2xl">Consultation Request Received</h3>
                <p className="text-xs text-white/70">
                  {astrologer.name}'s star sanctum has recorded your astrological inquiry. You will receive planetary scheduling vectors via email within 4 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs text-white/70 mb-1">Select Consultation Focus</label>
                  <div className="grid grid-cols-1 gap-2">
                    {astrologer.services.map((service) => (
                      <label
                        key={service}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          selectedService === service
                            ? 'bg-white text-black border-white font-medium'
                            : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="service"
                            value={service}
                            checked={selectedService === service}
                            onChange={() => setSelectedService(service)}
                            className="hidden"
                          />
                          <span>{service}</span>
                        </span>
                        <span className="text-[11px] opacity-75">60 min · Live Video</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Sterling"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-white/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-white/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white/70 mb-1">
                    Birth Date, Exact Time & Birth City (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Oct 14, 1995 · 04:22 AM · San Francisco, CA"
                    value={birthDetails}
                    onChange={(e) => setBirthDetails(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-white/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-black font-semibold rounded-full py-3 text-xs tracking-wider uppercase hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Confirm Astrologer Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
