import { ImageResponse } from "next/og";

export const alt = "Newgraf · Tu marca. Impresa sobre el producto.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b0b0c",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: -2 }}>Newgraf</div>
          <div style={{ width: 56, height: 6, background: "#d7192a", borderRadius: 6, marginTop: 10 }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 700, letterSpacing: -4, lineHeight: 0.95 }}>
          <span>Tu marca.</span>
          <span style={{ color: "rgba(255,255,255,.45)" }}>Impresa sobre el producto.</span>
        </div>
        <div style={{ fontSize: 26, color: "rgba(255,255,255,.6)" }}>
          Serigrafía de vasos, botellas, envases y packaging para empresas
        </div>
      </div>
    ),
    size,
  );
}
