import products from "@/src/data/products.json";

export const site = {
  name: "FlaskWholesale",
  origin: "https://flaskwholesale.com",
  phone: "+86 132 6710 2135",
  whatsapp: "https://wa.me/8613267102135",
};

export const categories = {
  "water-bottles": {
    name: "Water Bottles",
    title: "Wholesale Insulated Stainless Steel Water Bottles",
    copy: "Food-grade insulated bottles for retail, outdoor, corporate gifting and promotional programs, with custom logos, colours, lids and packaging.",
  },
  "tumblers-mugs": {
    name: "Tumblers & Mugs",
    title: "Wholesale Stainless Steel Tumblers & Mugs",
    copy: "Coffee tumblers, travel mugs, handled cups and statement drinkware built for cafés, brands, gifting and retail.",
  },
  "shaker-bottles": {
    name: "Shaker Bottles",
    title: "Wholesale Stainless Steel Shaker Bottles",
    copy: "Durable protein shakers for gyms, supplement brands, fitness events and private-label programmes.",
  },
  "water-jugs": {
    name: "Water Jugs",
    title: "Wholesale Stainless Steel Water Jugs",
    copy: "Large-capacity insulated jugs for sports, outdoor, worksite and high-volume hydration projects.",
  },
  "can-coolers": {
    name: "Can Coolers",
    title: "Custom Stainless Steel Can Coolers",
    copy: "Metal koozies and insulated can coolers for beverage brands, events, gifts and outdoor retail.",
  },
};

export const solutions = {
  "custom-logo": ["Custom Logo", "Laser engraving, screen printing and UV printing matched to your artwork and order size."],
  "custom-color": ["Custom Colour", "Use available stock colours for speed or develop Pantone-matched colours for your collection."],
  "private-label": ["Private Label", "Coordinate product selection, logo, packaging, labels and delivery with one manufacturing partner."],
  "packaging-solutions": ["Packaging Solutions", "White boxes, kraft boxes, gift boxes, labels, barcodes and retail-ready sets."],
  "surface-finishing": ["Surface Finishing", "Powder coating, spray paint, matte, gloss, gradient and decorative finishes."],
  "custom-mold": ["Custom Mould", "Develop exclusive bottle shapes, lid structures and functional components for larger OEM projects."],
};

export const articles = {
  "why-moq-exists": ["Why MOQ Exists in Custom Stainless Steel Bottle Manufacturing", "Understand how materials, colours, printing, packaging and moulds affect the practical minimum order quantity."],
  "reduce-custom-bottle-costs": ["How to Reduce Custom Bottle Costs Without Reducing Quality", "Choose stock structures, focused decoration and right-sized packaging to build a stronger first order."],
  "coating-durability": ["How to Improve Coating Durability", "A buyer-friendly guide to surface preparation, coating selection, curing and adhesion testing."],
  "test-304-stainless-steel": ["How to Test 304 Stainless Steel", "Learn how material certificates, incoming checks and sample testing support consistent food-contact materials."],
  "bottle-performance-tests": ["Performance Tests for Insulated Bottles", "See how leak, insulation, impact and coating tests help reduce quality risk before shipment."],
  "private-label-styles": ["Popular Drinkware Styles for Private Label Brands", "Compare practical bottle, tumbler, shaker, jug and can-cooler formats for different channels."],
  "logo-methods": ["Laser, Screen or UV Printing: Which Logo Method?", "Match logo complexity, colour count, durability and order quantity with the right decoration process."],
  "shipping-custom-drinkware": ["Planning Global Delivery for Custom Drinkware", "A straightforward overview of express, air and sea shipping for samples and bulk orders."],
};

