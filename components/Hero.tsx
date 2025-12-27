
'use client'// components/Hero
import { Button } from "./Button";

type HeroProps = {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  bgColor?: "white" | "orange" | "teal"; // background color
  button1Label?: string;
  button1Variant?: "orange" | "teal";
  button1OnClick?: () => void;
  button2Label?: string;
  button2Variant?: "orange" | "teal";
  button2OnClick?: () => void;
};

export default function Hero({
  title,
  subtitle,
  imageUrl,
  bgColor = "white",
  button1Label,
  button1Variant = "orange",
  button1OnClick,
  button2Label,
  button2Variant = "teal",
  button2OnClick,
}: HeroProps) {
  let bgClass =
    bgColor === "orange"
      ? "bg-orange-400"
      : bgColor === "teal"
      ? "bg-teal-500"
      : "bg-white";

  return (
    <section className={`${bgClass} py-20`}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
        {/* Text content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{title}</h1>
          {subtitle && <p className="mb-6 text-white">{subtitle}</p>}

          <div className="flex justify-center md:justify-start gap-4">
            {button1Label && button1OnClick && (
              <Button
                label={button1Label}
                onClick={button1OnClick}
                variant={button1Variant}
              />
            )}
            {button2Label && button2OnClick && (
              <Button
                label={button2Label}
                onClick={button2OnClick}
                variant={button2Variant}
              />
            )}
          </div>
        </div>

        {/* Image content */}
        {imageUrl && (
          <div className="flex-1">
            <img
              src={imageUrl}
              alt="Hero Image"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    </section>
  );
}
