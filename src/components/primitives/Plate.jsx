export default function Plate({ labelledById, caption, className = '', children }) {
  return (
    <figure className={`relative ${className}`} aria-labelledby={labelledById}>
      {children}
      {caption && (
        <figcaption className="mt-6 text-center text-xs font-medium text-cream/55">{caption}</figcaption>
      )}
    </figure>
  );
}
