import { Inter, Noto_Sans_Sinhala } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSinhala = Noto_Sans_Sinhala({
  subsets: ["sinhala"],
  weight: ["400", "600", "700"],
  variable: "--font-noto-sinhala",
  display: "swap",
});

export const fontVariables = `${inter.variable} ${notoSinhala.variable}`;
