/**
 * DARYEEL WELLNESS — PRODUCT CATALOGUE
 * ------------------------------------------------------------------
 * Edit products here. Every text field is bilingual: { en, so }.
 *
 * benefits:
 *   - exactly three { en, so } items, written as responsible, non-curative
 *     statements (no "cures / treats / prevents disease" claims);
 *   - or `null` while the exact formulation is still being verified —
 *     the site then shows a "Benefits being verified" note instead.
 * suppliedBenefits: information supplied by Daryeel Wellness, shown as-is
 *   (used for Saliida Mucjisada until more details are provided).
 * images: keys of files in src/assets/products (first image is the main one).
 */
import type { Localized } from "@/i18n";
import type { CategoryId, SubcategoryId } from "./catalog";

export type Benefits = [Localized, Localized, Localized];

export type Product = {
  slug: string;
  name: string;
  /** Somali name, when it differs from the brand/English name. */
  nameSo?: string;
  brand?: string;
  /** Extra search terms (alternative spellings, local names). */
  aliases?: string[];
  category: CategoryId;
  subcategory?: SubcategoryId;
  images: string[];
  /** Optional labels for each image (e.g. variants). */
  imageLabels?: Localized[];
  /** Pack facts as printed on the label, e.g. "500 mg · 100 veg capsules". */
  facts?: string;
  description: Localized;
  benefits: Benefits | null;
  suppliedBenefits?: Localized[];
  caution?: Localized;
  featured?: boolean;
};

/* ---------- Shared, responsibly worded benefit statements ---------- */
const CREATINE: Localized = {
  en: "Creatine increases physical performance in successive bursts of short-term, high-intensity exercise",
  so: "Creatine-ku wuxuu kordhiyaa waxqabadka jirka marka si isdaba-joog ah loo sameeyo jimicsi gaaban oo xooggan",
};
const PROTEIN_MUSCLE: Localized = {
  en: "Protein contributes to the growth and maintenance of muscle mass",
  so: "Borotiinku wuxuu gacan ka geystaa korriinka iyo ilaalinta cufnaanta murqaha",
};
const ZINC_IMMUNE: Localized = {
  en: "Zinc contributes to the normal function of the immune system",
  so: "Zinc-gu wuxuu gacan ka geystaa shaqada caadiga ah ee habdhiska difaaca jirka",
};
const VITC_IMMUNE: Localized = {
  en: "Vitamin C contributes to the normal function of the immune system",
  so: "Fitamiin C wuxuu gacan ka geystaa shaqada caadiga ah ee habdhiska difaaca jirka",
};
const VITC_OXIDATIVE: Localized = {
  en: "Vitamin C contributes to the protection of cells from oxidative stress",
  so: "Fitamiin C wuxuu gacan ka geystaa ilaalinta unugyada jirka ee walbahaarka oksaydhka",
};
const VITC_COLLAGEN: Localized = {
  en: "Vitamin C contributes to normal collagen formation for healthy skin",
  so: "Fitamiin C wuxuu gacan ka geystaa samaynta caadiga ah ee kolajinka si maqaarku u caafimaad qabo",
};
const VITD_BONES: Localized = {
  en: "Vitamin D contributes to the maintenance of normal bones and teeth",
  so: "Fitamiin D wuxuu gacan ka geystaa ilaalinta lafo iyo ilko caadi ah",
};
const VITD_IMMUNE: Localized = {
  en: "Vitamin D contributes to the normal function of the immune system",
  so: "Fitamiin D wuxuu gacan ka geystaa shaqada caadiga ah ee habdhiska difaaca jirka",
};
const VEG_CAPS: Localized = {
  en: "Vegetarian / vegan capsules",
  so: "Kaabsuul khudradeed / vegan ah",
};
const CAFFEINE_CAUTION: Localized = {
  en: "Contains caffeine. Not recommended for children, pregnant or breastfeeding women, or people sensitive to caffeine.",
  so: "Waxaa ku jira kafeyn. Laguma talinayo carruurta, haweenka uurka leh ama naas-nuujinaya, ama dadka kafeynta u nugul.",
};

