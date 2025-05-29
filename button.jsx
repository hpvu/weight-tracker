export function Button({ children, onClick, variant = "", size = "", ...props }) {
  const styles = variant === "destructive" ? "bg-red-500 text-white" : "bg-blue-500 text-white";
  return <button className={`p-2 rounded ${styles}`} onClick={onClick} {...props}>{children}</button>;
}