export default function AudioButton({ text, rate = 1, pitch = 1 }) {
  const speak = () => {
    const u = new SpeechSynthesisUtterance(text);
    u.rate = rate; u.pitch = pitch;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  };
  return (
    <div className="audio">
      <button className="play" onClick={speak}>🔊 Play</button>
      <div className="note">{text}</div>
    </div>
  );
}
