import { ShopifyProduct } from "./shopify";

// ─── Image helper ─────────────────────────────────────────────────────────────
// All images sourced from Unsplash — fashion/streetwear editorial photography.
// Swap any `id` for a different Unsplash photo ID to update product imagery.
const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=700&h=933&fit=crop&q=80&auto=format`;

// ─── Product factory ──────────────────────────────────────────────────────────
function product(
  slug: string,
  title: string,
  description: string,
  price: string,
  imageId: string,
  optionName: string,
  optionValues: string[],
  extraImages: string[] = []
): ShopifyProduct {
  const id = `gid://shopify/Product/mock-${slug}`;
  const images = [imageId, ...extraImages].map((imgId) => ({
    node: { url: u(imgId), altText: title },
  }));

  return {
    node: {
      id,
      title,
      description,
      handle: slug,
      priceRange: {
        minVariantPrice: { amount: price, currencyCode: "USD" },
      },
      images: { edges: images },
      options: [{ name: optionName, values: optionValues }],
      variants: {
        edges: optionValues.map((val) => ({
          node: {
            id: `gid://shopify/ProductVariant/mock-${slug}-${val.toLowerCase().replace(/\s+/g, "-")}`,
            title: val,
            price: { amount: price, currencyCode: "USD" },
            availableForSale: true,
            selectedOptions: [{ name: optionName, value: val }],
          },
        })),
      },
    },
  };
}

const SIZES_FULL = ["XS", "S", "M", "L", "XL", "XXL"];
const SIZES_STD = ["S", "M", "L", "XL"];
const SIZES_PANTS = ["28", "30", "32", "34", "36"];
const COLORS_MONO = ["Black", "Off-White"];
const COLORS_STONE = ["Black", "Stone"];

// ─── Product catalog ──────────────────────────────────────────────────────────
// Image IDs reference Unsplash photos — see image helper above.
export const MOCK_PRODUCTS: ShopifyProduct[] = [
  // T-Shirts ──────────────────────────────────────────────────────────────────
  product(
    "core-oversized-tee",
    "Core Oversized Tee",
    "Heavyweight 280gsm ringspun cotton. Dropped shoulders, boxy silhouette, ribbed crewneck. Minimal chest logo hit in tonal embroidery. The foundation garment of the LEVN wardrobe — versatile, substantial, built to outlast trends.",
    "58.00",
    "1618354691792-d1d42acfd860",
    "Size",
    SIZES_FULL
  ),
  product(
    "static-graphic-tee",
    "Static Graphic Tee",
    "100% ringspun cotton heavyweight blank. Abstract distorted graphics screen-printed front and back. Washed and treated for a lived-in texture that softens with every wear. Limited edition run — not restocked.",
    "68.00",
    "1583743814966-8d4d0ec4b071",
    "Size",
    ["XS", "S", "M", "L", "XL"]
  ),
  product(
    "phantom-heavyweight-tee",
    "Phantom Heavyweight Tee",
    "The heaviest tee in the lineup. 320gsm double-knit cotton, pre-shrunk and garment-washed. Relaxed through the body with an extended hem. Zero graphics — the weight and quality speak for themselves.",
    "72.00",
    "1503341504253-dff4815485f1",
    "Size",
    SIZES_FULL
  ),

  // Hoodies ───────────────────────────────────────────────────────────────────
  product(
    "drop-001-pullover-hoodie",
    "Drop 001 Pullover Hoodie",
    "400gsm fleece-back cotton blend. Relaxed oversized silhouette with dropped shoulders. Ribbed cuffs and hem, kangaroo pouch pocket. Embroidered logo at chest. The signature piece of the first LEVN drop — limited stock, no restock.",
    "128.00",
    "1556821840-3a63f8a79d7e",
    "Size",
    ["S", "M", "L", "XL", "XXL"]
  ),
  product(
    "shadow-zip-hoodie",
    "Shadow Zip Hoodie",
    "Heavyweight 380gsm fleece with full YKK zip. Clean lines with no external branding beyond a small woven label. Drop-shoulder construction, kangaroo pocket, tonal hardware. The refined alternative to the pullover.",
    "145.00",
    "1578662996442-48f60103fc96",
    "Size",
    SIZES_STD
  ),

  // Pants ─────────────────────────────────────────────────────────────────────
  product(
    "midnight-cargo-pant",
    "Midnight Cargo Pant",
    "Relaxed-fit cargo in dense 8oz ripstop cotton. Six-pocket utility construction — two hip, two thigh, two rear. Elastic drawstring waist, tapered to the ankle. Bartacked stress points. Built to move in.",
    "148.00",
    "1542272604-787c3835535d",
    "Waist",
    SIZES_PANTS
  ),
  product(
    "monochrome-track-pant",
    "Monochrome Track Pant",
    "Heavyweight French terry track pant in 380gsm cotton blend. Contrast side tape, elastic waistband with interior drawstring, zip hem. Relaxed through the thigh, tapered below the knee. Clean enough to style up, comfortable enough to live in.",
    "98.00",
    "1594938298603-57d5b12e4ad0",
    "Size",
    SIZES_FULL
  ),

  // Outerwear ─────────────────────────────────────────────────────────────────
  product(
    "tactical-shell-jacket",
    "Tactical Shell Jacket",
    "Lightweight 40D nylon shell with DWR coating. Minimal paneling — two hidden zip chest pockets, zip hem vents, taped seams. Packable into its own chest pocket. The layer between you and whatever the city throws.",
    "248.00",
    "1591047139829-d91aecb6caea",
    "Size",
    SIZES_STD
  ),
  product(
    "void-puffer-jacket",
    "Void Puffer Jacket",
    "Recycled 20D nylon shell with 90/10 down fill, 600 fill power. Matte finish with tonal baffling and hardware. Drop tail hem, two-way zip, internal chest pocket. No logos visible on the outside — presence through material, not branding.",
    "285.00",
    "1551028719-00167b16eac5",
    "Size",
    SIZES_STD
  ),

  // Accessories ───────────────────────────────────────────────────────────────
  product(
    "signature-beanie",
    "Signature Beanie",
    "100% fine-gauge acrylic knit. One-size relaxed fit with a subtle rolled cuff. LEVN wordmark knit into the fold. The coldest accessory in the collection.",
    "38.00",
    "1611614925824-65bb5e47c040",
    "Color",
    COLORS_MONO
  ),
  product(
    "levn-6-panel-cap",
    "LEVN 6-Panel Cap",
    "Six-panel structured cap in 100% cotton twill. Firm pre-curved brim, sweatband interior. Tonal embroidered logo at front panel. Adjustable strapback closure. Fits all head sizes.",
    "45.00",
    "1588850561407-ed78c5b5d3e2",
    "Color",
    COLORS_STONE
  ),
  product(
    "utility-crossbody-bag",
    "Utility Crossbody Bag",
    "Water-resistant 210D nylon ripstop. Zip main compartment with internal organiser. Zip front pocket. Padded, adjustable strap with metal hardware. Dimensions: 24 × 16 × 7cm. The bag that goes with everything — and goes everywhere.",
    "85.00",
    "1548036328-c9fa89d128fa",
    "Color",
    ["Black"]
  ),
];

// ─── Lookup by handle ─────────────────────────────────────────────────────────
const MOCK_PRODUCTS_MAP = new Map<string, ShopifyProduct>(
  MOCK_PRODUCTS.map((p) => [p.node.handle, p])
);

export function getMockProductByHandle(handle: string): ShopifyProduct | null {
  return MOCK_PRODUCTS_MAP.get(handle) ?? null;
}
