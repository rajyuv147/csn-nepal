import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";

export function cn(...c: (string | false | null | undefined)[]) {
  return clsx(...c);
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "primary" | "sun" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
};

export function Button({ asChild, variant = "primary", size = "md", className, ...p }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-all rounded-full cursor-pointer",
        size === "sm" && "text-sm px-4 py-2",
        size === "md" && "text-[15px] px-6 py-3",
        size === "lg" && "text-base px-8 py-4",
        variant === "primary" && "bg-[#01723b] text-white hover:bg-[#015b2f] shadow-[0_8px_24px_-8px_rgba(1,114,59,.6)]",
        variant === "sun" && "bg-[#f6b231] text-[#032e1a] hover:bg-[#d19406] shadow-[0_8px_24px_-8px_rgba(246,178,49,.7)]",
        variant === "dark" && "bg-[#032e1a] text-white hover:bg-[#01723b]",
        variant === "outline" && "border-2 border-[#01723b] text-[#01723b] hover:bg-[#01723b] hover:text-white",
        variant === "ghost" && "text-[#01723b] hover:bg-[#e7f3ec]",
        className
      )}
      {...p}
    />
  );
}

export function Badge({ className, ...p }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-[#e7f3ec] border border-[#01723b]/15 text-[#01723b] text-[13px] font-semibold px-3.5 py-1.5",
        className
      )}
      {...p}
    />
  );
}

export function Card({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-white border border-[#01723b]/10 shadow-[0_2px_20px_-8px_rgba(3,46,26,.15)]",
        className
      )}
      {...p}
    />
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-2xl border-2 border-[#01723b]/15 bg-white px-4 py-3 text-[15px] outline-none placeholder:text-neutral-400 focus:border-[#157a48]",
        props.className
      )}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full rounded-2xl border-2 border-[#01723b]/15 bg-white px-4 py-3 text-[15px] outline-none placeholder:text-neutral-400 focus:border-[#157a48] min-h-32",
        props.className
      )}
    />
  );
}

export function Label({ className, ...p }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("text-sm font-semibold text-[#043d24] mb-1.5 block", className)} {...p} />;
}
