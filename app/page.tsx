
"use client"
import { useState } from "react";
export default function Home() {

  const [text, setText] = useState<string>('');
  const [audioUrl, setAudioUrl] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/text-to-speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (res.ok) {
      const audioBlob = await res.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    } else {
      alert('Error generating speech.');
    }
  };

    return (
      <main className="min-h-screen flex flex-col">
        <section className="flex-grow container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Welcome to PrepLab</h1>
          <div>
            <h1>Text to Speech</h1>
            <form onSubmit={handleSubmit}>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text here"
              />
              <button type="submit">Generate Speech</button>
            </form>

            {audioUrl && (
              <div>
                <h2>Generated Speech</h2>
                <audio controls src={audioUrl}></audio>
              </div>
            )}
          </div>
        </section>
      </main>
    );
}