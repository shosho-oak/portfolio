import { ImageResponse } from "next/og";

import { PERSON } from "@/lib/content";

export const alt = "Shahad Qumosani — Product Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The social card, generated at build time so it always matches the site.
 *
 * Satori (which renders this) only supports flexbox — no grid — and needs an
 * explicit `display: flex` on any element with more than one child.
 */
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#FAF8F3",
        padding: "64px 72px",
        color: "#101010",
      }}
    >
      {/* Top rule and identity */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(16,16,16,0.12)",
            paddingBottom: 28,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                borderRadius: 13,
                backgroundColor: "#101010",
                color: "#FAF8F3",
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: "-0.04em",
                marginRight: 18,
              }}
            >
              SQ
            </div>
            <div
              style={{
                fontSize: 19,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#686868",
              }}
            >
              {PERSON.name}
            </div>
          </div>

          <div
            style={{
              fontSize: 19,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#686868",
            }}
          >
            {PERSON.location}
          </div>
        </div>
      </div>

      {/* Headline */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 122,
            fontWeight: 800,
            letterSpacing: "-0.045em",
            lineHeight: 1.02,
          }}
        >
          Product
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            fontSize: 122,
            fontWeight: 800,
            letterSpacing: "-0.045em",
            lineHeight: 1.02,
          }}
        >
          Designer
        </div>
        {/* The accent rule, matching the site's headline treatment */}
        <div
          style={{
            // Measured against the rendered type so the rule spans exactly
            // "Designer", matching the hero treatment on the site.
            width: 456,
            height: 14,
            borderRadius: 999,
            backgroundColor: "#72F53C",
            marginTop: 16,
            marginLeft: 0,
          }}
        />
      </div>

      {/* Capabilities */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(16,16,16,0.12)",
          paddingTop: 28,
          fontSize: 22,
          color: "#686868",
        }}
      >
        <div style={{ display: "flex" }}>
          Product strategy · UX · UI · Information architecture · Design systems
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              backgroundColor: "#6A2AE6",
              marginRight: 12,
            }}
          />
          <div style={{ color: "#101010" }}>Portfolio</div>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
