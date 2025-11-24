'use client';

import { X, MapPin, Calendar, Award, TrendingUp, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';
import type { Report } from '@/lib/mock-data';

interface ReportModalProps {
  report: Report | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ReportModal({ report, isOpen, onClose }: ReportModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !report) return null;

  const statusColor =
    report.status === 'verified' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
    report.status === 'pending' ? 'text-orange-400 bg-orange-500/10 border-orange-500/20' :
    'text-red-400 bg-red-500/10 border-red-500/20';

  const categoryColor =
    report.category === 'Tersedia' || report.category === 'Lancar' ? 'text-emerald-400' :
    report.category === 'Padat' ? 'text-orange-400' :
    'text-red-400';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0a0a0f] border border-white/10 rounded-2xl shadow-2xl animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-red-500 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Image */}
        <div className="relative h-64 overflow-hidden rounded-t-2xl">
          <img
            src={report.imageUrl}
            alt="Report"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase border ${statusColor}`}>
              {report.status}
            </span>
          </div>

          {/* Type Badge */}
          <div className="absolute top-4 right-16">
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-sm text-white border border-white/20">
              {report.type === 'parking' ? '🅿️ Parkir' : '🚗 Traffic'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title & Category */}
          <div>
            <h2 className={`text-2xl font-bold mb-2 ${categoryColor}`}>
              {report.category}
            </h2>
            <div className="flex items-center gap-2 text-slate-400">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{report.location.address}</span>
            </div>
          </div>

          {/* Description */}
          {report.description && (
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-slate-300 leading-relaxed">{report.description}</p>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* AI Confidence */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-violet-400" />
                <span className="text-xs text-slate-400 uppercase font-semibold">AI Confidence</span>
              </div>
              <p className="text-2xl font-bold text-white">{report.aiConfidence.toFixed(0)}%</p>
              <div className="mt-2 w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${report.aiConfidence}%` }}
                />
              </div>
            </div>

            {/* Reward */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-400 uppercase font-semibold">Reward</span>
              </div>
              {report.reward ? (
                <p className="text-2xl font-bold text-emerald-400">
                  +{report.reward.toFixed(1)} $DPARK
                </p>
              ) : (
                <p className="text-sm text-slate-500">Pending verification</p>
              )}
            </div>
          </div>

          {/* Metadata */}
          <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Report ID</span>
              <span className="text-white font-mono">{report.id}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Submitted</span>
              <span className="text-white">{new Date(report.timestamp).toLocaleString()}</span>
            </div>
            {report.verifiedAt && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Verified</span>
                <span className="text-emerald-400">{new Date(report.verifiedAt).toLocaleString()}</span>
              </div>
            )}
            {report.txHash && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Transaction</span>
                <a
                  href={`https://tonscan.org/tx/${report.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-400 hover:text-violet-300 flex items-center gap-1"
                >
                  <span className="font-mono">{report.txHash}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>

          {/* Location Map Preview */}
          <div className="rounded-xl overflow-hidden border border-white/10">
            <div className="h-48 bg-[#1a1a24] relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin className="w-12 h-12 text-violet-400" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-sm font-medium">
                  {report.location.lat.toFixed(4)}, {report.location.lng.toFixed(4)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
