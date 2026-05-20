import { useState } from "react";
import { FaPepperHot } from "react-icons/fa";
import { BsChatHeartFill } from "react-icons/bs";

import TextInput from "./components/TextInput";
import ConfigPanel from "./components/ConfigPanel";
import OutputDisplay from "./components/OutputDisplay";
import { useTranslate } from "./hooks/useTranslate";
import type { Audience, Tone } from "./types";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [audience, setAudience] = useState<Audience>("manager");
  const [tone, setTone] = useState<Tone>("professional");
  const [result, setResult] = useState({
    outputText: "",
    spiceLevel: 0,
    error: null as string | null,
  });

  const { translateText, isLoading, loadingPhase } = useTranslate();

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    try {
      const data = await translateText({
        text: inputText,
        audience,
        tone,
      });
      setResult({
        outputText: data.translatedText,
        spiceLevel: data.calculatedSpice,
        error: null,
      });
    } catch {
      setResult((prev) => ({
        ...prev,
        error: "Something went wrong. Please try again.",
      }));
    }
  };

  const handleReset = () => {
    setInputText("");
    setResult({
      outputText: "",
      spiceLevel: 0,
      error: null,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="text-center py-4 border-b border-slate-200 mb-4">
          <div className="flex justify-center items-center gap-2 mb-1">
            <FaPepperHot className="text-3xl" />
            <h1 className="text-2xl font-black tracking-tight text-slate-800 sm:text-3xl">
              Spicy-to-Nice <span className="text-indigo-600">Translator</span>
            </h1>
            <BsChatHeartFill className="text-3xl" />
          </div>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Transform emotional, chaotic rants into professional and diplomatic
            feedback ready for submission.
          </p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <TextInput
              value={inputText}
              onChange={setInputText}
              disabled={isLoading}
            />
            <ConfigPanel
              audience={audience}
              setAudience={setAudience}
              tone={tone}
              setTone={setTone}
              disabled={isLoading}
              onSubmit={handleTranslate}
              canSubmit={inputText.trim().length > 15}
            />
          </div>
          <div className="flex flex-col gap-4">
            <OutputDisplay
              outputText={result.outputText}
              inputText={inputText}
              spiceLevel={result.spiceLevel}
              error={result.error}
              loadingPhase={loadingPhase}
              isLoading={isLoading}
              onReset={handleReset}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
