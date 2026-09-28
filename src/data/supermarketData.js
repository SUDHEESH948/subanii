// Supermarket inventory dataset for Koolath Supermarket (Subani)
export const SUPERMARKET_CATEGORIES = [
  {
    category: "Rice & Grains",
    slug: "rice-and-grains",
    items: [
      {
        name: "Iftar Rice",
        unit: "kg",
        image: "/images/supermarket/rice-and-grains/iftar-rice.png",
      },
      {
        name: "Biryani Rice",
        unit: "kg",
        image: "/images/supermarket/rice-and-grains/biryani-rice.png",
      },
      {
        name: "Basmati Rice",
        unit: "kg",
        image: "/images/supermarket/rice-and-grains/basmati-rice.png",
      },
      {
        name: "Raw White Rice (Pachari)",
        unit: "kg",
        image: "/images/supermarket/rice-and-grains/raw-rice.png",
      },
      {
        name: "Broken Raw Rice",
        unit: "kg",
        image: "/images/supermarket/rice-and-grains/broken-raw-rice.png",
      },
      {
        name: "Broken Rice (Podiyari)",
        unit: "kg",
        image: "/images/supermarket/rice-and-grains/broken-rice.png",
      },
      {
        name: "Wheat",
        unit: "kg",
        image: "/images/supermarket/rice-and-grains/wheat.png",
      },
      {
        name: "Rava (Semolina)",
        unit: "kg",
        image: "/images/supermarket/rice-and-grains/rava.png",
      },
      {
        name: "Flattened Rice (Aval)",
        variants: ["300g", "10kg", "Packet"],
        image: "/images/supermarket/rice-and-grains/flattened-rice.png",
      },
    ],
  },
  {
    category: "Pulses & Lentils",
    slug: "pulses-and-lentils",
    items: [
      {
        name: "Green Gram (Cherupayar)",
        unit: "kg",
        image: "/images/supermarket/pulses-and-lentils/green-gram.png",
      },
      {
        name: "Small Black Chickpeas (Cherumanikadala)",
        unit: "kg",
        image: "/images/supermarket/pulses-and-lentils/small-black-chana.png",
      },
      {
        name: "White Chickpeas (Kabuli Chana)",
        unit: "kg",
        image: "/images/supermarket/pulses-and-lentils/kabuli-chana.png",
      },
      {
        name: "Black Gram (Urad Dal)",
        unit: "kg",
        image: "/images/supermarket/pulses-and-lentils/urad-dal.png",
      },
      {
        name: "Red Cowpeas (Vanpayar)",
        unit: "kg",
        image: "/images/supermarket/pulses-and-lentils/red-cowpeas.png",
      },
      {
        name: "Yellow Moong Dal",
        unit: "kg",
        image: "/images/supermarket/pulses-and-lentils/yellow-moong-dal.png",
      },
      {
        name: "Toor Dal (Pigeon Pea)",
        unit: "kg",
        image: "/images/supermarket/pulses-and-lentils/toor-dal.png",
      },
      {
        name: "Split Green Gram",
        unit: "kg",
        image: "/images/supermarket/pulses-and-lentils/split-green-gram.png",
      },
      {
        name: "Chana Dal",
        unit: "kg",
        image: "/images/supermarket/pulses-and-lentils/chana-dal.png",
      },
      {
        name: "Peas Dal",
        unit: "kg",
        image: "/images/supermarket/pulses-and-lentils/peas-dal.png",
      },
      {
        name: "Masoor Dal (Red Lentil)",
        unit: "kg",
        image: "/images/supermarket/pulses-and-lentils/masoor-dal.png",
      },
      {
        name: "Dry Green Peas",
        unit: "kg",
        image: "/images/supermarket/pulses-and-lentils/green-peas.png",
      },
      {
        name: "Horse Gram (Muthira)",
        unit: "kg",
        image: "/images/supermarket/pulses-and-lentils/horse-gram.png",
      },
      {
        name: "Peanuts",
        unit: "kg",
        image: "/images/supermarket/pulses-and-lentils/peanuts.png",
      },
      {
        name: "Soybeans",
        variants: ["Bulk (kg)", "Packet"],
        image: "/images/supermarket/pulses-and-lentils/soybeans.png",
      },
    ],
  },
  {
    category: "Spices & Packaged Flours",
    slug: "spices-and-powders",
    items: [
      {
        name: "Chilli Powder",
        variants: ["1kg", "2kg"],
        image: "/images/supermarket/spices-and-powders/chilli-powder.png",
      },
      {
        name: "Coriander Powder",
        variants: ["1kg", "2kg"],
        image: "/images/supermarket/spices-and-powders/coriander-powder.png",
      },
      {
        name: "Turmeric Powder",
        variants: ["500g", "1kg"],
        image: "/images/supermarket/spices-and-powders/turmeric-powder.png",
      },
      {
        name: "Rice Flour",
        variants: ["1kg", "5kg"],
        image: "/images/supermarket/spices-and-powders/rice-flour.png",
      },
      {
        name: "Gram Flour (Besan)",
        unit: "Packet",
        image: "/images/supermarket/spices-and-powders/besan-flour.png",
      },
      {
        name: "Black Pepper",
        unit: "kg/Packet",
        image: "/images/supermarket/spices-and-powders/black-pepper.png",
      },
      {
        name: "Mustard Seeds",
        unit: "Packet",
        image: "/images/supermarket/spices-and-powders/mustard-seeds.png",
      },
      {
        name: "Fenugreek Seeds",
        unit: "Packet",
        image: "/images/supermarket/spices-and-powders/fenugreek-seeds.png",
      },
      {
        name: "Cumin Seeds",
        unit: "Packet",
        image: "/images/supermarket/spices-and-powders/cumin-seeds.png",
      },
      {
        name: "Kashmiri Chilli",
        unit: "kg/Packet",
        image: "/images/supermarket/spices-and-powders/kashmiri-chilli.png",
      },
      {
        name: "Sesame Seeds",
        unit: "kg/Packet",
        image: "/images/supermarket/spices-and-powders/sesame-seeds.png",
      },
      {
        name: "Foxtail Millet (Thina)",
        unit: "kg",
        image: "/images/supermarket/spices-and-powders/foxtail-millet.png",
      },
    ],
  },
  {
    category: "Oils, Sauces & Essentials",
    slug: "oils-and-sauces",
    items: [
      {
        name: "Gingelly / Sesame Oil",
        unit: "Bottle",
        image: "/images/supermarket/oils-and-sauces/sesame-oil.png",
      },
      {
        name: "Tomato Sauce",
        variants: ["Bottle", "Packet"],
        image: "/images/supermarket/oils-and-sauces/tomato-sauce.png",
      },
      {
        name: "Vinegar",
        unit: "Bottle",
        image: "/images/supermarket/oils-and-sauces/vinegar.png",
      },
      {
        name: "Crystal Sugar",
        unit: "kg",
        image: "/images/supermarket/oils-and-sauces/crystal-sugar.png",
      },
      {
        name: "Refined Sugar",
        unit: "kg",
        image: "/images/supermarket/oils-and-sauces/sugar.png",
      },
      {
        name: "Moulded Jaggery (Achuvellam)",
        unit: "kg",
        image: "/images/supermarket/oils-and-sauces/achuvellam-jaggery.png",
      },
      {
        name: "Jaggery (Sharkkara)",
        unit: "kg",
        image: "/images/supermarket/oils-and-sauces/jaggery.png",
      },
      {
        name: "Tamarind",
        unit: "kg",
        image: "/images/supermarket/oils-and-sauces/tamarind.png",
      },
      {
        name: "Tea Powder",
        unit: "Packet",
        image: "/images/supermarket/oils-and-sauces/tea-powder.png",
      },
      {
        name: "Vermicelli Varieties",
        unit: "Packet",
        image: "/images/supermarket/oils-and-sauces/vermicelli.png",
      },
    ],
  },
  {
    category: "Disposables & Packaging",
    slug: "disposables",
    items: [
      {
        name: "Roll Table Sheet",
        unit: "Roll/Packet",
        image: "/images/supermarket/disposables/table-sheet.png",
      },
      {
        name: "Tissue Paper",
        unit: "Packet",
        image: "/images/supermarket/disposables/tissue-paper.png",
      },
      {
        name: "Paper Plates",
        unit: "Packet",
        image: "/images/supermarket/disposables/paper-plates.png",
      },
      {
        name: "Paper Glasses",
        unit: "Packet",
        image: "/images/supermarket/disposables/paper-glasses.png",
      },
      {
        name: "HM Covers / Carry Bags",
        unit: "Packet",
        image: "/images/supermarket/disposables/hm-covers.png",
      },
    ],
  },
  {
    category: "Provisions, Bakery & Feeds",
    slug: "feeds-and-provisions",
    items: [
      {
        name: "Onions",
        unit: "kg",
        image: "/images/supermarket/feeds-and-provisions/onion.png",
      },
      {
        name: "Garlic",
        unit: "kg",
        image: "/images/supermarket/feeds-and-provisions/garlic.png",
      },
      {
        name: "Banana & Tapioca Chips",
        unit: "Packet",
        image: "/images/supermarket/feeds-and-provisions/chips.png",
      },
      {
        name: "Bakery Items",
        unit: "Item",
        image: "/images/supermarket/feeds-and-provisions/bakery.png",
      },
      {
        name: "Coconut Oil Cake (Thenga Pinnakku)",
        unit: "kg/Sack",
        image: "/images/supermarket/feeds-and-provisions/coconut-cake.png",
      },
      {
        name: "Cattle Feed",
        unit: "Sack",
        image: "/images/supermarket/feeds-and-provisions/cattle-feed.png",
      },
    ],
  },
];

