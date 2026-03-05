const particles = [
  { size: 3, x: "10%", duration: "18s", delay: "0s", startY: "20%" },
  { size: 2, x: "25%", duration: "22s", delay: "3s", startY: "60%" },
  { size: 4, x: "45%", duration: "20s", delay: "1s", startY: "40%" },
  { size: 2, x: "65%", duration: "25s", delay: "5s", startY: "80%" },
  { size: 3, x: "80%", duration: "19s", delay: "2s", startY: "30%" },
  { size: 2, x: "90%", duration: "23s", delay: "4s", startY: "70%" },
];

const FloatingParticles = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-particle-float"
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.startY,
            backgroundColor: "hsl(var(--uvicuo-green))",
            opacity: 0.06,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
