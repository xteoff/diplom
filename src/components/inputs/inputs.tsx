import { InputHTMLAttributes } from "react";

export function InputBase({
  label,
  error,
  ...props
}: { label: string; error?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1 group w-full max-w-[320px]">
      <label
        htmlFor={label}
        className={`font-inter peer-invalid:text-red-500 ${
          error && "text-red-500"
        } text-black group-focus-within:text-primary-500 transition-all`}
      >
        {label}
      </label>
      <input
        id={label}
        {...props}
        className={`px-3 py-3 peer rounded-md outline-1 outline-primary-500 ${
          error && "outline-red-500"
        } focus-within:outline-2 w-full flex-1 bg-white transition-all peer peer-erro `}
      />
      <p hidden={!error} className="text-red-500 font-inter text-sm">
        {error}
      </p>
    </div>
  );
}
