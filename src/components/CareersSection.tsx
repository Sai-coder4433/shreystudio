import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, MapPin, ArrowUpRight, CheckCircle2, X, Send } from 'lucide-react';

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
}

const OPEN_POSITIONS: JobPosition[] = [
  {
    id: 'pos-1',
    title: 'Senior Creator Talent Manager',
    department: 'Creator Relations',
    location: 'Noida (Sector 126) / Mumbai',
    type: 'Full-Time',
    experience: '3-5 Years',
    description: 'Lead 360-degree talent representation, negotiate multi-crore brand sponsorships, and structure career blueprints for top Tier-1 creators.',
  },
  {
    id: 'pos-2',
    title: 'Creative Director (Viral Shorts & IP)',
    department: 'In-House Studio',
    location: 'Mumbai Studio',
    type: 'Full-Time',
    experience: '4+ Years',
    description: 'Conceptualize high-retention episodic formats, lead scriptwriting rooms, and oversee vertical and widescreen cinematic productions.',
  },
  {
    id: 'pos-3',
    title: 'Brand Solutions & Strategic Sales Lead',
    department: 'Business Development',
    location: 'Noida HQ',
    type: 'Full-Time',
    experience: '3-6 Years',
    description: 'Drive high-volume partnerships with Fortune 500 brands, pitch innovative integrations, and expand our agency turnover toward ₹250 Cr.',
  },
  {
    id: 'pos-4',
    title: 'Senior Motion Designer & Kinetic Editor',
    department: 'Post-Production',
    location: 'Hybrid / Mumbai',
    type: 'Full-Time',
    experience: '2-4 Years',
    description: 'Craft dynamic motion graphics, typography sequences, 3D title cards, and ultra-crisp audio Foley for multi-million view campaigns.',
  },
];

export const CareersSection: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [applied, setApplied] = useState(false);
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantName, setApplicantName] = useState('');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (applicantEmail.trim() && applicantName.trim()) {
      setApplied(true);
      setTimeout(() => {
        setApplied(false);
        setSelectedJob(null);
        setApplicantEmail('');
        setApplicantName('');
      }, 3500);
    }
  };

  return (
    <section id="careers" className="relative w-full bg-slate-50 text-slate-900 py-28 px-6 md:px-12 lg:px-20 border-t border-slate-200 z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-300 bg-white mb-4 shadow-sm">
              <Briefcase className="w-3.5 h-3.5 text-black" />
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-bold tracking-[0.2em] text-slate-700 uppercase">
                Join India's Fastest Growing Creator Team
              </span>
            </div>
            <h2 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-black leading-[1.08]">
              Build The Creator Economy <br />
              <span className="text-slate-500 font-['Cormorant_Garamond'] italic font-normal text-4xl sm:text-5xl md:text-6xl">
                From The Front Row.
              </span>
            </h2>
          </div>

          <p className="font-['Plus_Jakarta_Sans'] text-sm md:text-base text-slate-600 max-w-md font-normal leading-relaxed">
            We operate at the epicenter of internet culture. If you are passionate about storytelling, brand strategy, and scaling creators into institutions, we want you.
          </p>
        </div>

        {/* Job Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {OPEN_POSITIONS.map((job) => (
            <div
              key={job.id}
              className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-black transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-wider text-slate-500">
                    {job.department}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-[11px] font-semibold text-slate-700">
                    {job.type}
                  </span>
                </div>

                <h3 className="font-['Plus_Jakarta_Sans'] text-xl sm:text-2xl font-bold text-black tracking-tight mb-2 group-hover:text-slate-700 transition-colors">
                  {job.title}
                </h3>

                <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-6">
                  {job.description}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{job.location}</span>
                </div>

                <button
                  onClick={() => setSelectedJob(job)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black text-white text-xs font-bold font-['Plus_Jakarta_Sans'] hover:bg-slate-800 transition-all cursor-pointer group-hover:scale-105"
                >
                  <span>Apply Now</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Pitch Banner */}
        <div className="p-8 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h4 className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg font-bold text-black">
              Don't see your exact role listed?
            </h4>
            <p className="text-xs sm:text-sm text-slate-500">
              Send your portfolio or showreel directly to our leadership team.
            </p>
          </div>
          <a
            href="mailto:hiring@opraah.com"
            className="px-6 py-2.5 rounded-full border border-black text-black hover:bg-black hover:text-white font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-tight transition-all whitespace-nowrap cursor-pointer"
          >
            Email hiring@opraah.com
          </a>
        </div>

        {/* Job Application Modal */}
        <AnimatePresence>
          {selectedJob && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
              onClick={() => setSelectedJob(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedJob(null)}
                  className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-black hover:text-white flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1 block">
                  {selectedJob.department}
                </span>
                <h3 className="font-['Plus_Jakarta_Sans'] text-2xl font-extrabold text-black mb-2">
                  {selectedJob.title}
                </h3>
                <p className="text-xs text-slate-500 mb-6 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{selectedJob.location} • {selectedJob.experience} Experience</span>
                </p>

                {applied ? (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-base">Application Submitted!</h4>
                    <p className="text-xs text-slate-600 mt-1">Our talent acquisition team will review your profile and reach out.</p>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-black transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        placeholder="e.g. rahul@domain.com"
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-black transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Portfolio / LinkedIn / Showreel Link
                      </label>
                      <input
                        type="url"
                        placeholder="https://drive.google.com/... or linkedin.com/in/..."
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-black transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-full bg-black text-white text-xs font-bold font-['Plus_Jakarta_Sans'] hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <span>Submit Application</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
