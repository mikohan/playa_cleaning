type props = {
  text: string;
};
export const ButtonBtn = ({ text }: props) => {
  return (
    <button
      className="relative btn hover:scale-105 transition-transform duration-300 group overflow-hidden drop-shadow-sm"
      aria-label={text}
    >
      <span className="absolute inset-0 bg-white opacity-30 rotate-45 -translate-x-full group-hover:translate-x-full blur-sm transition-transform duration-500"></span>
      <span className="relative z-10">{text}</span>
    </button>
  );
};
