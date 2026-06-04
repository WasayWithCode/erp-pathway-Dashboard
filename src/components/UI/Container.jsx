const Container = ({ children, className = "", size = "default", ...props }) => {
  const sizes = {
    narrow: "max-w-5xl",
    default: "max-w-7xl",
    wide: "max-w-[88rem]",
  };

  return (
  <div className={`mx-auto w-full ${sizes[size]} px-4 sm:px-6 lg:px-8 ${className}`} {...props}>
    {children}
  </div>
  );
};

export default Container;
