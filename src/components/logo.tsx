export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" className={className}>
      <rect width="140" height="120" fill="#ffffff" />

      <path d="M 10 10 H 30 V 90 H 70 V 110 H 10 Z" fill="#000000" />

      <path d="M 50 10 H 70 V 50 H 110 V 90 H 135 V 110 H 90 V 70 H 50 Z" fill="#000000" />
    </svg>
  );
}