export const businessPages = {
  "about-us": {
    title: "About FlaskWholesale",
    description: "A stainless steel drinkware manufacturing partner for brands, wholesalers, cafés, promotional suppliers and e-commerce teams.",
    heading: "Factory capability built around reliable OEM projects",
    paragraphs: [
      "FlaskWholesale supplies stainless steel bottles, tumblers, mugs, shakers, water jugs and can coolers for global buyers. Our role is to make the sourcing path clear—from selecting a proven stock style to confirming branding, packaging, production and delivery.",
      "We support low-MOQ logo projects, private-label launches and larger OEM/ODM programmes with practical communication and staged approvals.",
    ],
    bullets: ["Broad product range with 100 migrated styles", "Logo customization from 50 pieces on selected models", "Food-grade materials and buyer-requested quality checks", "Sampling, production updates and inspection support", "Global express, air and sea delivery coordination"],
  },
  cases: {
    title: "Custom Drinkware Cases",
    description: "Examples of how cafés, brands, fitness companies, schools and promotional buyers structure custom drinkware orders.",
    heading: "Projects built for real buying scenarios",
    paragraphs: ["Typical projects include café merchandise tumblers, fitness-brand shaker bottles, school bottles, corporate gifts, event drinkware and retail-ready private-label collections."],
    bullets: ["Café merchandise with custom tumblers and branded boxes", "Fitness shakers with scale marks and private-label packaging", "Corporate gifts with presentation packaging", "Retail collections with coordinated colours, labels and cartons"],
  },
  "payment-terms": {
    title: "Payment Terms",
    description: "Clear payment milestones for samples, custom projects and bulk production.",
    heading: "Clear commercial terms before production",
    paragraphs: ["Payment terms are confirmed on the formal quotation and may vary according to order size, customization, product development and buyer history."],
    bullets: ["Samples and one-off setup costs are normally paid before sample production", "Bulk orders typically require a deposit before production", "The remaining balance is completed before shipment unless agreed otherwise", "Bank details appear only on the official proforma invoice"],
  },
  "shipping-and-delivery": {
    title: "Shipping & Delivery",
    description: "Compare express, air and sea delivery for custom stainless steel drinkware orders.",
    heading: "Choose the right delivery method",
    paragraphs: ["Samples and small orders can move by courier. Time-sensitive commercial orders may use air freight, while larger volume orders generally achieve better landed cost by sea."],
    bullets: ["Express courier for samples and compact urgent orders", "Air freight for time-sensitive commercial shipments", "Sea freight for larger quantities", "DDP, DAP, FOB and other terms available by quotation"],
  },
  "manufacturing-process": {
    title: "Manufacturing Process",
    description: "A transparent overview of stainless steel bottle manufacturing from material preparation to packing.",
    heading: "How insulated drinkware is made",
    paragraphs: ["Production moves through material preparation, body forming, welding, vacuum extraction, polishing, coating, decoration, assembly, testing and packing."],
    bullets: ["Material preparation and stainless steel tube cutting", "Inner and outer wall forming", "Welding and neck finishing", "Vacuum extraction and insulation testing", "Colour coating and logo decoration", "Lid assembly, leak testing and final inspection"],
  },
  "quality-control-testing": {
    title: "Quality Control & Testing",
    description: "Quality checks for stainless steel drinkware, lids, coatings, printing, insulation and packaging.",
    heading: "Reduce risk before shipment",
    paragraphs: ["Quality checkpoints are matched to the product structure, customization method and buyer requirements."],
    bullets: ["Material and component inspection", "Vacuum insulation and temperature-retention testing", "Lid fit, leak and function testing", "Coating adhesion and surface appearance checks", "Logo position, colour and durability review", "Carton, label and packaging verification"],
  },
  faq: {
    title: "FAQ & Help Center",
    description: "Frequently asked questions about MOQ, samples, branding, production, packaging and delivery.",
    heading: "Questions before you order",
    paragraphs: ["Selected stock-model logo orders can start from 50 pieces. Samples are normally prepared in 3–7 days after product and artwork confirmation."],
    bullets: ["Laser engraving, screen printing and UV printing", "Selected stock colours may be mixed", "White, kraft, colour and gift-box packaging", "Courier, air and sea delivery options"],
  },
  "privacy-policy": {
    title: "Privacy Policy",
    description: "How FlaskWholesale handles information submitted through this website.",
    heading: "Privacy and inquiry information",
    paragraphs: ["Information you voluntarily provide through this website or WhatsApp is used to respond to inquiries, prepare quotations, coordinate samples and orders, and provide related support.", "This website does not sell personal information. Data may be shared only with service providers necessary to fulfil a request, subject to applicable agreements and law."],
    bullets: [],
  },
};

export { products };
export const getProduct = (slug) => products.find((product) => product.slug === slug);
export const getCategoryProducts = (category) => products.filter((product) => product.category === category);
