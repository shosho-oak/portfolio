import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * The SQ monogram, generated rather than hand-drawn as SVG paths so the
 * letterforms are real type rather than my approximation of them.
 */
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#101010",
        borderRadius: 16,
        color: "#FAF8F3",
        // The bundled font has a single weight, so `fontWeight` does nothing
        // here — size is the only lever for stroke presence at tab scale.
        fontSize: 38,
        letterSpacing: "-0.06em",
      }}
    >
      SQ
    </div>,
    { ...size },
  );
}
