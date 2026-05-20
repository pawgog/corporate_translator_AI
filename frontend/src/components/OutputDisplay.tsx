import { useState, type ReactNode } from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer-continued";
import { GrInProgress } from "react-icons/gr";
import { FcReading } from "react-icons/fc";
import { LiaBroomSolid, LiaDoveSolid } from "react-icons/lia";
import { TbWritingSign, TbGitCompare } from "react-icons/tb";
import { MdDoneOutline, MdOutlineWarningAmber } from "react-icons/md";

import type { LoadingPhase } from "../types";

const diffStyles = {
  variables: {
    dark: {
      diffViewerBackground: "#1e293b",
      diffViewerColor: "#f1f5f9",
      addedBackground: "#064e3b",
      addedColor: "#34d399",
      removedBackground: "#4c0519",
      removedColor: "#f43f5e",
      wordAddedBackground: "#047857",
      wordRemovedBackground: "#9f1239",
      emptyLineBackground: "#1e293b",
    },
  },
  contentText: {
    fontSize: "0.95rem",
    lineHeight: "1.6",
    fontFamily: "ui-sans-serif, system-ui, sans-serif",
  },
  codeFold: {
    display: "none",
  },
};

const loadingMessages: Record<LoadingPhase, ReactNode> = {
  idle: (
    <>
      <GrInProgress /> AI is working...
    </>
  ),
  analyzing: (
    <>
      <FcReading /> Reading emotional context...
    </>
  ),
  filtering: (
    <>
      <LiaBroomSolid /> Removing unnecessary heat...
    </>
  ),
  typing: (
    <>
      <TbWritingSign /> Rewriting for business impact...
    </>
  ),
  done: (
    <>
      <MdDoneOutline /> Done! Just a moment to finalize...
    </>
  ),
};

type OutputDisplayProps = {
  outputText: string;
  inputText: string;
  isLoading: boolean;
  loadingPhase: LoadingPhase;
  spiceLevel: number;
  error: string | null;
  onReset: () => void;
};

export default function OutputDisplay({
  outputText,
  inputText,
  isLoading,
  loadingPhase,
  spiceLevel,
  error,
  onReset,
}: OutputDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("clean");

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 shadow-inner flex flex-col flex-1 min-h-112.5 relative overflow-hidden border border-slate-800">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b border-slate-800 mb-4 gap-3">
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Translation Result
          </label>
          {outputText && !isLoading && !error && (
            <div className="flex bg-slate-800 p-0.5 rounded-lg ml-2 border border-slate-700">
              <button
                onClick={() => setActiveTab("clean")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  activeTab === "clean"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Clean Text
              </button>
              <button
                onClick={() => setActiveTab("diff")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === "diff"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <>
                  <TbGitCompare /> Changes (Diff)
                </>
              </button>
            </div>
          )}
        </div>
        {outputText && (
          <button
            onClick={() => {
              onReset();
              setActiveTab("clean");
            }}
            className="text-xs text-slate-400 hover:text-rose-400 transition-colors cursor-pointer self-end sm:self-auto"
          >
            Clear All
          </button>
        )}
      </div>
      {isLoading && (
        <div className="flex-1 flex flex-col justify-center space-y-4 px-2">
          <p className="flex items-center justify-center gap-2 text-center text-lg font-medium text-indigo-400 mb-2">
            {loadingMessages[loadingPhase] || (
              <>
                <GrInProgress /> AI is working...
              </>
            )}
          </p>
          <div className="space-y-2">
            <div className="h-4 bg-slate-500 rounded-md w-3/4 mx-auto animate-pulse"></div>
            <div className="h-4 bg-slate-500 rounded-md w-5/6 mx-auto animate-pulse"></div>
            <div className="h-4 bg-slate-500 rounded-md w-2/3 mx-auto animate-pulse"></div>
          </div>
        </div>
      )}
      {!isLoading && error && (
        <div className="flex-1 flex flex-col justify-center items-center text-center p-4">
          <span className="text-2xl mb-2">
            <MdOutlineWarningAmber />
          </span>
          <p className="text-sm text-rose-400 font-medium">{error}</p>
        </div>
      )}
      {!isLoading && !error && !outputText && (
        <div className="flex-1 flex flex-col justify-center items-center text-center p-6 text-slate-400">
          <span className="text-3xl mb-3 opacity-40">
            <LiaDoveSolid />
          </span>
          <p className="text-sm max-w-xs">
            Paste your rant on the left and click the button to generate a
            professional message.
          </p>
        </div>
      )}
      {!isLoading && !error && outputText && (
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex-1 overflow-y-auto max-h-75 rounded-xl">
            {activeTab === "clean" ? (
              <p className="text-base text-slate-200 leading-relaxed font-normal whitespace-pre-wrap p-2">
                {outputText}
              </p>
            ) : (
              <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-800/50">
                <ReactDiffViewer
                  oldValue={inputText}
                  newValue={outputText}
                  splitView={false}
                  compareMethod={DiffMethod.WORDS}
                  useDarkTheme={true}
                  styles={diffStyles}
                  hideLineNumbers={true}
                />
              </div>
            )}
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                Original Spiciness:
              </span>
              <div className="w-24 bg-slate-800 h-2.5 rounded-full overflow-hidden relative">
                <div
                  className={`h-full transition-all duration-1000 ${
                    spiceLevel > 70
                      ? "bg-rose-500"
                      : spiceLevel > 40
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                  }`}
                  style={{ width: `${spiceLevel}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-slate-400">
                {spiceLevel}%
              </span>
            </div>
            <button
              onClick={handleCopy}
              className={`py-2 px-4 rounded-xl text-xs font-bold transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
                copied
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-200"
              }`}
            >
              {copied ? (
                <>
                  <span>Copied!</span>
                  <span>
                    <MdDoneOutline />
                  </span>
                </>
              ) : (
                <>
                  <span>Copy Text</span>
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
