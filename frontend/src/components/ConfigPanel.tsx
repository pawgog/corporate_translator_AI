import { BsStars } from "react-icons/bs";

import type { Audience, Tone } from "../types";

type ConfigPanelProps = {
  audience: Audience;
  setAudience: (value: Audience) => void;
  tone: Tone;
  setTone: (value: Tone) => void;
  disabled?: boolean;
  onSubmit: () => void;
  canSubmit: boolean;
};

export default function ConfigPanel({
  audience,
  setAudience,
  tone,
  setTone,
  disabled,
  onSubmit,
  canSubmit,
}: ConfigPanelProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">
            To Whom Are You Writing?
          </label>
          <select
            value={audience}
            onChange={(e) => setAudience(e.target.value as Audience)}
            disabled={disabled}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:opacity-60"
          >
            <option value="manager">To Manager</option>
            <option value="peer">To Colleague</option>
            <option value="client">To Client / Partner</option>
            <option value="report">To Subordinate</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">
            Desired Tone
          </label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value as Tone)}
            disabled={disabled}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:opacity-60"
          >
            <option value="professional">Formal and Diplomatic</option>
            <option value="friendly">Warm and Constructive</option>
            <option value="direct">Short and Direct (Assertive)</option>
          </select>
        </div>
      </div>
      <button
        onClick={onSubmit}
        disabled={!canSubmit || disabled}
        className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-200 flex justify-center items-center gap-2 shadow-sm
          ${
            canSubmit && !disabled
              ? "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer active:scale-[0.99]"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }
        `}
      >
        {disabled ? (
          <>
            <svg
              className="animate-spin h-4 w-4 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Translation in progress...
          </>
        ) : (
          <>
            Translate to Diplomatic Version
            <BsStars />
          </>
        )}
      </button>
    </div>
  );
}
