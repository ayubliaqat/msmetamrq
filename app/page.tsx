'use client'
import Hero from "@/components/Hero"

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Hero
        title="Welcome to My Portfolio"
        subtitle="I design modern and scalable web apps"
        imageUrl="https://images.unsplash.com/photo-1601288496920-b6154fe3626a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGdpcmx8ZW58MHx8MHx8fDA%3D"
        bgColor="teal"
        button1Label="Contact Me"
        button1Variant="orange"
        button1OnClick={() => alert("Contact clicked")}
        button2Label="See Projects"
        button2Variant="teal"
        button2OnClick={() => alert("Projects clicked")}
      />
    </div>
  );
}
