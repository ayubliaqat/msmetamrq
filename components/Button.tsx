"use client";

type ButtonProps = {
  label: string;
  onClick: () => void;
  variant?: "orange" | "blue" | "gray";
};

export const Button = ({
  label,
  onClick,
  variant = "orange",
}: ButtonProps) => {
  const baseClass =
    "px-6 py-2 rounded-full font-semibold shadow-md transition-colors duration-300 focus:outline-none";

  let variantClasse = "bg-gray-200 text-gray-900 hover:bg-gray-300";

  if (variant === "orange") {
    variantClasse = "bg-orange-500 text-white hover:bg-orange-600";
  } else if (variant === "blue") {
    variantClasse = "bg-[#0B1F3A] text-white hover:bg-teal-600";
  }

  return (
    <button className={`${baseClass} ${variantClasse}`} onClick={onClick}>
      {label}
    </button>
  );
};
