type TextInputProps = {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
};

export default function TextInput({
  value,
  onChange,
  disabled,
}: TextInputProps) {
  const minLength = 15;
  const isTooShort = value.trim().length > 0 && value.trim().length < minLength;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col flex-1 min-h-75">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">
        Your Spicy Rant (Paste Here)
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Write your spicy rant here... (e.g. 'The boss came up with more nonsense for Friday afternoon!!!')"
        className="w-full flex-1 resize-none bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none text-base leading-relaxed disabled:opacity-60"
      />
      <div className="flex justify-between items-center pt-3 border-t border-slate-100 mt-2 text-xs">
        <span
          className={
            isTooShort ? "text-amber-600 font-medium" : "text-slate-400"
          }
        >
          {isTooShort
            ? `Enter at least ${minLength - value.trim().length} more characters`
            : ""}
        </span>
        <span className="text-slate-400 font-mono">
          {value.length} characters
        </span>
      </div>
    </div>
  );
}