// Curated high-resolution fallback visuals per category
export const CATEGORY_FALLBACKS = {
  "rice-and-grains":
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
  "pulses-and-lentils":
    "https://images.unsplash.com/photo-1596797882870-8c33deeac224?auto=format&fit=crop&w=800&q=80",
  "spices-and-powders":
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
  "oils-and-sauces":
    "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
  disposables:
    "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80",
  "feeds-and-provisions":
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
};

// Flattened products list conforming to the main product card model
export const SUPERMARKET_PRODUCTS = SUPERMARKET_CATEGORIES.flatMap(
  (cat, catIdx) =>
    cat.items.map((item, itemIdx) => {
      const price = item.variants
        ? item.variants.join(" • ")
        : item.unit
          ? `Per ${item.unit}`
          : "Available in Store";

      const specs = item.variants
        ? [...item.variants, "Retail & Bulk Supply"]
        : item.unit
          ? [`Unit: ${item.unit}`, "Daily Fresh", "Wholesale & Retail"]
          : ["Daily Fresh", "Supermarket Stock"];

      return {
        id: `sm-${cat.slug}-${itemIdx + 1}`,
        name: item.name,
        brand: "KOOLATH SUPERMARKET",
        category: cat.category,
        categorySlug: cat.slug,
        image: item.image,
        fallback:
          CATEGORY_FALLBACKS[cat.slug] ||
          "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80",
        description: `Freshly stocked ${item.name.toLowerCase()} available for wholesale and retail at Subani Koolath Supermarket. Guaranteed freshness and competitive market rates.`,
        specs,
        price,
        unit: item.unit,
        variants: item.variants,
        whatsapp: "917510116699",
        phone: "+91 75101 16699",
        href: "/products",
        isSupermarket: true,
      };
    }),
);
