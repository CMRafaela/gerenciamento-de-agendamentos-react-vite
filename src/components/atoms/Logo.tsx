type Props = {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
};

export function Logo({
  src = "/assets/rcm_digital_site.png",
  alt = "RCM Digital",
  size = 48,
  className = "",
}: Props) {
  return (
    <img
      src={src}
      alt={alt}
      style={{ height: size }}
      className={`w-auto ${className}`}
    />
  );
}
