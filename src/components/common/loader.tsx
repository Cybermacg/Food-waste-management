function Loader({ size = 20 }: { size?: number }) {
  return (
    <>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <span
        style={{
          display: "inline-block",
          width: size,
          height: size,
          border: "2.5px solid rgba(255,255,255,0.3)",
          borderTopColor: "currentColor",
          borderRadius: "50%",
          animation: "spin 0.7s linear infinite",
        }}
      />
    </>
  );
}

export default Loader;