export const products: Product[] = [
  /* =================== HERBAL PRODUCTS — GENERAL =================== */
  {
    slug: "ashwagandha-gummies",
    name: "Ashwagandha Gummies",
    brand: "New Leaf",
    category: "herbal",
    subcategory: "general",
    images: ["ashwagandha"],
    facts: "1200 mg · 5% withanolides · 180 gummies",
    featured: true,
    description: {
      en: "Vegan ashwagandha gummies made with real fruit juice — an easy way to add this traditional Ayurvedic herb to your daily routine.",
      so: "Xabbado macaan oo vegan ah oo ashwagandha ah, laga sameeyay casiir miro dhab ah — hab fudud oo aad geedkan dhaqameed ee Ayurveda ugu darto nidaamkaaga maalinlaha ah.",
    },
    benefits: [
      {
        en: "Traditionally used in Ayurveda as an adaptogen to support calm and balance",
        so: "Dhaqan ahaan Ayurveda waxaa loo isticmaalaa sidii adaptogen si loo taageero degganaanta iyo dheelitirka",
      },
      {
        en: "Standardised to 5% withanolides, the herb's key natural compounds",
        so: "Waxaa lagu habeeyay 5% withanolides, oo ah walxaha dabiiciga ah ee ugu muhiimsan geedka",
      },
      {
        en: "Vegan, lab-tested gummies — no capsules to swallow",
        so: "Xabbado vegan ah oo shaybaar lagu baaray — looma baahna kaabsuul la liqo",
      },
    ],
  },
  {
    slug: "chillflex-herbal-cream-mint",
    name: "ChillFlex Herbal Cream with Mint",
    brand: "ChillFlex",
    category: "herbal",
    subcategory: "general",
    images: ["chillflex-cream"],
    facts: "98 g · herbal joint & muscle cream",
    description: {
      en: "A herbal joint and muscle cream with mint that gives an instant cooling sensation — made for massage after exercise or a long day.",
      so: "Kareem dhireed oo loogu talagalay kalagoysyada iyo murqaha, kana kooban reexaan (mint), kaas oo isla markiiba siiya dareen qabow — loogu talagalay duugis kadib jimicsi ama maalin dheer.",
    },
    benefits: [
      {
        en: "Mint gives an instant, refreshing cooling sensation",
        so: "Reexaantu (mint) waxay siisaa dareen qabow oo nafis leh isla markiiba",
      },
      {
        en: "Smooth cream that massages easily into muscles and joints",
        so: "Kareem jilicsan oo si fudud loogu duugo murqaha iyo kalagoysyada",
      },
      {
        en: "Herbal formula for external use only",
        so: "Isku-dar dhireed oo kaliya dibadda jirka loo isticmaalo",
      },
    ],
  },
  {
    slug: "fenugreek",
    name: "Fenugreek",
    nameSo: "Xulbad (Fenugreek)",
    brand: "NOW",
    aliases: ["Fengruuk", "Xulbad", "Hulbad"],
    category: "herbal",
    subcategory: "general",
    images: ["fenugreek"],
    facts: "500 mg · 100 veg capsules",
    description: {
      en: "Fenugreek seed in convenient 500 mg vegetarian capsules — a traditional herb long used in Somali, Middle Eastern and South Asian homes.",
      so: "Iniinta xulbadda oo ku jirta kaabsuul khudradeed oo 500 mg ah — geed dhaqameed muddo dheer laga isticmaali jiray guryaha Soomaalida, Bariga Dhexe iyo Koonfurta Aasiya.",
    },
    benefits: [
      {
        en: "Traditional herb long valued in Middle Eastern and South Asian herbal practice",
        so: "Geed dhaqameed oo muddo dheer qiimo ku lahaa daawada dhireed ee Bariga Dhexe iyo Koonfurta Aasiya",
      },
      {
        en: "Traditionally used to support healthy digestion",
        so: "Dhaqan ahaan waxaa loo isticmaalaa taageeridda dheefshiid caafimaad qaba",
      },
      VEG_CAPS,
    ],
  },
  {
    slug: "magnesium-glycinate",
    name: "Magnesium Glycinate",
    brand: "New Leaf",
    category: "herbal",
    subcategory: "general",
    images: ["magnesium-glycinate"],
    facts: "120 capsules",
    featured: true,
    description: {
      en: "Magnesium in its gentle glycinate form — a well-tolerated choice for everyday mineral support.",
      so: "Magnesium oo ku jira qaabka glycinate ee jilicsan — doorasho uu jirku si fiican u qaato oo loogu talagalay taageerada macdanta maalinlaha ah.",
    },
    benefits: [
      {
        en: "Magnesium contributes to the reduction of tiredness and fatigue",
        so: "Magnesium-ku wuxuu gacan ka geystaa yaraynta daalka iyo tabar-darrida",
      },
      {
        en: "Magnesium contributes to normal muscle function",
        so: "Magnesium-ku wuxuu gacan ka geystaa shaqada caadiga ah ee murqaha",
      },
      {
        en: "Magnesium contributes to the normal function of the nervous system",
        so: "Magnesium-ku wuxuu gacan ka geystaa shaqada caadiga ah ee habdhiska dareemayaasha",
      },
    ],
  },
  {
    slug: "prostate-plus",
    name: "Prostate Plus",
    brand: "Earth's Creation",
    category: "herbal",
    subcategory: "general",
    images: ["prostate-plus"],
    facts: "60 capsules · with saw palmetto",
    description: {
      en: "A men's prostate health formula with added saw palmetto, as described by the manufacturer.",
      so: "Isku-dar loogu talagalay caafimaadka qanjirka 'prostate' ee ragga, oo lagu daray saw palmetto, sida ay shirkadda soo saartay sheegtay.",
    },
    benefits: [
      {
        en: "Formulated for men's prostate health, as labelled by the manufacturer",
        so: "Waxaa loo sameeyay caafimaadka qanjirka 'prostate' ee ragga, sida shirkaddu ku qortay calaamadda",
      },
      {
        en: "Contains saw palmetto, a botanical traditionally used in men's health",
        so: "Waxaa ku jira saw palmetto, geed dhaqan ahaan loo isticmaalo caafimaadka ragga",
      },
      {
        en: "Non-GMO dietary supplement made in the USA",
        so: "Kaab cunto oo aan GMO ahayn, laguna sameeyay Maraykanka",
      },
    ],
    caution: {
      en: "Men with urinary or prostate symptoms should see a doctor before use.",
      so: "Ragga qaba calaamado kaadi ama 'prostate' la xiriira waa inay dhakhtar arkaan ka hor isticmaalka.",
    },
  },
  {
    slug: "shilajit-ultra",
    name: "Shilajit Ultra",
    brand: "Flynew",
    category: "herbal",
    subcategory: "general",
    images: ["shilajit-ultra"],
    facts: "60 capsules",
    description: {
      en: "Shilajit in easy capsule form — a mineral-rich resin traditionally gathered from high mountain rocks.",
      so: "Shilajit oo ku jira kaabsuul fudud — xab hodan ku ah macdano, dhaqan ahaan laga soo ururiyo dhagxaanta buuraha dhaadheer.",
    },
    benefits: [
      {
        en: "Traditional Ayurvedic resin, naturally rich in fulvic acid",
        so: "Xab dhaqameed Ayurveda ah oo dabiici ahaan hodan ku ah fulvic acid",
      },
      {
        en: "Easy-to-take capsules — no measuring of resin needed",
        so: "Kaabsuul si fudud loo qaato — looma baahna in xabka la miisaamo",
      },
      {
        en: "Made in the USA, as stated on the label",
        so: "Waxaa lagu sameeyay Maraykanka, sida ku qoran calaamadda",
      },
    ],
  },
  {
    slug: "shilajit-gummies",
    name: "Shilajit Gummies",
    brand: "New Leaf",
    category: "herbal",
    subcategory: "general",
    images: ["shilajit-gummies"],
    facts: "3000 mg · with zinc & vitamin B6 · 60 gummies",
    featured: true,
    description: {
      en: "Berry-flavoured shilajit gummies with added zinc and vitamin B6 — a modern, easy way to enjoy this traditional resin.",
      so: "Xabbado macaan oo shilajit ah oo dhadhan berry leh, lagu daray zinc iyo fitamiin B6 — hab casri ah oo fudud oo lagu isticmaalo xabkan dhaqameed.",
    },
    benefits: [
      ZINC_IMMUNE,
      {
        en: "Vitamin B6 contributes to the reduction of tiredness and fatigue",
        so: "Fitamiin B6 wuxuu gacan ka geystaa yaraynta daalka iyo tabar-darrida",
      },
      {
        en: "Vegan, berry-flavoured gummies made in the EU",
        so: "Xabbado macaan oo vegan ah, dhadhan berry leh, laguna sameeyay Midowga Yurub",
      },
    ],
  },

  /* =================== HERBAL — NATURAL INGREDIENTS =================== */
  {
    slug: "black-cumin",
    name: "Black Cumin Seeds",
    nameSo: "Xabbad Sooda",
    aliases: ["Habbat al-Sawda", "Nigella sativa", "Xabbad Sooda", "Habasoodo"],
    category: "herbal",
    subcategory: "ingredients",
    images: ["black-cumin"],
    facts: "Whole seeds · Nigella sativa",
    description: {
      en: "Whole Nigella sativa seeds, cherished for generations in Somali and Middle Eastern kitchens and traditional wellness.",
      so: "Xabbad sooda (Nigella sativa) oo dhan, jiil ka jiil qiimo ku lahayd jikada Soomaalida iyo Bariga Dhexe iyo fayo-qabka dhaqameed.",
    },
    benefits: [
      {
        en: "Whole Nigella sativa seeds with a warm, peppery aroma",
        so: "Xabbad sooda oo dhan oo leh ur diirran oo basbaas u eg",
      },
      {
        en: "Traditionally valued in prophetic and Middle Eastern wellness practice",
        so: "Dhaqan ahaan qiimo weyn ayay ku leedahay tibbiga nabawiga iyo fayo-qabka Bariga Dhexe",
      },
      {
        en: "Versatile — add to bread, honey, tea or everyday dishes",
        so: "Siyaabo badan loo isticmaali karo — ku dar rootiga, malabka, shaaha ama cuntada maalinlaha ah",
      },
    ],
  },
  {
    slug: "chia-seeds",
    name: "Chia Seeds",
    nameSo: "Iniinyaha Chia",
    category: "herbal",
    subcategory: "ingredients",
    images: ["chia-seeds"],
    facts: "Whole seeds",
    description: {
      en: "Tiny, nutrient-dense seeds that swell into a soft gel — ideal for puddings, smoothies, yoghurt and juices.",
      so: "Iniinyo yaryar oo nafaqo badan oo biyaha ku bararta oo noqota jel jilicsan — ku fiican macmacaanka, smoothie-ga, caanaha fadhiga iyo casiirka.",
    },
    benefits: [
      { en: "Naturally rich in dietary fibre", so: "Dabiici ahaan hodan ku ah fiber-ka cuntada" },
      {
        en: "Plant source of alpha-linolenic acid (ALA), an omega-3 fatty acid",
        so: "Il dhireed oo laga helo alpha-linolenic acid (ALA), oo ah dufan omega-3 ah",
      },
      {
        en: "Easy to add to drinks, porridge and yoghurt",
        so: "Si fudud loogu dari karo cabbitaannada, boorashka iyo caanaha fadhiga",
      },
    ],
  },
  {
    slug: "herbal-seeds",
    name: "Herbal Seeds",
    nameSo: "Iniinyo Dhireed",
    category: "herbal",
    subcategory: "ingredients",
    images: ["herbal-seeds"],
    description: {
      en: "A selection of whole herbal seeds and dried botanicals. Ask our team on WhatsApp for the exact contents of the current selection.",
      so: "Iniinyo dhireed oo dhan iyo dhir la qalajiyay oo la isku daray. Kooxdayada WhatsApp ku weydii waxa saxda ah ee ku jira xulashada hadda jirta.",
    },
    benefits: null,
  },
  {
    slug: "pure-honey",
    name: "Pure Honey",
    nameSo: "Malab Saafi ah",
    aliases: ["Malab", "Honey"],
    category: "herbal",
    subcategory: "ingredients",
    images: ["pure-honey"],
    featured: true,
    description: {
      en: "Natural, pure honey with a rich golden colour and flavour — a timeless natural sweetener.",
      so: "Malab dabiici ah oo saafi ah, leh midab dahabi ah iyo dhadhan qani ah — macmacaan dabiici ah oo weligiis qiimo lahaa.",
    },
    benefits: [
      {
        en: "A natural source of carbohydrates for quick energy",
        so: "Il dabiici ah oo karbohaydraydh ah oo tamar degdeg ah bixisa",
      },
      {
        en: "Delicious natural sweetener for tea, porridge and desserts",
        so: "Macmacaan dabiici ah oo dhadhan fiican leh oo shaaha, boorashka iyo macmacaanka lagu daro",
      },
      {
        en: "Treasured in traditional and prophetic wellness practice",
        so: "Qiimo weyn ku leh fayo-qabka dhaqameed iyo tibbiga nabawiga",
      },
    ],
    caution: {
      en: "Not suitable for babies under 12 months.",
      so: "Kuma habboona ilmaha ka yar 12 bilood.",
    },
  },
  {
    slug: "saffron",
    name: "Saffron",
    nameSo: "Sacfaraan",
    aliases: ["Saffron Seeds", "Sacfaraan", "Zacfaraan"],
    category: "herbal",
    subcategory: "ingredients",
    images: ["saffron"],
    facts: "Saffron threads",
    description: {
      en: "Delicate saffron threads with a deep colour and distinctive aroma — a little goes a long way.",
      so: "Xarigo sacfaraan oo jilicsan, leh midab qoto dheer iyo ur gaar ah — wax yar ayaa ku filan.",
    },
    benefits: [
      {
        en: "Prized spice that adds a rich golden colour and aroma",
        so: "Xawaash qaali ah oo siiya midab dahabi ah iyo ur fiican",
      },
      {
        en: "A few threads are enough to flavour rice, tea and desserts",
        so: "Dhowr xarig ayaa ku filan in lagu dhadhamiyo bariiska, shaaha iyo macmacaanka",
      },
      {
        en: "Long valued in traditional Middle Eastern and Persian practice",
        so: "Muddo dheer ayuu qiimo ku lahaa dhaqanka Bariga Dhexe iyo Faaris",
      },
    ],
  },
  {
    slug: "cloves",
    name: "Cloves",
    nameSo: "Qaranfuul",
    category: "herbal",
    subcategory: "ingredients",
    images: ["star-anise"],
    description: {
      en: "Whole aromatic cloves for tea, rice, and traditional Somali dishes. Ask our team on WhatsApp for details of the current stock.",
      so: "Qaranfuul udgoon oo dhan oo loogu talagalay shaaha, bariiska iyo cuntooyinka dhaqameed ee Soomaalida. Kooxdayada WhatsApp ku weydii faahfaahinta kaydka hadda jira.",
    },
    benefits: [
      { en: "Adds warm, rich aroma to tea, rice and stews", so: "Shaaha, bariiska iyo maraqa wuxuu siiyaa ur diiran oo qani ah" },
      { en: "Naturally contains eugenol, an aromatic plant compound", so: "Si dabiici ah wuxuu ka kooban yahay eugenol, walax udgoon oo dhir ah" },
      { en: "Long used in traditional home remedies and cooking", so: "Muddo dheer ayaa loo isticmaalay daawooyinka guriga iyo karinta dhaqameed" },
    ],
  },

  /* =================== HERBAL — OILS =================== */
  {
    slug: "batana-oil",
    name: "Batana Oil",
    brand: "Hualijia",
    category: "herbal",
    subcategory: "oils",
    images: ["batana-oil"],
    facts: "120 g · scalp & hair oil",
    featured: true,
    description: {
      en: "A rich scalp and hair oil made with batana oil, traditionally used by the Miskito people of Honduras for hair care.",
      so: "Saliid timo iyo madax oo qani ah oo laga sameeyay saliidda batana, dhaqan ahaan ay dadka Miskito ee Honduras u isticmaalaan daryeelka timaha.",
    },
    benefits: [
      {
        en: "Rich, nourishing oil that conditions dry hair",
        so: "Saliid qani ah oo nafaqeysa, qoyana timaha qalalan",
      },
      {
        en: "Helps soften hair and reduce the look of split ends",
        so: "Waxay gacan ka geysataa jilcinta timaha iyo yaraynta muuqaalka darfaha jaban",
      },
      {
        en: "Massage into the scalp as part of a regular hair-care routine",
        so: "Ku duug maqaarka madaxa qayb ka mid ah daryeelka timaha ee joogtada ah",
      },
    ],
  },
  {
    slug: "feg-hair-spray",
    name: "FEG Hair Spray",
    brand: "FEG",
    aliases: ["Feg Oil"],
    category: "herbal",
    subcategory: "oils",
    images: ["feg-hair-spray"],
    facts: "50 ml spray",
    description: {
      en: "A scalp spray from FEG used as part of a hair-care routine. Ask our team for full ingredient and usage details.",
      so: "Buufin madaxa ah oo ka timid FEG, loo isticmaalo qayb ka mid ah daryeelka timaha. Kooxdayada weydii faahfaahinta buuxda ee walxaha iyo isticmaalka.",
    },
    benefits: null,
  },
  {
    slug: "minoxidil-5",
    name: "Minoxidil 5% Topical Solution",
    brand: "Kirkland Signature",
    aliases: ["Minoxidile"],
    category: "herbal",
    subcategory: "oils",
    images: ["minoxidil"],
    facts: "60 ml · 1-month supply · men",
    description: {
      en: "Extra-strength 5% minoxidil topical solution for men — an over-the-counter hair regrowth treatment for hereditary hair loss on the top of the scalp.",
      so: "Dareere minoxidil 5% ah oo xoog badan oo loogu talagalay ragga — daawo aan warqad dhakhtar u baahnayn oo loo isticmaalo soo celinta timaha ka dhacay sababo hideed dhinaca sare ee madaxa.",
    },
    benefits: [
      {
        en: "Contains 5% minoxidil, a clinically studied hair-regrowth ingredient",
        so: "Waxaa ku jira 5% minoxidil, walax si caafimaad ah loo daraaseeyay oo loogu talagalay soo celinta timaha",
      },
      {
        en: "For hereditary hair thinning at the top of the scalp in men",
        so: "Loogu talagalay khafiifinta timaha ee hidaha ah ee dhinaca sare ee madaxa ragga",
      },
      {
        en: "Unscented solution for daily use on the scalp",
        so: "Dareere aan ur lahayn oo maalin walba madaxa la mariyo",
      },
    ],
    caution: {
      en: "Medicine for external use only. For men, as stated on the label. Speak to a pharmacist or doctor first if you have a heart condition or other health concerns.",
      so: "Daawo dibadda jirka oo keliya loo isticmaalo. Ragga ayaa loogu talagalay, sida ku qoran calaamadda. Marka hore la hadal farmashiiste ama dhakhtar haddii aad qabto xanuun wadne ama walaac kale oo caafimaad.",
    },
  },
  {
    slug: "rosemary-oil",
    name: "Natural Rosemary Oil",
    nameSo: "Saliidda Rosemary",
    brand: "Nature Spell",
    aliases: ["Rosmery Oil"],
    category: "herbal",
    subcategory: "oils",
    images: ["rosemary-oil"],
    facts: "150 ml · hair & body oil",
    description: {
      en: "A natural treatment oil infused with rosemary, suitable for all hair and skin types.",
      so: "Saliid dabiici ah oo lagu qasay rosemary, ku habboon dhammaan noocyada timaha iyo maqaarka.",
    },
    benefits: [
      {
        en: "Conditions and adds shine to all hair types",
        so: "Waxay qoysaa oo dhalaal siisaa dhammaan noocyada timaha",
      },
      {
        en: "Can be massaged into the scalp as part of a hair-care routine",
        so: "Waa lagu duugi karaa maqaarka madaxa qayb ka mid ah daryeelka timaha",
      },
      {
        en: "Doubles as a nourishing body oil for skin",
        so: "Waxaa sidoo kale loo isticmaali karaa saliid jirka ah oo maqaarka nafaqeysa",
      },
    ],
  },
  {
    slug: "saliida-mucjisada",
    name: "Saliida Mucjisada",
    nameSo: "Saliida Mucjisada",
    brand: "Somwell",
    aliases: ["Miracle Oil", "Saliidda Mucjisada"],
    category: "herbal",
    subcategory: "oils",
    images: ["saliida-mucjisada"],
    facts: "300 ml · body massage oil spray",
    featured: true,
    description: {
      en: "Somwell Miracle Oil — a relaxation body massage oil spray.",
      so: "Somwell Miracle Oil — buufin saliid duugis jirka ah oo nasasho leh.",
    },
    benefits: null,
    // Information supplied by Daryeel Wellness (from the product file). Do not expand.
    suppliedBenefits: [
      {
        en: "Treats back pain, bone pain, headaches, fainting, and nerve issues — and the Holy Quran.",
        so: "Waxay daawaysaa xanuunka dhabarka, xanuunka lafaha, madax-xanuunka, suuxdinta, iyo dhibaatooyinka dareemayaasha — iyo Quraanka Kariimka ah.",
      },
    ],
  },
  {
    slug: "saytuun-oil",
    name: "Saytuun Oil (Extra Virgin Olive Oil)",
    nameSo: "Saliidda Saytuunka",
    brand: "Bestolio",
    aliases: ["Olive oil", "Saytuun"],
    category: "herbal",
    subcategory: "oils",
    images: ["saytuun-oil"],
    facts: "100% extra virgin · first cold pressed · several sizes",
    description: {
      en: "100% extra virgin olive oil, first cold pressed, with a great rich flavour — available in several bottle sizes.",
      so: "Saliid saytuun 100% extra virgin ah, tuujin qabow oo koowaad ah, leh dhadhan qani ah — waxaa la helaa dhowr cabbir oo dhalo ah.",
    },
    benefits: [
      {
        en: "Rich in monounsaturated fats (oleic acid)",
        so: "Hodan ku ah dufanka monounsaturated (oleic acid)",
      },
      {
        en: "First cold pressed to keep its full natural flavour",
        so: "Tuujin qabow oo koowaad ah si dhadhankeeda dabiiciga ah loo ilaaliyo",
      },
      {
        en: "Ideal for salads, cooking and traditional hair and skin care",
        so: "Ku fiican saladhka, karinta iyo daryeelka dhaqameed ee timaha iyo maqaarka",
      },
    ],
  },

  /* =================== MINERALS =================== */
  {
    slug: "collagen-beauty-gummies",
    name: "Collagen Beauty Gummies",
    nameSo: "Kolajin (Collagen) Gummies",
    brand: "New Leaf",
    category: "minerals",
    images: ["collagen"],
    facts: "Hydrolysed bovine collagen I & III · vitamin C, folic acid & biotin · 60 gummies",
    featured: true,
    description: {
      en: "Strawberry-flavoured gummies with hydrolysed collagen, vitamin C, folic acid and biotin for your daily beauty routine.",
      so: "Xabbado macaan oo dhadhan istroberi leh oo ka kooban kolajin la jajabiyay, fitamiin C, folic acid iyo biotin, loogu talagalay quruxda maalinlaha ah.",
    },
    benefits: [
      VITC_COLLAGEN,
      {
        en: "Biotin contributes to the maintenance of normal hair and skin",
        so: "Biotin-ku wuxuu gacan ka geystaa ilaalinta timo iyo maqaar caadi ah",
      },
      {
        en: "Hydrolysed bovine collagen types I & III in a tasty gummy",
        so: "Kolajin lo'aad (nooca I & III) oo la jajabiyay, ku jira xabbad macaan",
      },
    ],
  },
  {
    slug: "dhea-25",
    name: "DHEA 25 mg",
    brand: "Earth's Creation",
    category: "minerals",
    images: ["dhea"],
    facts: "25 mg per serving · 60 capsules",
    description: {
      en: "DHEA (dehydroepiandrosterone), 25 mg per serving — a hormone precursor that the body's adrenal glands naturally produce.",
      so: "DHEA (dehydroepiandrosterone), 25 mg qaadasho kasta — hormoon ay qanjirada adrenal-ka ee jirku si dabiici ah u sameeyaan.",
    },
    benefits: [
      {
        en: "DHEA is a hormone naturally produced by the adrenal glands",
        so: "DHEA waa hormoon ay dabiici ahaan sameeyaan qanjirada adrenal-ka",
      },
      { en: "Provides 25 mg of DHEA per serving", so: "Qaadasho kasta waxay bixisaa 25 mg oo DHEA ah" },
      {
        en: "Non-GMO capsules made in the USA",
        so: "Kaabsuul aan GMO ahayn oo lagu sameeyay Maraykanka",
      },
    ],
    caution: {
      en: "DHEA is a hormone. Use only after speaking with a doctor. Not for under-18s or for pregnant or breastfeeding women.",
      so: "DHEA waa hormoon. Isticmaal oo keliya kadib markaad la hadasho dhakhtar. Looma talagelin dadka ka yar 18 sano ama haweenka uurka leh ama naas-nuujinaya.",
    },
  },
  {
    slug: "inositol-capsules",
    name: "Inositol Capsules 500 mg",
    brand: "NOW",
    category: "minerals",
    images: ["inositol"],
    facts: "500 mg · myo-inositol · 100 veg capsules",
    description: {
      en: "Inositol in its natural myo-inositol form, in 500 mg vegetarian capsules.",
      so: "Inositol oo ku jira qaabkiisa dabiiciga ah ee myo-inositol, kaabsuul khudradeed oo 500 mg ah.",
    },
    benefits: [
      {
        en: "Provides myo-inositol, the most common natural form of inositol",
        so: "Wuxuu bixiyaa myo-inositol, qaabka dabiiciga ah ee ugu badan ee inositol",
      },
      {
        en: "Supports healthy cell membrane function, as labelled",
        so: "Wuxuu taageeraa shaqada caafimaadka qabta ee xuubka unugyada, sida ku qoran calaamadda",
      },
      VEG_CAPS,
    ],
  },
  {
    slug: "iron-complex",
    name: "Iron Complex",
    nameSo: "Bir (Iron Complex)",
    brand: "NOW",
    category: "minerals",
    images: ["iron-complex"],
    facts: "100 tablets · bioavailable iron",
    description: {
      en: "A bioavailable, gentle iron complex — an essential mineral for everyday energy.",
      so: "Isku-dar bir ah oo jirku si fiican u nuugo oo jilicsan — macdan muhiim u ah tamarta maalinlaha ah.",
    },
    benefits: [
      {
        en: "Iron contributes to the normal formation of red blood cells and haemoglobin",
        so: "Birtu waxay gacan ka geysataa samaynta caadiga ah ee unugyada dhiigga cas iyo haemoglobin-ka",
      },
      {
        en: "Iron contributes to normal oxygen transport in the body",
        so: "Birtu waxay gacan ka geysataa qaadista caadiga ah ee ogsijiinta jirka",
      },
      {
        en: "Iron contributes to the reduction of tiredness and fatigue",
        so: "Birtu waxay gacan ka geysataa yaraynta daalka iyo tabar-darrida",
      },
    ],
    caution: {
      en: "Keep out of reach of children — too much iron is dangerous for young children.",
      so: "Ka fogee carruurta — bir badan ayaa khatar ku ah carruurta yaryar.",
    },
  },
  {
    slug: "ultra-omega-3",
    name: "Ultra Omega-3 Fish Oil",
    brand: "NOW",
    category: "minerals",
    images: ["ultra-omega-3"],
    facts: "500 EPA / 250 DHA · 90 softgels",
    featured: true,
    description: {
      en: "Concentrated fish oil with 500 mg EPA and 250 mg DHA in odour-controlled, enteric-coated softgels.",
      so: "Saliid kalluun oo xoogan oo leh 500 mg EPA iyo 250 mg DHA, ku jira kaabsuul jilicsan oo urta la xakameeyay oo dahaar caloosha ilaaliya leh.",
    },
    benefits: [
      {
        en: "EPA and DHA contribute to the normal function of the heart",
        so: "EPA iyo DHA waxay gacan ka geystaan shaqada caadiga ah ee wadnaha",
      },
      {
        en: "DHA contributes to the maintenance of normal brain function",
        so: "DHA wuxuu gacan ka geystaa ilaalinta shaqada caadiga ah ee maskaxda",
      },
      {
        en: "Odour-controlled, enteric-coated softgels",
        so: "Kaabsuul jilicsan oo urta la xakameeyay, dahaar caloosha ilaaliya leh",
      },
    ],
  },
  {
    slug: "zinc-50",
    name: "Zinc 50 mg",
    brand: "NOW",
    category: "minerals",
    images: ["zinc"],
    facts: "50 mg · 100 tablets",
    description: {
      en: "Essential zinc in 50 mg tablets for everyday immune and enzyme support.",
      so: "Zinc muhiim ah oo ku jira kiniin 50 mg ah, loogu talagalay taageerada maalinlaha ah ee difaaca jirka iyo enzymes-ka.",
    },
    benefits: [
      ZINC_IMMUNE,
      {
        en: "Zinc contributes to normal enzyme function and metabolism",
        so: "Zinc-gu wuxuu gacan ka geystaa shaqada caadiga ah ee enzymes-ka iyo dheef-shiid kiimikaadka",
      },
      {
        en: "Zinc contributes to the maintenance of normal skin, hair and nails",
        so: "Zinc-gu wuxuu gacan ka geystaa ilaalinta maqaar, timo iyo ciddiyo caadi ah",
      },
    ],
  },
  {
    slug: "zinc-picolinate",
    name: "Zinc Picolinate 50 mg",
    brand: "NOW",
    category: "minerals",
    images: ["zinc-picolinate"],
    facts: "50 mg · 40 veg capsules",
    description: {
      en: "Zinc in picolinate form, a chelated zinc, in 50 mg vegetarian capsules.",
      so: "Zinc oo ku jira qaabka picolinate (zinc chelated ah), kaabsuul khudradeed oo 50 mg ah.",
    },
    benefits: [
      ZINC_IMMUNE,
      {
        en: "Zinc contributes to the maintenance of normal skin",
        so: "Zinc-gu wuxuu gacan ka geystaa ilaalinta maqaar caadi ah",
      },
      VEG_CAPS,
    ],
  },

  /* =================== SPORTS NUTRITION =================== */
  {
    slug: "cell-tech",
    name: "Cell-Tech Creatine",
    brand: "MuscleTech",
    aliases: ["Cell Tech"],
    category: "sports",
    images: ["cell-tech"],
    facts: "Fruit punch · 2.27 kg",
    description: {
      en: "MuscleTech's creatine formula with carbohydrates, made for strength-focused training.",
      so: "Isku-darka creatine ee MuscleTech oo lagu daray karbohaydraydh, loogu talagalay tababarka xoogga.",
    },
    benefits: [
      CREATINE,
      {
        en: "Combines creatine with carbohydrates for use after training",
        so: "Wuxuu isku daraa creatine iyo karbohaydraydh si loo isticmaalo kadib tababarka",
      },
      {
        en: "Fruit punch flavoured powder that mixes easily with water",
        so: "Budo dhadhan fruit punch leh oo si fudud biyo ugu milma",
      },
    ],
  },
  {
    slug: "creatine-micronized",
    name: "Creatine Monohydrate Micronized",
    brand: "Applied Nutrition",
    aliases: ["Creatine Micronized"],
    category: "sports",
    images: ["creatine-micronized"],
    facts: "100% creatine monohydrate · unflavoured",
    description: {
      en: "100% micronised creatine monohydrate from Applied Nutrition Professional, tested for athletes.",
      so: "Creatine monohydrate 100% ah oo la jilciyay (micronised) oo ka yimid Applied Nutrition Professional, loona baaray ciyaartoyda.",
    },
    benefits: [
      CREATINE,
      {
        en: "Micronised powder for smooth, easy mixing",
        so: "Budo la jilciyay oo si siman oo fudud u milma",
      },
      {
        en: "Unflavoured — add to any shake or drink",
        so: "Dhadhan ma laha — ku dar cabbitaan kasta ama shake",
      },
    ],
  },
  {
    slug: "creatine-monohydrate",
    name: "Creatine Monohydrate",
    category: "sports",
    images: ["creatine-monohydrate"],
    facts: "Creatine monohydrate powder",
    description: {
      en: "Classic creatine monohydrate powder — a staple for strength and power training.",
      so: "Budada creatine monohydrate ee caadiga ah — asaas u ah tababarka xoogga iyo awoodda.",
    },
    benefits: [
      CREATINE,
      {
        en: "Pure creatine monohydrate powder",
        so: "Budo creatine monohydrate ah oo saafi ah",
      },
      {
        en: "Easy to add to water, juice or protein shakes",
        so: "Si fudud loogu dari karo biyaha, casiirka ama shake-ga borotiinka",
      },
    ],
  },
  {
    slug: "creatine-monohydrate-icy-blue-razz",
    name: "Creatine Monohydrate — Icy Blue Razz",
    brand: "Applied Nutrition",
    aliases: ["Creatine Monohydrtae", "Juicy flavours"],
    category: "sports",
    images: ["creatine-monohydrate-icy-blue"],
    facts: "Micronised · Icy Blue Razz · 50 servings",
    description: {
      en: "Micronised creatine monohydrate with a juicy Icy Blue Razz flavour, from Applied Nutrition.",
      so: "Creatine monohydrate la jilciyay oo leh dhadhanka macaan ee Icy Blue Razz, kana yimid Applied Nutrition.",
    },
    benefits: [
      CREATINE,
      {
        en: "Juicy Icy Blue Razz flavour — 50 servings",
        so: "Dhadhan macaan oo Icy Blue Razz ah — 50 qaadasho",
      },
      {
        en: "Tested for athletes and approved by the Vegetarian Society",
        so: "Loo baaray ciyaartoyda, waxaana ansixiyay Vegetarian Society",
      },
    ],
  },
  {
    slug: "iso100-dunkin-glazed-donut",
    name: "ISO100 Dunkin' Glazed Donut Protein",
    brand: "Dymatize",
    aliases: ["Dunkin", "Protein tub", "Whey"],
    category: "sports",
    images: ["iso100-dunkin"],
    facts: "25 g protein · 5.5 g BCAAs · 910 g · 20 servings",
    featured: true,
    description: {
      en: "Dymatize ISO100 hydrolysed whey protein isolate in Dunkin' Glazed Donut flavour.",
      so: "Dymatize ISO100 — borotiin whey isolate ah oo la jajabiyay, leh dhadhanka Dunkin' Glazed Donut.",
    },
    benefits: [
      PROTEIN_MUSCLE,
      {
        en: "25 g of protein per serving from hydrolysed whey protein isolate",
        so: "25 g oo borotiin ah qaadasho kasta, oo ka yimid whey protein isolate la jajabiyay",
      },
      {
        en: "Dessert-style Dunkin' Glazed Donut flavour",
        so: "Dhadhan macmacaan u eg oo Dunkin' Glazed Donut ah",
      },
    ],
  },
  {
    slug: "gold-creatine",
    name: "Gold Creatine",
    brand: "Kevin Levrone",
    category: "sports",
    images: ["gold-creatine"],
    facts: "300 g · unflavoured",
    description: {
      en: "Unflavoured creatine powder from the Kevin Levrone Signature Series Gold Line.",
      so: "Budo creatine ah oo aan dhadhan lahayn oo ka tirsan Kevin Levrone Signature Series Gold Line.",
    },
    benefits: [
      CREATINE,
      {
        en: "Unflavoured powder for mixing and stacking",
        so: "Budo aan dhadhan lahayn oo lagu qasi karo kaabayaal kale",
      },
      {
        en: "Part of the Kevin Levrone Signature Series",
        so: "Qayb ka mid ah Kevin Levrone Signature Series",
      },
    ],
  },
  {
    slug: "l-citrulline",
    name: "L-Citrulline 750 mg",
    brand: "NOW",
    aliases: ["L- Citruline"],
    category: "sports",
    images: ["l-citrulline"],
    facts: "750 mg · 90 veg capsules",
    description: {
      en: "Free-form L-citrulline in 750 mg vegetarian capsules — a popular amino acid in sports nutrition.",
      so: "L-citrulline xor ah oo ku jira kaabsuul khudradeed oo 750 mg ah — amino acid caan ka ah nafaqada isboortiga.",
    },
    benefits: [
      {
        en: "Free-form L-citrulline, a naturally occurring amino acid",
        so: "L-citrulline xor ah, oo ah amino acid dabiici ahaan jira",
      },
      {
        en: "Involved in the body's urea cycle and protein metabolism, as labelled",
        so: "Wuxuu door ku leeyahay wareegga urea iyo dheef-shiidka borotiinka, sida ku qoran calaamadda",
      },
      VEG_CAPS,
    ],
  },
  {
    slug: "lean-mass-gainer",
    name: "Critical Mass Lean Mass Gainer",
    brand: "Applied Nutrition",
    aliases: ["Lean Mass Gainer", "Mass gainer"],
    category: "sports",
    images: ["lean-mass-gainer", "lean-mass-gainer-2", "lean-mass-gainer-3"],
    imageLabels: [
      { en: "Professional · Lean Mass Gainer", so: "Professional · Lean Mass Gainer" },
      { en: "Professional · Lean Mass Gainer", so: "Professional · Lean Mass Gainer" },
      { en: "Original · High Calorie Gainer", so: "Original · High Calorie Gainer" },
    ],
    facts: "6 kg · chocolate · Professional & Original",
    featured: true,
    description: {
      en: "Applied Nutrition Critical Mass in chocolate flavour — available as the Professional lean mass gainer or the Original high-calorie gainer.",
      so: "Applied Nutrition Critical Mass oo dhadhan shukulaato leh — waxaa la helaa nooca Professional (lean mass gainer) ama Original (high-calorie gainer).",
    },
    benefits: [
      PROTEIN_MUSCLE,
      {
        en: "Professional: 42 g protein and 566 kcal per serving, as labelled",
        so: "Professional: 42 g borotiin iyo 566 kcal qaadasho kasta, sida ku qoran calaamadda",
      },
      {
        en: "Helps meet higher calorie needs for those aiming to gain weight",
        so: "Wuxuu kaa caawiyaa buuxinta baahida kaloori ee sare haddii aad doonayso inaad miisaan kordhiso",
      },
    ],
  },
  {
    slug: "mass-tech-extreme-2000",
    name: "Mass-Tech Extreme 2000",
    brand: "MuscleTech",
    aliases: ["Mass Tech"],
    category: "sports",
    images: ["mass-tech"],
    facts: "Vanilla milkshake · 2.72 kg · 80 g protein",
    description: {
      en: "MuscleTech's high-protein mass gainer in vanilla milkshake flavour, with creatine and added vitamins & minerals.",
      so: "Miisaan-kordhiyaha borotiinka badan ee MuscleTech oo dhadhan vanilla milkshake leh, lagu daray creatine, fitamiinno iyo macdano.",
    },
    benefits: [
      PROTEIN_MUSCLE,
      {
        en: "High-calorie formula (2,350 kcal per serving, as labelled) for those aiming to gain weight",
        so: "Isku-dar kaloori badan (2,350 kcal qaadasho kasta, sida ku qoran) oo loogu talagalay kuwa doonaya inay miisaan kordhiyaan",
      },
      {
        en: "Includes 5 g creatine and 20 vitamins & minerals",
        so: "Waxaa ku jira 5 g creatine iyo 20 fitamiin & macdan",
      },
    ],
  },
  {
    slug: "c4-original-pre-workout",
    name: "C4 Original Pre-Workout",
    brand: "Cellucor",
    aliases: ["Neon Lime C4", "C4", "Pre-workout", "Icy Blue Raspberry"],
    category: "sports",
    images: ["c4-original"],
    facts: "Icy Blue Raspberry · 30 servings · 282 g",
    featured: true,
    description: {
      en: "C4 Original, one of the world's best-known pre-workouts, in Icy Blue Raspberry flavour.",
      so: "C4 Original, mid ka mid ah pre-workout-yada ugu caansan adduunka, oo dhadhan Icy Blue Raspberry leh.",
    },
    benefits: [
      {
        en: "Contains caffeine, which helps increase alertness",
        so: "Waxaa ku jira kafeyn, taas oo gacan ka geysata kordhinta feejignaanta",
      },
      {
        en: "Includes beta-alanine, a popular amino acid in sports nutrition",
        so: "Waxaa ku jira beta-alanine, amino acid caan ka ah nafaqada isboortiga",
      },
      {
        en: "Icy Blue Raspberry flavour — 30 servings per tub",
        so: "Dhadhan Icy Blue Raspberry ah — 30 qaadasho weelkiiba",
      },
    ],
    caution: CAFFEINE_CAUTION,
  },
  {
    slug: "platinum-creatine",
    name: "Platinum 100% Creatine",
    brand: "MuscleTech",
    aliases: ["Platinum Craetine"],
    category: "sports",
    images: ["platinum-creatine"],
    facts: "5 g per serving · 80 servings · 400 g · unflavoured",
    description: {
      en: "MuscleTech Platinum 100% creatine monohydrate — 5 g per serving, unflavoured.",
      so: "MuscleTech Platinum — creatine monohydrate 100% ah, 5 g qaadasho kasta, aan dhadhan lahayn.",
    },
    benefits: [
      CREATINE,
      {
        en: "5 g of creatine monohydrate per serving",
        so: "5 g oo creatine monohydrate ah qaadasho kasta",
      },
      {
        en: "80 servings of unflavoured powder",
        so: "80 qaadasho oo budo aan dhadhan lahayn ah",
      },
    ],
  },
  {
    slug: "usn-pure-creatine",
    name: "Pure Creatine Monohydrate",
    brand: "USN",
    aliases: ["Pure Creatine"],
    category: "sports",
    images: ["pure-creatine"],
    facts: "256 g · monohydrate powder",
    description: {
      en: "USN Pure Creatine monohydrate powder for strength and stamina training.",
      so: "Budada creatine monohydrate ee USN Pure, loogu talagalay tababarka xoogga iyo adkeysiga.",
    },
    benefits: [
      CREATINE,
      {
        en: "Pure creatine monohydrate powder, unflavoured",
        so: "Budo creatine monohydrate ah oo saafi ah, aan dhadhan lahayn",
      },
      {
        en: "Easy to add to water, juice or protein shakes",
        so: "Si fudud loogu dari karo biyaha, casiirka ama shake-ga borotiinka",
      },
    ],
  },

  /* =================== VITAMINS =================== */
  {
    slug: "b-complex",
    name: "BioActive Complete B-Complex",
    brand: "Life Extension",
    aliases: ["B complex", "Vitamin B"],
    category: "vitamins",
    images: ["b-complex"],
    facts: "60 vegetarian capsules",
    description: {
      en: "A complete B-complex with enzymatically active forms of the B vitamins.",
      so: "Isku-dar dhammaystiran oo fitamiinnada B ah, kuna jiraan qaababka firfircoon ee fitamiinnada B.",
    },
    benefits: [
      {
        en: "B vitamins contribute to normal energy-yielding metabolism",
        so: "Fitamiinnada B waxay gacan ka geystaan dheef-shiidka caadiga ah ee tamarta bixiya",
      },
      {
        en: "B vitamins contribute to the normal function of the nervous system",
        so: "Fitamiinnada B waxay gacan ka geystaan shaqada caadiga ah ee habdhiska dareemayaasha",
      },
      {
        en: "Contains enzymatically active forms of B vitamins",
        so: "Waxaa ku jira qaababka firfircoon ee fitamiinnada B",
      },
    ],
  },
  {
    slug: "vitamin-b12",
    name: "Vitamin B12 3000 mcg",
    brand: "Nature Made",
    aliases: ["B12"],
    category: "vitamins",
    images: ["b12"],
    facts: "3000 mcg · 60 softgels",
    description: {
      en: "Extra-strength vitamin B12 softgels from Nature Made.",
      so: "Kaabsuul jilicsan oo fitamiin B12 ah oo xoog badan, kana yimid Nature Made.",
    },
    benefits: [
      {
        en: "Vitamin B12 contributes to normal red blood cell formation",
        so: "Fitamiin B12 wuxuu gacan ka geystaa samaynta caadiga ah ee unugyada dhiigga cas",
      },
      {
        en: "Vitamin B12 contributes to normal energy-yielding metabolism",
        so: "Fitamiin B12 wuxuu gacan ka geystaa dheef-shiidka caadiga ah ee tamarta bixiya",
      },
      {
        en: "Vitamin B12 contributes to the reduction of tiredness and fatigue",
        so: "Fitamiin B12 wuxuu gacan ka geystaa yaraynta daalka iyo tabar-darrida",
      },
    ],
  },
  {
    slug: "c-1000",
    name: "C-1000 with Bioflavonoids",
    brand: "NOW",
    aliases: ["C1000", "Vitamin C"],
    category: "vitamins",
    images: ["c1000"],
    facts: "1000 mg · 100 mg bioflavonoids · 250 veg capsules",
    featured: true,
    description: {
      en: "1000 mg vitamin C with 100 mg citrus bioflavonoids, in vegetarian capsules.",
      so: "1000 mg fitamiin C ah oo lagu daray 100 mg bioflavonoids liin ah, ku jira kaabsuul khudradeed.",
    },
    benefits: [VITC_IMMUNE, VITC_OXIDATIVE, { en: "With 100 mg citrus bioflavonoids", so: "Waxaa lagu daray 100 mg bioflavonoids liin ah" }],
  },
  {
    slug: "cac-1000-plus",
    name: "CaC-1000 Plus Effervescent",
    brand: "GSK",
    aliases: ["CAAC1000 plus", "Calcium"],
    category: "vitamins",
    images: ["cac1000-plus"],
    facts: "Calcium + vitamins D3, C & B6 · orange · 10 tablets",
    description: {
      en: "Orange-flavoured effervescent tablets with double calcium plus vitamins D3, C and B6.",
      so: "Kiniinno biyaha lagu milo oo dhadhan liin-macaan leh, kana kooban kalsiyum labanlaab ah iyo fitamiinnada D3, C iyo B6.",
    },
    benefits: [
      {
        en: "Calcium is needed for the maintenance of normal bones and teeth",
        so: "Kalsiyumku waxaa loo baahan yahay ilaalinta lafo iyo ilko caadi ah",
      },
      {
        en: "Vitamin D contributes to the normal absorption of calcium",
        so: "Fitamiin D wuxuu gacan ka geystaa nuugista caadiga ah ee kalsiyumka",
      },
      VITC_IMMUNE,
    ],
  },
  {
    slug: "vitamin-d3-1000",
    name: "Vitamin D3 1000 IU",
    brand: "Nature's Bounty",
    aliases: ["D1", "D3"],
    category: "vitamins",
    images: ["d1"],
    facts: "25 mcg (1000 IU) · 120 softgels",
    description: {
      en: "Everyday vitamin D3, 25 mcg (1000 IU), in rapid-release softgels.",
      so: "Fitamiin D3 maalinle ah, 25 mcg (1000 IU), ku jira kaabsuul jilicsan oo si degdeg ah u furma.",
    },
    benefits: [
      VITD_BONES,
      VITD_IMMUNE,
      {
        en: "Vitamin D contributes to normal muscle function",
        so: "Fitamiin D wuxuu gacan ka geystaa shaqada caadiga ah ee murqaha",
      },
    ],
  },
  {
    slug: "fertil-rx",
    name: "Fertil-Rx",
    brand: "Fertility Lab",
    aliases: ["Fertil Rx"],
    category: "vitamins",
    images: ["fertil-rx"],
    facts: "60 capsules · men",
    description: {
      en: "A men's fertility support supplement by Fertility Lab. Full ingredient details are being verified — please speak with our consultants before use.",
      so: "Kaab cunto oo loogu talagalay taageerada bacriminta ragga, kana yimid Fertility Lab. Faahfaahinta walxaha waa la hubinayaa — fadlan la hadal la-taliyayaashayada ka hor isticmaalka.",
    },
    benefits: null,
  },
  {
    slug: "natures-bounty-vitamin-c-1000",
    name: "Vitamin C 1000 mg with Rose Hips",
    brand: "Nature's Bounty",
    aliases: ["Natures Bounty"],
    category: "vitamins",
    images: ["natures-bounty-c"],
    facts: "1000 mg · 100 coated tablets",
    description: {
      en: "Nature's Bounty vitamin C 1000 mg with rose hips, in rapid-release coated tablets.",
      so: "Fitamiin C 1000 mg ah oo Nature's Bounty ah, lagu daray rose hips, ku jira kiniin dahaaran oo si degdeg ah u furma.",
    },
    benefits: [VITC_IMMUNE, VITC_OXIDATIVE, VITC_COLLAGEN],
  },
  {
    slug: "ova-rx",
    name: "Ova-Rx",
    brand: "Fertility Lab",
    aliases: ["OVA RX"],
    category: "vitamins",
    images: ["ova-rx"],
    facts: "60 tablets · women",
    description: {
      en: "A women's fertility support supplement by Fertility Lab. Full ingredient details are being verified — please speak with our consultants before use.",
      so: "Kaab cunto oo loogu talagalay taageerada bacriminta haweenka, kana yimid Fertility Lab. Faahfaahinta walxaha waa la hubinayaa — fadlan la hadal la-taliyayaashayada ka hor isticmaalka.",
    },
    benefits: null,
  },
  {
    slug: "vitamin-d3-5000",
    name: "Vitamin D3 5,000 IU",
    brand: "NOW",
    aliases: ["Vitamin D3"],
    category: "vitamins",
    images: ["vitamin-d3"],
    facts: "High potency · 5,000 IU · 30 softgels",
    description: {
      en: "High-potency vitamin D3, 5,000 IU, in small softgels.",
      so: "Fitamiin D3 awood sare leh, 5,000 IU, ku jira kaabsuul jilicsan oo yaryar.",
    },
    benefits: [VITD_BONES, VITD_IMMUNE, { en: "Vitamin D contributes to normal muscle function", so: "Fitamiin D wuxuu gacan ka geystaa shaqada caadiga ah ee murqaha" }],
    caution: {
      en: "High-potency dose — use as advised by a healthcare professional.",
      so: "Qiyaas awood sare leh — u isticmaal sida uu kugula taliyo xirfadle caafimaad.",
    },
  },
];

/* ---------- Helpers ---------- */
export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function productsIn(category: CategoryId, subcategory?: SubcategoryId) {
  return products.filter(
    (p) => p.category === category && (!subcategory || p.subcategory === subcategory),
  );
}

export function searchProducts(list: Product[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter((p) =>
    [p.name, p.nameSo, p.brand, ...(p.aliases ?? [])]
      .filter(Boolean)
      .some((s) => s!.toLowerCase().includes(q)),
  );
}

export function displayName(p: Product, lang: "en" | "so") {
  return lang === "so" && p.nameSo ? p.nameSo : p.name;
}
