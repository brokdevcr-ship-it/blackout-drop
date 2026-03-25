export interface ArtistPiece {
  name: string;
  handle: string;
}

export interface Artist {
  id: string;
  slug: string;
  name: string;
  role: string;
  genre: string;
  quote: string;
  bio: string;
  imageUrl: string;
  detailImageUrl: string;
  pieces: ArtistPiece[];
  instagram?: string;
}

import { unsplashUrl } from "./imageUtils";

const img = (id: string, w = 700, h = 933) => unsplashUrl(id, w, h);

export const MOCK_ARTISTS: Artist[] = [
  {
    id: "1",
    slug: "dante-cruz",
    name: "Dante Cruz",
    role: "Urbano Artist",
    genre: "Trap / Urbano",
    quote: "LEVN speaks my language — dark, sharp, and built different.",
    bio: "Dante Cruz emerged from the underground trap scene, blending raw street energy with a meticulous sense of style. His music moves through late-night cities and digital spaces equally. LEVN became his uniform of choice before his first record deal — and it never left. Known for layering oversized silhouettes and muted tones, Dante embodies the brand's ethos: refined aggression, zero compromise.",
    imageUrl: img("1506794778202-cad84cf45f1d"),
    detailImageUrl: img("1506794778202-cad84cf45f1d", 1200, 1600),
    pieces: [
      { name: "Drop 001 Pullover Hoodie", handle: "drop-001-pullover-hoodie" },
      { name: "Core Oversized Tee", handle: "core-oversized-tee" },
      { name: "Midnight Cargo Pant", handle: "midnight-cargo-pant" },
    ],
    instagram: "@dantecruzoficial",
  },
  {
    id: "2",
    slug: "yael-santos",
    name: "Yael Santos",
    role: "Performer",
    genre: "Reggaeton / R&B",
    quote: "Every piece feels like it was made for stages and streets at the same time.",
    bio: "Yael Santos is a genre-bending performer whose music sits at the intersection of reggaeton, R&B, and afrobeats. Born and raised in the city, her aesthetic has always been a statement — powerful, intentional, unapologetically dark. She was one of the first artists to wear LEVN on stage, and her presence helped define the brand's identity as something beyond fashion — a movement.",
    imageUrl: img("1529139919-f57e93a60be5"),
    detailImageUrl: img("1529139919-f57e93a60be5", 1200, 1600),
    pieces: [
      { name: "Shadow Zip Hoodie", handle: "shadow-zip-hoodie" },
      { name: "Monochrome Track Pant", handle: "monochrome-track-pant" },
      { name: "Signature Beanie", handle: "signature-beanie" },
    ],
    instagram: "@yaelsantosmusic",
  },
  {
    id: "3",
    slug: "marco-vidal",
    name: "Marco Vidal",
    role: "Visual Artist",
    genre: "Photography / Digital Art",
    quote: "LEVN is the only brand that looks as good through a lens as it does in person.",
    bio: "Marco Vidal is a visual artist and street photographer whose work has been featured across digital magazines and gallery installations worldwide. His editorial eye and obsession with texture and shadow align naturally with LEVN's aesthetic. Marco wears the brand on shoots and off — and has directed several of the brand's lookbook concepts. His outerwear silhouettes are instantly recognizable.",
    imageUrl: img("1531746020798-e6953c6e8e04"),
    detailImageUrl: img("1531746020798-e6953c6e8e04", 1200, 1600),
    pieces: [
      { name: "Tactical Shell Jacket", handle: "tactical-shell-jacket" },
      { name: "Phantom Heavyweight Tee", handle: "phantom-heavyweight-tee" },
      { name: "Utility Crossbody Bag", handle: "utility-crossbody-bag" },
    ],
    instagram: "@marcovidalstudio",
  },
  {
    id: "4",
    slug: "sofia-reyes",
    name: "Sofía Reyes",
    role: "Creator / Streamer",
    genre: "Content / Gaming",
    quote: "Online or offline, LEVN is the fit that hits every time. No exceptions.",
    bio: "Sofía Reyes built one of the most engaged streetwear communities in the digital underground — starting from streams, moving into IRL events and brand partnerships. Her audience trusts her taste unconditionally. When Sofía discovered LEVN, she didn't just wear it — she dissected it, discussed it, and made her community obsessed with it. She represents the new wave of cultural tastemakers who blur the line between creator and icon.",
    imageUrl: img("1520975954359-f3e412f03ddf"),
    detailImageUrl: img("1520975954359-f3e412f03ddf", 1200, 1600),
    pieces: [
      { name: "Void Puffer Jacket", handle: "void-puffer-jacket" },
      { name: "Static Graphic Tee", handle: "static-graphic-tee" },
      { name: "LEVN 6-Panel Cap", handle: "levn-6-panel-cap" },
    ],
    instagram: "@sofiareyes.live",
  },
];

export function getArtistBySlug(slug: string): Artist | undefined {
  return MOCK_ARTISTS.find((a) => a.slug === slug);
}
