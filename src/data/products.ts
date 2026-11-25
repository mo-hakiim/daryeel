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

const CALCIUM_BONES: Localized = {
  en: "Calcium is needed for the maintenance of normal bones",
  so: "Kaalshiyamku waxaa loo baahan yahay ilaalinta lafo caadi ah",
};
const B12_ENERGY: Localized = {
  en: "Vitamin B12 contributes to normal energy-yielding metabolism",
  so: "Fitamiin B12 wuxuu gacan ka geystaa dheef-shiidka caadiga ah ee tamarta dhaliya",
};
const B12_NERVOUS: Localized = {
  en: "Vitamin B12 contributes to the normal function of the nervous system",
  so: "Fitamiin B12 wuxuu gacan ka geystaa shaqada caadiga ah ee habdhiska dareemayaasha",
};
const ESSENTIAL_OIL_CAUTION: Localized = {
  en: "Concentrated essential oil — dilute with a carrier oil before applying to skin. Keep away from eyes and children. Do not swallow.",
  so: "Saliid udgoon oo xoog leh — ku qas saliid kale ka hor inta aadan maqaarka marin. Ka ilaali indhaha iyo carruurta. Ha liqin.",
};
const EXTERNAL_USE: Localized = {
  en: "For external use only.",
  so: "Dibadda jirka oo keliya ayaa loo isticmaalaa.",
};
const ASK_FORMS: Localized = {
  en: "Ask our team on WhatsApp for the forms currently in stock.",
  so: "Kooxdayada WhatsApp ku weydii qaababka hadda kaydka ku jira.",
};

export const products: Product[] = [
  /* =================== HERBAL PRODUCTS — GENERAL =================== */
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
    slug: "aloe-vera",
    name: "Aloe Vera (Aloe barbadensis)",
    nameSo: "Dacar (Aloe Vera)",
    aliases: ["Aloe barbadensis", "Dacar", "Aloe"],
    category: "herbal",
    subcategory: "general",
    images: ["aloe-vera"],
    description: {
      en: `Aloe vera (Aloe barbadensis) — a succulent plant whose cooling inner-leaf gel is a classic of natural skin care. ${ASK_FORMS.en}`,
      so: `Dacar (Aloe barbadensis) — geed caleemo buuran leh oo jel-ka qabow ee caleentiisa gudaha uu yahay mid caan ku ah daryeelka dabiiciga ah ee maqaarka. ${ASK_FORMS.so}`,
    },
    benefits: [
      {
        en: "The inner-leaf gel has long been used to soothe and cool the skin",
        so: "Jel-ka caleenta gudaheeda muddo dheer ayaa loo isticmaalay dejinta iyo qaboojinta maqaarka",
      },
      {
        en: "A traditional ingredient for moisturising skin and hair care",
        so: "Walax dhaqameed oo loo isticmaalo qoynta maqaarka iyo daryeelka timaha",
      },
      {
        en: "Widely grown and used across the Horn of Africa and Arabia",
        so: "Si ballaaran ayaa loogu beeraa loona isticmaalaa Geeska Afrika iyo Carabta",
      },
    ],
    caution: EXTERNAL_USE,
  },
  {
    slug: "neem",
    name: "Neem (Azadirachta indica)",
    nameSo: "Neem (Azadirachta indica)",
    aliases: ["Azadirachta indica", "Nim", "Geed Hindi"],
    category: "herbal",
    subcategory: "general",
    images: ["neem"],
    description: {
      en: `Neem (Azadirachta indica) — a hardy evergreen tree whose leaves and twigs have been used in traditional practice for centuries. ${ASK_FORMS.en}`,
      so: `Neem (Azadirachta indica) — geed adag oo had iyo jeer cagaar ah, kaas oo caleemihiisa iyo laamihiisa qarniyo loo isticmaalayay dhaqan ahaan. ${ASK_FORMS.so}`,
    },
    benefits: [
      {
        en: "Used for centuries in traditional Ayurvedic practice",
        so: "Qarniyo badan ayaa loo isticmaalayay dhaqanka Ayurveda",
      },
      {
        en: "Leaves are traditionally used in natural skin and hair care",
        so: "Caleemaha dhaqan ahaan waxaa loo isticmaalaa daryeelka dabiiciga ah ee maqaarka iyo timaha",
      },
      {
        en: "Twigs are a traditional natural chewing stick for cleaning teeth",
        so: "Laamaha waa caday dabiici ah oo dhaqan ahaan ilkaha lagu nadiifiyo",
      },
    ],
    caution: {
      en: "Not for use during pregnancy or by young children. Ask a healthcare professional before taking neem internally.",
      so: "Looma isticmaalo xilliga uurka ama carruurta yaryar. Weydii xirfadle caafimaad ka hor inta aadan neem afka ka qaadan.",
    },
  },
  {
    slug: "senna",
    name: "Senna (Senna alexandrina)",
    nameSo: "Sanaa Makki (Senna)",
    aliases: ["Senna alexandrina", "Sana Makki", "Sanaa Makki", "Cassia"],
    category: "herbal",
    subcategory: "general",
    images: ["senna"],
    description: {
      en: `Senna (Senna alexandrina), known as Sanaa Makki — a well-known traditional herb from Arabia and the Horn of Africa. ${ASK_FORMS.en}`,
      so: `Senna (Senna alexandrina), oo loo yaqaan Sanaa Makki — geed dhaqameed caan ah oo laga helo Carabta iyo Geeska Afrika. ${ASK_FORMS.so}`,
    },
    benefits: [
      {
        en: "Well established for short-term relief of occasional constipation",
        so: "Si wanaagsan loo yaqaan oo loo isticmaalo muddo gaaban si loo yareeyo calool-fadhiga mararka qaar",
      },
      {
        en: "Leaves and pods naturally contain compounds called sennosides",
        so: "Caleemaha iyo qolofta si dabiici ah waxay ka kooban yihiin walxo la yiraahdo sennosides",
      },
      {
        en: "Long used in traditional Arabian and Prophetic medicine",
        so: "Muddo dheer ayaa loo isticmaalay daawada dhaqameed ee Carabta iyo Daawada Nabiga (Tibb Nabawi)",
      },
    ],
    caution: {
      en: "Short-term use only — no more than one week without medical advice. Not for children under 12, during pregnancy or breastfeeding, or with abdominal pain.",
      so: "Muddo gaaban oo keliya — ha dhaafin hal toddobaad la'aanta talo caafimaad. Looma isticmaalo carruurta ka yar 12 sano, xilliga uurka ama naas-nuujinta, ama marka calooshu xanuunayso.",
    },
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

  {
    slug: "ceylon-cinnamon",
    name: "Ceylon Cinnamon (Cinnamomum verum)",
    nameSo: "Qorfe (Ceylon Cinnamon)",
    aliases: ["Cinnamomum verum", "Qorfe", "Cinnamon", "Darasiin"],
    category: "herbal",
    subcategory: "ingredients",
    images: ["ceylon-cinnamon"],
    description: {
      en: `Ceylon or "true" cinnamon (Cinnamomum verum) — fragrant quills with a delicate, sweet aroma. ${ASK_FORMS.en}`,
      so: `Qorfe Ceylon ama qorfaha "dhabta ah" (Cinnamomum verum) — xabbado udgoon oo leh ur macaan oo jilicsan. ${ASK_FORMS.so}`,
    },
    benefits: [
      {
        en: "True Ceylon cinnamon with a delicate, sweet aroma",
        so: "Qorfe Ceylon ah oo dhab ah, leh ur macaan oo jilicsan",
      },
      {
        en: "Naturally lower in coumarin than common cassia cinnamon",
        so: "Si dabiici ah coumarin-keedu wuu ka yar yahay qorfaha caadiga ah ee cassia",
      },
      {
        en: "A classic spice for shaah, rice and traditional Somali dishes",
        so: "Xawaash caan ah oo loogu talagalay shaaha, bariiska iyo cuntooyinka dhaqameed ee Soomaalida",
      },
    ],
  },
  {
    slug: "coconut",
    name: "Coconut (Cocos nucifera)",
    nameSo: "Qumbe (Coconut)",
    aliases: ["Cocos nucifera", "Qumbe", "Coconut"],
    category: "herbal",
    subcategory: "ingredients",
    images: ["coconut"],
    description: {
      en: `Coconut (Cocos nucifera) — the versatile tropical palm behind coconut oil, milk and water. ${ASK_FORMS.en}`,
      so: `Qumbe (Cocos nucifera) — geed timireed kulaal ah oo laga helo saliidda, caanaha iyo biyaha qumbaha. ${ASK_FORMS.so}`,
    },
    benefits: null,
  },
  {
    slug: "turmeric-root",
    name: "Turmeric Root (Curcuma longa)",
    nameSo: "Huruud (Turmeric)",
    aliases: ["Curcuma longa", "Huruud", "Turmeric", "Kurkum"],
    category: "herbal",
    subcategory: "ingredients",
    images: ["turmeric-root"],
    description: {
      en: `Turmeric (Curcuma longa) — the golden root and spice prized in kitchens and traditional practice across Asia and Africa. ${ASK_FORMS.en}`,
      so: `Huruud (Curcuma longa) — xidid iyo xawaash dahabi ah oo qiimo weyn ku leh jikada iyo dhaqanka Aasiya iyo Afrika. ${ASK_FORMS.so}`,
    },
    benefits: [
      {
        en: "Golden spice that naturally contains curcumin",
        so: "Xawaash dahabi ah oo si dabiici ah uga kooban curcumin",
      },
      {
        en: "Used for thousands of years in traditional Ayurvedic practice",
        so: "Kumanaan sano ayaa loo isticmaalayay dhaqanka Ayurveda",
      },
      {
        en: "Adds warm colour and flavour to rice, stews and tea",
        so: "Bariiska, maraqa iyo shaaha wuxuu siiyaa midab iyo dhadhan diiran",
      },
    ],
  },
  {
    slug: "moringa",
    name: "Moringa (Moringa oleifera)",
    nameSo: "Moringa (Moringa oleifera)",
    aliases: ["Moringa oleifera", "Drumstick tree", "Mooringa"],
    category: "herbal",
    subcategory: "ingredients",
    images: ["moringa"],
    description: {
      en: `Moringa (Moringa oleifera), the "drumstick tree" — its small green leaves are a traditional, nutrient-rich food. ${ASK_FORMS.en}`,
      so: `Moringa (Moringa oleifera), oo loo yaqaan "drumstick tree" — caleemaheeda yaryar ee cagaarka ah waa cunto dhaqameed hodan ku ah nafaqo. ${ASK_FORMS.so}`,
    },
    benefits: [
      {
        en: "Leaves naturally contain vitamins and minerals such as vitamin C, calcium and iron",
        so: "Caleemaha si dabiici ah waxay ka kooban yihiin fitamiinno iyo macdano sida fitamiin C, kaalshiyam iyo bir",
      },
      {
        en: "Widely grown across East Africa and South Asia",
        so: "Si ballaaran ayaa looga beeraa Bariga Afrika iyo Koonfurta Aasiya",
      },
      {
        en: "Dried leaves can be added to tea, food or smoothies",
        so: "Caleemaha la qalajiyay waxaa lagu dari karaa shaaha, cuntada ama cabitaannada",
      },
    ],
  },
  {
    slug: "rumi-mastagi",
    name: "Rumi Mastagi (Mastic Gum)",
    nameSo: "Rumi Mastagi (Xabagta Mastic)",
    brand: "Kamphal",
    aliases: ["Mastic gum", "Rumi mastagi", "Mastika", "Mastiki"],
    category: "herbal",
    subcategory: "ingredients",
    images: ["rumi-mastic-gum"],
    facts: "10 g",
    description: {
      en: "Rumi Mastagi — natural mastic gum resin from the mastic tree, packed by Kamphal for digestive wellness.",
      so: "Rumi Mastagi — xabag dabiici ah oo laga helo geedka mastic, oo ay Kamphal u baakadaysay caafimaadka dheefshiidka.",
    },
    benefits: [
      {
        en: "Natural resin from the mastic tree (Pistacia lentiscus)",
        so: "Xabag dabiici ah oo ka timaada geedka mastic (Pistacia lentiscus)",
      },
      {
        en: "Traditionally chewed to freshen the breath",
        so: "Dhaqan ahaan waa la calaliyaa si afka loogu udgoonsiiyo",
      },
      {
        en: "Long used in Middle Eastern and South Asian tradition for digestive wellness",
        so: "Muddo dheer ayaa loo isticmaalay dhaqanka Bariga Dhexe iyo Koonfurta Aasiya ee caafimaadka dheefshiidka",
      },
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

  {
    slug: "argan-oil",
    name: "Argan Oil",
    nameSo: "Saliidda Argan",
    brand: "Pure&Co",
    category: "herbal",
    subcategory: "oils",
    images: ["argan-oil"],
    facts: "1 litre · cosmetic grade · 100% natural",
    description: {
      en: "Pure&Co cosmetic-grade argan oil, 100% natural and vegan, in a generous 1-litre bottle for hair, skin and nails.",
      so: "Saliidda argan ee Pure&Co oo heer qurxin ah, 100% dabiici ah oo vegan ah, ku jirta dhalo weyn oo 1 litir ah oo loogu talagalay timaha, maqaarka iyo ciddiyaha.",
    },
    benefits: [
      {
        en: "Naturally rich in vitamin E and essential fatty acids",
        so: "Si dabiici ah hodan ugu ah fitamiin E iyo asiidhyada dufanka muhiimka ah",
      },
      {
        en: "Conditions dry hair and adds shine",
        so: "Waxay qoysaa timaha qalalan oo dhalaal siisaa",
      },
      {
        en: "Softens and moisturises skin and nails",
        so: "Waxay jilcisaa oo qoysaa maqaarka iyo ciddiyaha",
      },
    ],
    caution: EXTERNAL_USE,
  },
  {
    slug: "castor-oil",
    name: "Organic Castor Oil",
    nameSo: "Saliidda Castor (Cayo)",
    brand: "Handcraft Blends",
    aliases: ["Castor oil", "Custor oil", "Ricinus communis"],
    category: "herbal",
    subcategory: "oils",
    images: ["castor-oil", "castor-plant"],
    imageLabels: [
      { en: "Handcraft Blends Organic Castor Oil", so: "Handcraft Blends Organic Castor Oil" },
      { en: "The castor plant (Ricinus communis)", so: "Geedka castor (Ricinus communis)" },
    ],
    facts: "473 ml (16 fl oz) · USDA organic · hair, nails & skin",
    description: {
      en: "USDA-certified organic castor oil from Handcraft Blends — 100% pure and natural, pressed from the seeds of the castor plant (Ricinus communis).",
      so: "Saliidda castor ee organic-ga ah ee Handcraft Blends, oo ay USDA aqoonsatay — 100% saafi iyo dabiici ah, laga tuujiyay iniinta geedka castor (Ricinus communis).",
    },
    benefits: [
      {
        en: "USDA-certified organic, 100% pure castor oil, as labelled",
        so: "Saliid castor organic ah oo USDA aqoonsatay, 100% saafi ah, sida ku qoran calaamadda",
      },
      {
        en: "Thick, rich oil traditionally used to condition hair, brows and lashes",
        so: "Saliid culus oo qani ah, dhaqan ahaan loo isticmaalo qoynta timaha, sunnaha iyo baalasha indhaha",
      },
      {
        en: "Moisturises dry skin and nails",
        so: "Waxay qoysaa maqaarka iyo ciddiyaha qalalan",
      },
    ],
    caution: EXTERNAL_USE,
  },
  {
    slug: "avocado-oil",
    name: "Avocado Oil",
    nameSo: "Saliidda Avocado",
    brand: "Sanoor",
    category: "herbal",
    subcategory: "oils",
    images: ["avocado-oil"],
    facts: "60 ml · cold-pressed · 100% pure",
    description: {
      en: "Sanoor cold-pressed avocado oil made from California Hass avocados — a light, nourishing oil for face, body and hair.",
      so: "Saliidda avocado ee Sanoor oo tuujin qabow ah, laga sameeyay avocado-ga Hass ee California — saliid fudud oo nafaqo leh oo loogu talagalay wejiga, jirka iyo timaha.",
    },
    benefits: [
      {
        en: "Cold-pressed from Hass avocados, as labelled",
        so: "Tuujin qabow oo laga sameeyay avocado Hass, sida ku qoran calaamadda",
      },
      {
        en: "Naturally rich in oleic acid and vitamin E",
        so: "Si dabiici ah hodan ugu ah oleic acid iyo fitamiin E",
      },
      {
        en: "Light enough for face, body and hair care",
        so: "Waa fudud tahay oo ku habboon daryeelka wejiga, jirka iyo timaha",
      },
    ],
    caution: EXTERNAL_USE,
  },
  {
    slug: "sesame-oil",
    name: "Organic Sesame Oil",
    nameSo: "Saliidda Macsarka (Sesame)",
    brand: "GymBeam",
    aliases: ["Sesame oil", "Bio sesame oil", "Saliid macsar", "Simsim"],
    category: "herbal",
    subcategory: "oils",
    images: ["sesame-oil"],
    facts: "Organic (BIO) · cold-pressed",
    description: {
      en: "GymBeam BIO sesame oil — certified organic and cold-pressed, for cooking and traditional skin and hair care.",
      so: "Saliidda sesame-ka ee GymBeam BIO — organic la aqoonsaday oo tuujin qabow ah, loogu talagalay karinta iyo daryeelka dhaqameed ee maqaarka iyo timaha.",
    },
    benefits: [
      {
        en: "Certified organic, cold-pressed sesame oil, as labelled",
        so: "Saliid sesame organic ah oo tuujin qabow ah, sida ku qoran calaamadda",
      },
      {
        en: "Naturally rich in unsaturated fats",
        so: "Si dabiici ah hodan ugu ah dufanka aan buuxsamin (unsaturated)",
      },
      {
        en: "For cooking, or traditional skin and hair care",
        so: "Loogu talagalay karinta, ama daryeelka dhaqameed ee maqaarka iyo timaha",
      },
    ],
  },
  {
    slug: "evening-primrose-oil",
    name: "Evening Primrose Oil",
    nameSo: "Saliidda Evening Primrose",
    brand: "GymBeam",
    category: "herbal",
    subcategory: "oils",
    images: ["evening-primrose-oil"],
    facts: "Softgel capsules",
    description: {
      en: "GymBeam evening primrose oil in easy softgel capsules — formulated for women's health support and healthy skin and hair, as labelled.",
      so: "Saliidda evening primrose ee GymBeam oo ku jirta kaabsuul jilicsan oo fudud — loogu talagalay taageerada caafimaadka haweenka iyo maqaarka iyo timaha caafimaadka qaba, sida ku qoran calaamadda.",
    },
    benefits: [
      {
        en: "Natural source of gamma-linolenic acid (GLA), an omega-6 fatty acid",
        so: "Il dabiici ah oo gamma-linolenic acid (GLA) ah, kaas oo ah asiidh dufan omega-6 ah",
      },
      {
        en: "Formulated for women's health support, as labelled",
        so: "Loogu talagalay taageerada caafimaadka haweenka, sida ku qoran calaamadda",
      },
      {
        en: "Easy-to-take softgel capsules",
        so: "Kaabsuul jilicsan oo si fudud loo qaato",
      },
    ],
  },
  {
    slug: "clove-oil",
    name: "Clove Essential Oil",
    nameSo: "Saliidda Qaranfuulka",
    aliases: ["Clove oil", "Qaranfuul oil", "Eugenol"],
    category: "herbal",
    subcategory: "oils",
    images: ["clove-oil"],
    facts: "30 ml · 99% eugenol",
    description: {
      en: "Clove essential oil with 99% eugenol, as labelled — a warm, spicy oil distilled from clove buds.",
      so: "Saliid udgoon oo qaranfuul ah oo leh 99% eugenol, sida ku qoran calaamadda — saliid diiran oo xawaash leh oo laga soo saaray ubaxa qaranfuulka.",
    },
    benefits: [
      {
        en: "Rich in eugenol, clove's natural aromatic compound",
        so: "Hodan ku ah eugenol, walaxda udgoon ee dabiiciga ah ee qaranfuulka",
      },
      {
        en: "Traditionally used in dental care for its warming, numbing feel",
        so: "Dhaqan ahaan waxaa loo isticmaalaa daryeelka ilkaha sababtoo ah dareenkeeda diiran ee kabuubyada leh",
      },
      {
        en: "Warm, spicy aroma for aromatherapy",
        so: "Ur diiran oo xawaash leh oo loogu talagalay daaweynta urta (aromatherapy)",
      },
    ],
    caution: ESSENTIAL_OIL_CAUTION,
  },
  {
    slug: "ginger-oil",
    name: "Ginger Essential Oil",
    nameSo: "Saliidda Sinjibiilka",
    aliases: ["Ginger oil", "Sinjibiil", "Zingiber officinale"],
    category: "herbal",
    subcategory: "oils",
    images: ["ginger-oil"],
    description: {
      en: "Ginger essential oil, distilled from the root of the ginger plant (Zingiber officinale) — warm, spicy and invigorating.",
      so: "Saliid udgoon oo sinjibiil ah, laga soo saaray xididka geedka sinjibiilka (Zingiber officinale) — diiran, xawaash leh oo firfircooni leh.",
    },
    benefits: [
      {
        en: "Distilled from the ginger root (Zingiber officinale)",
        so: "Laga soo saaray xididka sinjibiilka (Zingiber officinale)",
      },
      {
        en: "Popular in warming massage blends when diluted",
        so: "Caan ka ah isku-darka duugista ee diirran marka la khafiifiyo",
      },
      {
        en: "Warm, spicy aroma traditionally used in aromatherapy",
        so: "Ur diiran oo xawaash leh oo dhaqan ahaan loo isticmaalo daaweynta urta",
      },
    ],
    caution: ESSENTIAL_OIL_CAUTION,
  },
  {
    slug: "myrrh-oil",
    name: "Myrrh Essential Oil (Commiphora myrrha)",
    nameSo: "Saliidda Malmalka (Myrrh)",
    aliases: ["Myrrh", "Malmal", "Commiphora myrrha"],
    category: "herbal",
    subcategory: "oils",
    images: ["myrrh-oil"],
    description: {
      en: "Myrrh essential oil from Commiphora myrrha resin — the classic aromatic resin of Somalia and the Horn of Africa.",
      so: "Saliid udgoon oo malmal ah oo laga helo xabagta Commiphora myrrha — xabagta udgoon ee caanka ah ee Soomaaliya iyo Geeska Afrika.",
    },
    benefits: [
      {
        en: "Distilled from myrrh resin, a traditional product of Somalia and the Horn of Africa",
        so: "Laga soo saaray xabagta malmalka, oo ah wax-soo-saar dhaqameed oo Soomaaliya iyo Geeska Afrika ah",
      },
      {
        en: "Used since ancient times in perfumes, incense and skin care",
        so: "Tan iyo waqtiyadii hore ayaa loo isticmaalayay cadarrada, uunsiga iyo daryeelka maqaarka",
      },
      {
        en: "Rich, warm, earthy aroma for aromatherapy",
        so: "Ur qani ah, diiran oo ciid u eg oo loogu talagalay daaweynta urta",
      },
    ],
    caution: ESSENTIAL_OIL_CAUTION,
  },
  {
    slug: "carrot-seed-oil",
    name: "Carrot Seed Essential Oil",
    nameSo: "Saliidda Iniinta Karootada",
    brand: "Sameera",
    aliases: ["Carrot seed oil", "Daucus carota"],
    category: "herbal",
    subcategory: "oils",
    images: ["carrot-seed-oil"],
    facts: "15 ml · 100% pure & natural",
    description: {
      en: "Sameera carrot seed essential oil — 100% pure and natural, distilled from the seeds of the wild carrot.",
      so: "Saliidda udgoon ee iniinta karootada ee Sameera — 100% saafi iyo dabiici ah, laga soo saaray iniinta karootada duurka.",
    },
    benefits: [
      {
        en: "Distilled from wild carrot seeds (Daucus carota)",
        so: "Laga soo saaray iniinta karootada duurka (Daucus carota)",
      },
      {
        en: "Popular in natural skin-care blends when diluted",
        so: "Caan ka ah isku-darka dabiiciga ah ee daryeelka maqaarka marka la khafiifiyo",
      },
      {
        en: "Warm, earthy aroma for aromatherapy",
        so: "Ur diiran oo ciid u eg oo loogu talagalay daaweynta urta",
      },
    ],
    caution: ESSENTIAL_OIL_CAUTION,
  },
  {
    slug: "rosemary-essential-oil",
    name: "Rosemary Essential Oil",
    nameSo: "Saliidda Udgoon ee Rosemary",
    aliases: ["Rosmery oil", "Rosemary oil"],
    category: "herbal",
    subcategory: "oils",
    images: ["rosemary-essential-oil"],
    facts: "60 ml (2.02 fl oz) · steam distilled · 100% pure",
    description: {
      en: "Steam-distilled, 100% pure rosemary essential oil with a dropper, made for hair-growth and scalp-care routines, as labelled.",
      so: "Saliid udgoon oo rosemary ah oo 100% saafi ah, la uumi-sifeeyay, leh dhibcis, loogu talagalay daryeelka korriinka timaha iyo maqaarka madaxa, sida ku qoran calaamadda.",
    },
    benefits: [
      {
        en: "Steam-distilled, 100% pure rosemary essential oil, as labelled",
        so: "Saliid udgoon oo rosemary ah, la uumi-sifeeyay, 100% saafi ah, sida ku qoran calaamadda",
      },
      {
        en: "Popular for scalp massage in hair-care routines when diluted",
        so: "Caan u ah duugista maqaarka madaxa ee daryeelka timaha marka la khafiifiyo",
      },
      {
        en: "Fresh, herbal aroma for aromatherapy",
        so: "Ur cusub oo dhireed ah oo loogu talagalay daaweynta urta",
      },
    ],
    caution: ESSENTIAL_OIL_CAUTION,
  },
  {
    slug: "black-seed-oil",
    name: "Black Seed Oil (Nigella sativa)",
    nameSo: "Saliidda Xabbad Sooda",
    brand: "Herbal Goodness",
    aliases: ["Black seed oil", "Nigella sativa", "Xabbad Sooda", "Habbat al-Sawda"],
    category: "herbal",
    subcategory: "oils",
    images: ["black-seed-oil", "nigella-sativa-flower"],
    imageLabels: [
      { en: "Herbal Goodness Black Seed Oil", so: "Herbal Goodness Black Seed Oil" },
      { en: "The black seed flower (Nigella sativa)", so: "Ubaxa xabbad sooda (Nigella sativa)" },
    ],
    facts: "240 ml (8 fl oz)",
    description: {
      en: "Herbal Goodness black seed oil from Nigella sativa — the black seed treasured in Somali homes and Prophetic medicine.",
      so: "Saliidda xabbad sooda ee Herbal Goodness oo laga helo Nigella sativa — iniinta madow ee qiimaha weyn ku leh guryaha Soomaalida iyo Daawada Nabiga.",
    },
    benefits: [
      {
        en: "Pressed from the seeds of Nigella sativa (black seed)",
        so: "Laga tuujiyay iniinta Nigella sativa (xabbad sooda)",
      },
      {
        en: "Naturally contains thymoquinone, black seed's key compound",
        so: "Si dabiici ah waxay ka kooban tahay thymoquinone, walaxda ugu muhiimsan xabbad sooda",
      },
      {
        en: "Valued in Prophetic medicine and Somali households for generations",
        so: "Qiimo weyn ayay ku leedahay Daawada Nabiga iyo guryaha Soomaalida jiilal badan",
      },
    ],
  },
  {
    slug: "tea-tree-oil",
    name: "Tea Tree Oil",
    nameSo: "Saliidda Tea Tree",
    brand: "Spring Valley",
    aliases: ["Tea tree", "Melaleuca alternifolia"],
    category: "herbal",
    subcategory: "oils",
    images: ["tea-tree-oil"],
    facts: "60 ml (2 fl oz) · 100% pure · skin health",
    description: {
      en: "Spring Valley 100% pure tea tree oil, derived from the Melaleuca alternifolia tree, made for skin-health routines as labelled.",
      so: "Saliidda tea tree ee Spring Valley oo 100% saafi ah, laga soo saaray geedka Melaleuca alternifolia, loogu talagalay daryeelka caafimaadka maqaarka sida ku qoran calaamadda.",
    },
    benefits: [
      {
        en: "100% pure tea tree oil from Melaleuca alternifolia, as labelled",
        so: "Saliid tea tree oo 100% saafi ah oo ka timid Melaleuca alternifolia, sida ku qoran calaamadda",
      },
      {
        en: "Formulated for skin health — dilute before applying, as directed",
        so: "Loogu talagalay caafimaadka maqaarka — khafiifi ka hor inta aadan marin, sida lagu tilmaamay",
      },
      {
        en: "Fresh, clean aroma for aromatherapy",
        so: "Ur cusub oo nadiif ah oo loogu talagalay daaweynta urta",
      },
    ],
    caution: ESSENTIAL_OIL_CAUTION,
  },

  /* =================== DIETARY SUPPLEMENTS (formerly Minerals) =================== */
  {
    slug: "ashwagandha-gummies",
    name: "Ashwagandha Gummies",
    brand: "New Leaf",
    category: "supplements",
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
    slug: "fenugreek",
    name: "Fenugreek",
    nameSo: "Xulbad (Fenugreek)",
    brand: "NOW",
    aliases: ["Fengruuk", "Xulbad", "Hulbad"],
    category: "supplements",
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
    category: "supplements",
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
    category: "supplements",
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
    category: "supplements",
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
    category: "supplements",
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
  {
    slug: "collagen-beauty-gummies",
    name: "Collagen Beauty Gummies",
    nameSo: "Kolajin (Collagen) Gummies",
    brand: "New Leaf",
    category: "supplements",
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
    category: "supplements",
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
    category: "supplements",
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
    category: "supplements",
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
    category: "supplements",
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
    category: "supplements",
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
    category: "supplements",
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

  {
    slug: "d-mannose",
    name: "D-Mannose 500 mg",
    brand: "NOW",
    aliases: ["Mannose", "Urinary support"],
    category: "supplements",
    images: ["d-mannose"],
    facts: "500 mg · 60 veg capsules",
    description: {
      en: "D-mannose, a naturally occurring simple sugar, in 500 mg vegetarian capsules — formulated by NOW for urinary tract support.",
      so: "D-mannose, oo ah sonkor fudud oo dabiici ahaan jirta, ku jirta kaabsuul khudradeed oo 500 mg ah — NOW waxay u samaysay taageerada kanaalka kaadida.",
    },
    benefits: [
      {
        en: "Formulated for urinary tract support, as labelled by the manufacturer",
        so: "Loogu talagalay taageerada kanaalka kaadida, sida ay shirkaddu ku qortay calaamadda",
      },
      {
        en: "D-mannose is a simple sugar found naturally in fruits such as cranberries",
        so: "D-mannose waa sonkor fudud oo si dabiici ah looga helo miraha sida cranberry",
      },
      VEG_CAPS,
    ],
    caution: {
      en: "Not a substitute for medical treatment. If you have symptoms of a urinary infection, see a doctor.",
      so: "Ma beddelo daaweyn caafimaad. Haddii aad qabto calaamado caabuq kaadi, dhakhtar u tag.",
    },
  },
  {
    slug: "probiotic-acidophilus",
    name: "Probiotic Acidophilus",
    brand: "Earth's Creation",
    aliases: ["Acidophilus", "Probiotic"],
    category: "supplements",
    images: ["probiotic-acidophilus"],
    facts: "500 million per serving · 60 capsules",
    description: {
      en: "Earth's Creation Probiotic Acidophilus — Lactobacillus acidophilus in delayed-release capsules for digestive support, as labelled.",
      so: "Earth's Creation Probiotic Acidophilus — Lactobacillus acidophilus ku jira kaabsuul si tartiib ah u furma, loogu talagalay taageerada dheefshiidka, sida ku qoran calaamadda.",
    },
    benefits: [
      {
        en: "500 million Lactobacillus acidophilus per serving, as labelled",
        so: "500 milyan oo Lactobacillus acidophilus ah qaadasho kasta, sida ku qoran calaamadda",
      },
      {
        en: "Delayed-release capsules designed for absorption in the intestine, as stated by the manufacturer",
        so: "Kaabsuul si tartiib ah u furma oo loogu talagalay in mindhicirka lagu nuugo, sida ay shirkaddu sheegtay",
      },
      {
        en: "Formulated to help balance intestinal microflora, as labelled",
        so: "Loogu talagalay inuu gacan ka geysto dheelitirka bakteeriyada wanaagsan ee mindhicirka, sida ku qoran calaamadda",
      },
    ],
  },
  {
    slug: "probiotic-multi-strain",
    name: "Probiotic Multi Strain",
    brand: "New Leaf",
    aliases: ["Probiotic", "Multi strain probiotic"],
    category: "supplements",
    images: ["probiotic-multi-strain"],
    facts: "6 billion CFU · 5 strains · 120 tablets",
    description: {
      en: "New Leaf high-strength multi-strain probiotic — 6 billion CFU from five live cultures in each serving, as labelled.",
      so: "New Leaf probiotic xoog badan oo noocyo badan leh — 6 bilyan CFU oo ka yimid shan nooc oo bakteeriya nool ah qaadasho kasta, sida ku qoran calaamadda.",
    },
    benefits: [
      {
        en: "High strength: 6 billion CFU per serving, as labelled",
        so: "Xoog badan: 6 bilyan CFU qaadasho kasta, sida ku qoran calaamadda",
      },
      {
        en: "Five strains: L. acidophilus, B. bifidum, L. rhamnosus, L. salivarius and S. thermophilus",
        so: "Shan nooc: L. acidophilus, B. bifidum, L. rhamnosus, L. salivarius iyo S. thermophilus",
      },
      {
        en: "Easy-to-take tablets for daily use",
        so: "Kiniin si fudud loo qaato oo maalin walba ah",
      },
    ],
  },
  {
    slug: "folic-acid",
    name: "Folic Acid 800 mcg with Vitamin B-12",
    brand: "NOW",
    aliases: ["Folate", "Folic acid"],
    category: "supplements",
    images: ["folic-acid"],
    facts: "800 mcg · with vitamin B-12 · 250 tablets",
    description: {
      en: "NOW Folic Acid 800 mcg with added vitamin B-12 — a B-complex vitamin supporting healthy homocysteine metabolism, as labelled.",
      so: "NOW Folic Acid 800 mcg oo lagu daray fitamiin B-12 — fitamiin B-complex ah oo taageera dheef-shiidka caafimaadka qaba ee homocysteine, sida ku qoran calaamadda.",
    },
    benefits: [
      {
        en: "Folate contributes to normal blood formation",
        so: "Folate wuxuu gacan ka geystaa samaynta caadiga ah ee dhiigga",
      },
      {
        en: "Folate contributes to maternal tissue growth during pregnancy",
        so: "Folate wuxuu gacan ka geystaa korriinka unugyada hooyada xilliga uurka",
      },
      {
        en: "Folate and vitamin B12 contribute to normal homocysteine metabolism",
        so: "Folate iyo fitamiin B12 waxay gacan ka geystaan dheef-shiidka caadiga ah ee homocysteine",
      },
    ],
  },
  {
    slug: "hair-skin-nails-gummies",
    name: "Hair, Skin & Nails Gummies",
    brand: "Earth's Creation",
    aliases: ["Biotin", "Hair skin nails"],
    category: "supplements",
    images: ["hair-skin-nails-gummies"],
    facts: "Biotin 5,000 mcg · strawberry · 60 gummies",
    description: {
      en: "Earth's Creation Hair, Skin & Nails — strawberry-flavoured gummies with 5,000 mcg biotin, made for beauty from within.",
      so: "Earth's Creation Hair, Skin & Nails — xabbado macaan oo dhadhan strawberry leh oo ay ku jirto 5,000 mcg biotin, loogu talagalay quruxda gudaha ka timaada.",
    },
    benefits: [
      {
        en: "Biotin contributes to the maintenance of normal hair",
        so: "Biotin wuxuu gacan ka geystaa ilaalinta timo caadi ah",
      },
      {
        en: "Biotin contributes to the maintenance of normal skin",
        so: "Biotin wuxuu gacan ka geystaa ilaalinta maqaar caadi ah",
      },
      {
        en: "Strawberry-flavoured gummies — no capsules to swallow",
        so: "Xabbado macaan oo dhadhan strawberry leh — looma baahna kaabsuul la liqo",
      },
    ],
  },
  {
    slug: "calcium-magnesium",
    name: "Calcium & Magnesium",
    brand: "NOW",
    aliases: ["Cal Mag", "Calcium magnesium"],
    category: "supplements",
    images: ["calcium-magnesium"],
    facts: "2:1 ratio · 100 tablets",
    description: {
      en: "NOW Calcium & Magnesium in a 2:1 ratio — high in both minerals for everyday bone health support, as labelled.",
      so: "NOW Calcium & Magnesium oo saami 2:1 ah — labadan macdanba ku badan, loogu talagalay taageerada maalinlaha ah ee caafimaadka lafaha, sida ku qoran calaamadda.",
    },
    benefits: [
      CALCIUM_BONES,
      {
        en: "Magnesium contributes to normal muscle function",
        so: "Magnesium-ku wuxuu gacan ka geystaa shaqada caadiga ah ee murqaha",
      },
      {
        en: "Calcium and magnesium in a 2:1 ratio, as labelled",
        so: "Kaalshiyam iyo magnesium oo saami 2:1 ah, sida ku qoran calaamadda",
      },
    ],
  },
  {
    slug: "collagen-peptides",
    name: "Collagen Peptides (Type I, II & III)",
    brand: "Earth's Creation",
    aliases: ["Collagen powder", "Hydrolyzed collagen"],
    category: "supplements",
    images: ["collagen-peptides"],
    facts: "4,000 mg per serving · 188.7 g powder",
    description: {
      en: "Earth's Creation hydrolysed collagen peptides (types I, II & III) in powder form, made to support hair, skin, nails, bones and joints, as labelled.",
      so: "Earth's Creation collagen peptides la jajabiyay (noocyada I, II & III) oo budo ah, loogu talagalay taageerada timaha, maqaarka, ciddiyaha, lafaha iyo kalagoysyada, sida ku qoran calaamadda.",
    },
    benefits: [
      {
        en: "4,000 mg hydrolysed collagen peptides (types I, II & III) per serving, as labelled",
        so: "4,000 mg collagen peptides la jajabiyay (noocyada I, II & III) qaadasho kasta, sida ku qoran calaamadda",
      },
      {
        en: "Formulated by the manufacturer to support hair, skin, nails, bones and joints",
        so: "Shirkaddu waxay u samaysay taageerada timaha, maqaarka, ciddiyaha, lafaha iyo kalagoysyada",
      },
      {
        en: "Powder format — easy to mix into your daily drink",
        so: "Qaab budo ah — si fudud ayaa loogu qasi karaa cabitaankaaga maalinlaha ah",
      },
    ],
  },
  {
    slug: "turmeric-curcumin",
    name: "Turmeric Curcumin",
    nameSo: "Huruud Curcumin",
    brand: "NOW",
    aliases: ["Turmeric", "Curcumin", "Huruud"],
    category: "supplements",
    images: ["turmeric-curcumin"],
    facts: "Standardised extract · 95% curcuminoids · 60 veg capsules",
    description: {
      en: "NOW Turmeric Curcumin — a standardised turmeric extract with 95% curcuminoids in vegetarian capsules.",
      so: "NOW Turmeric Curcumin — soosaar huruud ah oo la habeeyay, leh 95% curcuminoids, ku jira kaabsuul khudradeed.",
    },
    benefits: [
      {
        en: "Standardised extract with 95% curcuminoids, as labelled",
        so: "Soosaar la habeeyay oo leh 95% curcuminoids, sida ku qoran calaamadda",
      },
      {
        en: "Turmeric has a long history of use in traditional Ayurvedic practice",
        so: "Huruudku wuxuu leeyahay taariikh dheer oo isticmaal ah dhaqanka Ayurveda",
      },
      VEG_CAPS,
    ],
  },
  {
    slug: "omega-3-fish-oil-2000",
    name: "Omega 3 Fish Oil 2000 mg",
    brand: "New Leaf",
    aliases: ["Omega 3", "Fish oil"],
    category: "supplements",
    images: ["omega-3-fish-oil"],
    facts: "2,000 mg per serving · EPA & DHA · 180 softgels",
    description: {
      en: "New Leaf high-strength Omega 3 fish oil — 2,000 mg per serving, rich in EPA and DHA, in a large 180-softgel bottle.",
      so: "New Leaf Omega 3 fish oil oo xoog badan — 2,000 mg qaadasho kasta, hodan ku ah EPA iyo DHA, ku jira dhalo weyn oo 180 kaabsuul jilicsan ah.",
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
        en: "High strength: 2,000 mg fish oil per serving, as labelled",
        so: "Xoog badan: 2,000 mg fish oil qaadasho kasta, sida ku qoran calaamadda",
      },
    ],
  },
  {
    slug: "coq10-200",
    name: "CoQ10 200 mg",
    brand: "NOW",
    aliases: ["Coenzyme Q10", "CoQ10"],
    category: "supplements",
    images: ["coq10"],
    facts: "200 mg · 60 veg capsules",
    description: {
      en: "NOW CoQ10 200 mg — coenzyme Q10 in vegetarian capsules, formulated for cardiovascular health and cellular energy, as labelled.",
      so: "NOW CoQ10 200 mg — coenzyme Q10 ku jira kaabsuul khudradeed, loogu talagalay caafimaadka wadnaha iyo tamarta unugyada, sida ku qoran calaamadda.",
    },
    benefits: [
      {
        en: "Coenzyme Q10 plays a role in the body's cellular energy production",
        so: "Coenzyme Q10 wuxuu door ku leeyahay soo saarista tamarta unugyada jirka",
      },
      {
        en: "Formulated for cardiovascular health support, as labelled by the manufacturer",
        so: "Loogu talagalay taageerada caafimaadka wadnaha iyo xididdada, sida ay shirkaddu ku qortay calaamadda",
      },
      VEG_CAPS,
    ],
  },
  {
    slug: "l-arginine",
    name: "L-Arginine",
    brand: "NOW",
    aliases: ["Arginine", "L-Arginane"],
    category: "supplements",
    images: ["l-arginine-500", "l-arginine-1000"],
    imageLabels: [
      { en: "500 mg · 100 veg capsules", so: "500 mg · 100 kaabsuul khudradeed" },
      { en: "Double Strength 1,000 mg · 120 tablets", so: "Laba-jibbaar 1,000 mg · 120 kiniin" },
    ],
    facts: "500 mg capsules or 1,000 mg double-strength tablets",
    description: {
      en: "NOW L-Arginine, a conditionally essential amino acid — available as 500 mg vegetarian capsules or double-strength 1,000 mg tablets.",
      so: "NOW L-Arginine, oo ah amino acid muhiim noqda xaaladaha qaarkood — waxaa la helaa kaabsuul khudradeed oo 500 mg ah ama kiniin laba-jibbaar ah oo 1,000 mg ah.",
    },
    benefits: [
      {
        en: "A conditionally essential amino acid",
        so: "Amino acid muhiim noqda xaaladaha qaarkood",
      },
      {
        en: "A precursor of nitric oxide in the body, as labelled",
        so: "Waa walaxda jirku ka sameeyo nitric oxide, sida ku qoran calaamadda",
      },
      {
        en: "Choose 500 mg capsules or double-strength 1,000 mg tablets",
        so: "Dooro kaabsuul 500 mg ah ama kiniin laba-jibbaar ah oo 1,000 mg ah",
      },
    ],
  },
  {
    slug: "l-carnitine-1000",
    name: "L-Carnitine 1000 mg",
    brand: "NOW",
    aliases: ["Carnitine", "Carnipure"],
    category: "supplements",
    images: ["l-carnitine"],
    facts: "1,000 mg · 50 tablets",
    description: {
      en: "NOW L-Carnitine 1,000 mg in its purest, clinically tested form, as labelled — formulated for fitness support.",
      so: "NOW L-Carnitine 1,000 mg oo ah qaabkiisa ugu saafisan oo si caafimaad ah loo tijaabiyay, sida ku qoran calaamadda — loogu talagalay taageerada jir-dhiska.",
    },
    benefits: [
      {
        en: "Involved in transporting fatty acids into cells for energy, as labelled",
        so: "Wuxuu door ku leeyahay u qaadista asiidhyada dufanka unugyada si tamar looga helo, sida ku qoran calaamadda",
      },
      {
        en: "Pure, clinically tested form, as stated by the manufacturer",
        so: "Qaab saafi ah oo si caafimaad ah loo tijaabiyay, sida ay shirkaddu sheegtay",
      },
      {
        en: "Formulated for fitness support, as labelled",
        so: "Loogu talagalay taageerada jir-dhiska, sida ku qoran calaamadda",
      },
    ],
  },
  {
    slug: "liquid-chlorophyll",
    name: "Liquid Chlorophyll",
    brand: "NOW",
    aliases: ["Chlorophyll", "Chlorphyll"],
    category: "supplements",
    images: ["liquid-chlorophyll"],
    facts: "100 mg per teaspoon · 473 ml (16 fl oz)",
    description: {
      en: "NOW Liquid Chlorophyll — 100 mg per teaspoon of the natural green plant pigment, described by the manufacturer as an internal deodoriser.",
      so: "NOW Liquid Chlorophyll — 100 mg qaaddo yar kasta oo ah midabka cagaarka ee dabiiciga ah ee dhirta, shirkadduna waxay ku tilmaantay mid gudaha ka udgoonsiiya.",
    },
    benefits: [
      {
        en: "Chlorophyll is the natural green pigment found in plants",
        so: "Chlorophyll waa midabka cagaarka ah ee dabiiciga ah ee laga helo dhirta",
      },
      {
        en: "Described by the manufacturer as an internal deodoriser that helps freshen breath",
        so: "Shirkaddu waxay ku tilmaantay mid gudaha ka udgoonsiiya oo gacan ka geysta udgoonaanta afka",
      },
      {
        en: "Liquid format — 100 mg per teaspoon, mixed into water or juice",
        so: "Qaab dareere ah — 100 mg qaaddo yar kasta, lagu qaso biyo ama casiir",
      },
    ],
  },
  {
    slug: "l-glutamine-500",
    name: "L-Glutamine 500 mg",
    brand: "NOW",
    aliases: ["Glutamine"],
    category: "supplements",
    images: ["l-glutamine"],
    facts: "500 mg · 120 veg capsules",
    description: {
      en: "NOW L-Glutamine 500 mg — the body's most abundant free amino acid, in vegetarian capsules.",
      so: "NOW L-Glutamine 500 mg — amino acid-ka xorta ah ee jirka ugu badan, ku jira kaabsuul khudradeed.",
    },
    benefits: [
      {
        en: "L-glutamine is the most abundant free amino acid in the body",
        so: "L-glutamine waa amino acid-ka xorta ah ee jirka ugu badan",
      },
      {
        en: "Acts as a nitrogen transporter in protein metabolism, as labelled",
        so: "Wuxuu u shaqeeyaa gaadiid nitrogen ah dheef-shiidka borotiinka, sida ku qoran calaamadda",
      },
      VEG_CAPS,
    ],
  },
  {
    slug: "calcium-vitamin-d",
    name: "Calcium with Vitamin D",
    brand: "Nutricost",
    aliases: ["Calcium", "Calcium D3"],
    category: "supplements",
    images: ["calcium-vitamin-d"],
    facts: "1,200 mg calcium · 50 mcg vitamin D · 240 tablets",
    description: {
      en: "Nutricost Calcium with Vitamin D — 1,200 mg calcium and 50 mcg (2,000 IU) vitamin D per serving, in a large 240-tablet bottle.",
      so: "Nutricost Calcium with Vitamin D — 1,200 mg kaalshiyam iyo 50 mcg (2,000 IU) fitamiin D qaadasho kasta, ku jira dhalo weyn oo 240 kiniin ah.",
    },
    benefits: [
      CALCIUM_BONES,
      {
        en: "Vitamin D contributes to normal absorption and use of calcium",
        so: "Fitamiin D wuxuu gacan ka geystaa nuugista iyo isticmaalka caadiga ah ee kaalshiyamka",
      },
      {
        en: "1,200 mg calcium with 50 mcg (2,000 IU) vitamin D per serving, as labelled",
        so: "1,200 mg kaalshiyam iyo 50 mcg (2,000 IU) fitamiin D qaadasho kasta, sida ku qoran calaamadda",
      },
    ],
    caution: {
      en: "Do not exceed the stated dose. Ask a healthcare professional if you take other calcium or vitamin D supplements.",
      so: "Ha dhaafin qiyaasta lagu qoray. Weydii xirfadle caafimaad haddii aad qaadato kaabayaal kale oo kaalshiyam ama fitamiin D ah.",
    },
  },

  /* =================== SPORTS NUTRITION =================== */
  {
    slug: "cell-tech",
    name: "Cell-Tech Creatine",
    brand: "MuscleTech",
    aliases: ["Cell Tech"],
    category: "sports",
    subcategory: "nutrition",
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
    subcategory: "nutrition",
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
    subcategory: "nutrition",
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
    subcategory: "nutrition",
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
    subcategory: "nutrition",
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
    subcategory: "nutrition",
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
    subcategory: "nutrition",
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
    subcategory: "nutrition",
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
    subcategory: "nutrition",
    images: ["mass-tech", "mass-tech-extreme-2000-tub", "mass-tech-extreme-bag"],
    imageLabels: [
      { en: "Vanilla Milkshake · 2.72 kg bag", so: "Vanilla Milkshake · bac 2.72 kg ah" },
      { en: "Triple Chocolate Brownie · 2.72 kg tub", so: "Triple Chocolate Brownie · weel 2.72 kg ah" },
      { en: "Triple Chocolate Brownie · 2.72 kg bag (new packaging)", so: "Triple Chocolate Brownie · bac 2.72 kg ah (baakad cusub)" },
    ],
    facts: "Vanilla milkshake & triple chocolate brownie · 2.72 kg · 80 g protein",
    description: {
      en: "MuscleTech's high-protein mass gainer in vanilla milkshake and triple chocolate brownie flavours, with creatine and added vitamins & minerals.",
      so: "Miisaan-kordhiyaha borotiinka badan ee MuscleTech oo dhadhan vanilla milkshake iyo triple chocolate brownie leh, lagu daray creatine, fitamiinno iyo macdano.",
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
    subcategory: "nutrition",
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
    subcategory: "nutrition",
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
    subcategory: "nutrition",
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

  {
    slug: "serious-mass",
    name: "Serious Mass",
    brand: "Optimum Nutrition",
    aliases: ["ON Serious Mass", "Mass gainer"],
    category: "sports",
    subcategory: "nutrition",
    images: ["serious-mass"],
    facts: "Chocolate · 2.72 kg (6 lb) · 50 g protein per serving",
    description: {
      en: "Optimum Nutrition Serious Mass in chocolate — a high-calorie weight gainer for muscle building and weight gain.",
      so: "Optimum Nutrition Serious Mass oo dhadhan shukulaato leh — miisaan-kordhiye kaloori badan oo loogu talagalay dhisidda murqaha iyo kordhinta miisaanka.",
    },
    benefits: [
      PROTEIN_MUSCLE,
      {
        en: "50 g protein per serving, as labelled",
        so: "50 g borotiin qaadasho kasta, sida ku qoran calaamadda",
      },
      {
        en: "High-calorie formula for those aiming to gain weight",
        so: "Isku-dar kaloori badan oo loogu talagalay kuwa doonaya inay miisaan kordhiyaan",
      },
    ],
  },
  {
    slug: "iso100-gourmet-vanilla",
    name: "ISO100 Gourmet Vanilla Protein",
    brand: "Dymatize",
    aliases: ["ISO100", "Iso 100", "Whey isolate"],
    category: "sports",
    subcategory: "nutrition",
    images: ["iso100-gourmet-vanilla"],
    facts: "25 g protein · 5.5 g BCAAs · 2.3 kg (5 lb) · 76 servings",
    description: {
      en: "Dymatize ISO100 hydrolysed 100% whey protein isolate in classic Gourmet Vanilla — the large 76-serving tub.",
      so: "Dymatize ISO100 — borotiin whey isolate 100% ah oo la jajabiyay, leh dhadhanka caadiga ah ee Gourmet Vanilla — weelka weyn ee 76 qaadasho.",
    },
    benefits: [
      PROTEIN_MUSCLE,
      {
        en: "25 g protein and 5.5 g BCAAs per serving from hydrolysed whey isolate",
        so: "25 g borotiin iyo 5.5 g BCAAs qaadasho kasta oo ka yimid whey isolate la jajabiyay",
      },
      {
        en: "Large 76-serving tub in Gourmet Vanilla",
        so: "Weel weyn oo 76 qaadasho ah oo dhadhan Gourmet Vanilla leh",
      },
    ],
  },
  {
    slug: "gold-standard-isolate",
    name: "Gold Standard 100% Isolate",
    brand: "Optimum Nutrition",
    aliases: ["ON Isolate", "Isolate", "Whey isolate"],
    category: "sports",
    subcategory: "nutrition",
    images: ["gold-standard-isolate-vanilla", "gold-standard-isolate-chocolate"],
    imageLabels: [
      { en: "Vanilla · 930 g · 31 servings", so: "Vanilla · 930 g · 31 qaadasho" },
      { en: "Chocolate Bliss · 1.36 kg · 44 servings", so: "Chocolate Bliss · 1.36 kg · 44 qaadasho" },
    ],
    facts: "25 g protein · 5.5 g BCAAs · Vanilla & Chocolate Bliss",
    description: {
      en: "Optimum Nutrition Gold Standard 100% Isolate — ultra-filtered whey protein isolate, available in Vanilla and Chocolate Bliss.",
      so: "Optimum Nutrition Gold Standard 100% Isolate — whey protein isolate si heer sare ah loo sifeeyay, waxaa la helaa Vanilla iyo Chocolate Bliss.",
    },
    benefits: [
      PROTEIN_MUSCLE,
      {
        en: "25 g protein and 5.5 g BCAAs per serving from ultra-filtered whey isolate",
        so: "25 g borotiin iyo 5.5 g BCAAs qaadasho kasta oo ka yimid whey isolate si heer sare ah loo sifeeyay",
      },
      {
        en: "Low in fat and sugars, as labelled",
        so: "Dufan iyo sonkor yar, sida ku qoran calaamadda",
      },
    ],
  },
  {
    slug: "mass-tech",
    name: "Mass-Tech Lean Muscle Mass Gainer",
    brand: "MuscleTech",
    aliases: ["Mass Tech", "Mass gainer"],
    category: "sports",
    subcategory: "nutrition",
    images: ["mass-tech-lean-vanilla"],
    facts: "Vanilla · 1.81 kg (4 lb) · 50 g protein · 5 g creatine",
    description: {
      en: "MuscleTech Mass-Tech lean muscle mass gainer in vanilla, with creatine monohydrate for strength and performance.",
      so: "MuscleTech Mass-Tech oo ah miisaan-kordhiye murqo dhiska ah, dhadhan vanilla leh, lagu daray creatine monohydrate si loo kordhiyo xoogga iyo waxqabadka.",
    },
    benefits: [
      PROTEIN_MUSCLE,
      {
        en: "50 g protein and 1,370 kcal per serving, as labelled",
        so: "50 g borotiin iyo 1,370 kcal qaadasho kasta, sida ku qoran calaamadda",
      },
      {
        en: "Includes 5 g creatine monohydrate per serving",
        so: "Waxaa ku jira 5 g creatine monohydrate qaadasho kasta",
      },
    ],
  },
  {
    slug: "gold-standard-pre-workout",
    name: "Gold Standard Pre-Workout",
    brand: "Optimum Nutrition",
    aliases: ["ON Pre-workout", "Pre workout"],
    category: "sports",
    subcategory: "nutrition",
    images: ["gold-standard-pre-workout"],
    facts: "Green apple · 300 g · 30 servings · 175 mg caffeine",
    description: {
      en: "Optimum Nutrition Gold Standard Pre-Workout in green apple — caffeine, creatine monohydrate and beta-alanine for performance, energy and focus, as labelled.",
      so: "Optimum Nutrition Gold Standard Pre-Workout oo dhadhan tufaax cagaaran leh — kafeyn, creatine monohydrate iyo beta-alanine loogu talagalay waxqabadka, tamarta iyo feejignaanta, sida ku qoran calaamadda.",
    },
    benefits: [
      CREATINE,
      {
        en: "175 mg caffeine per serving for energy and focus, as labelled",
        so: "175 mg kafeyn qaadasho kasta oo loogu talagalay tamarta iyo feejignaanta, sida ku qoran calaamadda",
      },
      {
        en: "Includes 3.3 g creatine monohydrate and 1.6 g beta-alanine per serving",
        so: "Waxaa ku jira 3.3 g creatine monohydrate iyo 1.6 g beta-alanine qaadasho kasta",
      },
    ],
    caution: CAFFEINE_CAUTION,
  },
  {
    slug: "rule1-mass-gainer",
    name: "Rule 1 Mass Gainer",
    brand: "Rule 1",
    aliases: ["R1 Mass Gainer", "Mass gainer"],
    category: "sports",
    subcategory: "nutrition",
    images: ["rule1-mass-gainer"],
    facts: "Cookies & Creme · 40 g protein · 1,230 kcal per serving",
    description: {
      en: "Rule 1 Mass Gainer in Cookies & Creme — protein, carbohydrates and creatine to support weight and size gains.",
      so: "Rule 1 Mass Gainer oo dhadhan Cookies & Creme leh — borotiin, kaarbohaydraytyo iyo creatine loogu talagalay kordhinta miisaanka iyo baaxadda.",
    },
    benefits: [
      PROTEIN_MUSCLE,
      {
        en: "40 g protein and 1,230 kcal per serving, as labelled",
        so: "40 g borotiin iyo 1,230 kcal qaadasho kasta, sida ku qoran calaamadda",
      },
      {
        en: "Helps meet higher calorie needs for those aiming to gain weight",
        so: "Wuxuu kaa caawiyaa buuxinta baahida kaloori ee sare haddii aad doonayso inaad miisaan kordhiso",
      },
    ],
  },
  {
    slug: "gold-standard-whey",
    name: "Gold Standard 100% Whey Protein",
    brand: "Optimum Nutrition",
    aliases: ["ON Whey", "Whey protein", "Why protein"],
    category: "sports",
    subcategory: "nutrition",
    images: ["gold-standard-whey-chocolate", "gold-standard-whey-strawberry"],
    imageLabels: [
      { en: "Double Rich Chocolate · 2.27 kg (5 lb) · 74 servings", so: "Double Rich Chocolate · 2.27 kg (5 lb) · 74 qaadasho" },
      { en: "Delicious Strawberry · 907 g (2 lb)", so: "Delicious Strawberry · 907 g (2 lb)" },
    ],
    facts: "24 g protein · 5.5 g BCAAs · Chocolate & Strawberry",
    description: {
      en: "Optimum Nutrition Gold Standard 100% Whey for muscle support and recovery — available in Double Rich Chocolate and Delicious Strawberry.",
      so: "Optimum Nutrition Gold Standard 100% Whey oo loogu talagalay taageerada murqaha iyo soo kabashada — waxaa la helaa Double Rich Chocolate iyo Delicious Strawberry.",
    },
    benefits: [
      PROTEIN_MUSCLE,
      {
        en: "24 g protein and 5.5 g BCAAs per serving, as labelled",
        so: "24 g borotiin iyo 5.5 g BCAAs qaadasho kasta, sida ku qoran calaamadda",
      },
      {
        en: "Choose Double Rich Chocolate or Delicious Strawberry",
        so: "Dooro Double Rich Chocolate ama Delicious Strawberry",
      },
    ],
  },

  /* ---------- Sports — Gym accessories ---------- */
  {
    slug: "daryeel-shaker-bottle",
    name: "Daryeel Stainless Steel Shaker Bottle",
    nameSo: "Dhalada Qasidda ee Daryeel (Shaker)",
    brand: "Daryeel Wellness",
    aliases: ["Shaker", "Gym bottle", "Protein shaker"],
    category: "sports",
    subcategory: "accessories",
    images: ["shaker-bottle"],
    facts: "Stainless steel · with whisk ball",
    description: {
      en: "Daryeel Wellness branded stainless-steel shaker bottle with a wire whisk ball — for smooth protein shakes at home or the gym.",
      so: "Dhalo qasid ah oo bir-ma-dhaxale ah oo summadda Daryeel Wellness leh, ay la socoto kubad qasid — loogu talagalay cabitaannada borotiinka ee siman, guriga ama jimicsiga.",
    },
    benefits: [
      {
        en: "Durable stainless-steel body",
        so: "Jir adag oo bir-ma-dhaxale ah",
      },
      {
        en: "Wire whisk ball for smooth, lump-free shakes",
        so: "Kubad qasid ah oo cabitaanka ka dhigta mid siman oo aan buro lahayn",
      },
      {
        en: "Screw-on lid with a flip-top spout",
        so: "Dabool la xidho oo leh af la furo",
      },
    ],
  },
  {
    slug: "gym-gloves",
    name: "Gym Gloves with Wrist Support",
    nameSo: "Gacmo-gashi Jimicsi oo leh Taageero Curcurka",
    aliases: ["Gym gloves", "Workout gloves", "Lifting gloves"],
    category: "sports",
    subcategory: "accessories",
    images: ["gym-gloves"],
    facts: "Half-finger · wrist wrap",
    description: {
      en: "Half-finger workout gloves with padded palms and built-in wrist wraps, for a secure grip during weight training.",
      so: "Gacmo-gashi jimicsi oo faraha badh u furan, leh calaacal suuf leh iyo duub curcur oo ku dhex jira, loogu talagalay qabsasho adag xilliga culayska-qaadista.",
    },
    benefits: [
      {
        en: "Padded palms for a firmer, more comfortable grip",
        so: "Calaacal suuf leh oo qabsasho adag oo raaxo leh siisa",
      },
      {
        en: "Built-in wrist wraps for extra support",
        so: "Duub curcur oo ku dhex jira oo taageero dheeraad ah siiya",
      },
      {
        en: "Half-finger design keeps hands cool and flexible",
        so: "Naqshad faraha badh u furan oo gacmaha qabow iyo dabacsanaan ku haysa",
      },
    ],
  },
  {
    slug: "knee-sleeves",
    name: "7mm Knee Sleeves",
    nameSo: "Jilib-gashi 7mm",
    brand: "Aurum Athletics",
    aliases: ["Knee sleeves", "Knee support"],
    category: "sports",
    subcategory: "accessories",
    images: ["knee-sleeves"],
    facts: "7 mm neoprene · pair",
    description: {
      en: "Aurum Athletics 7 mm neoprene knee sleeves — warmth, compression and support for squats and heavy lifts.",
      so: "Jilib-gashiga neoprene-ka ee 7 mm ee Aurum Athletics — diirimaad, cadaadis iyo taageero loogu talagalay fadhi-kacda (squat) iyo culayska waaweyn.",
    },
    benefits: [
      {
        en: "7 mm neoprene for warmth and compression",
        so: "Neoprene 7 mm ah oo diirimaad iyo cadaadis bixiya",
      },
      {
        en: "Support for the knees during squats and heavy lifts",
        so: "Taageero jilibka xilliga fadhi-kacda iyo culayska waaweyn",
      },
      {
        en: "Supplied as a pair",
        so: "Waxaa la bixiyaa laba (lammaane)",
      },
    ],
  },
  {
    slug: "lifting-straps",
    name: "Premium Lifting Straps",
    nameSo: "Suunka Culayska-qaadista",
    brand: "Hardbody",
    aliases: ["Lifting straps", "Wrist straps"],
    category: "sports",
    subcategory: "accessories",
    images: ["lifting-straps"],
    facts: "Padded · pair",
    description: {
      en: "Hardbody premium lifting straps — padded wrist straps that help you hold heavy bars for rows, deadlifts and pull-downs.",
      so: "Suunka culayska-qaadista ee Hardbody — suun curcur oo suuf leh oo kaa caawiya inaad qabato birta culus xilliga rows, deadlifts iyo pull-downs.",
    },
    benefits: [
      {
        en: "Help maintain your grip on heavy pulls and deadlifts",
        so: "Waxay kaa caawiyaan ilaalinta qabsashadaada xilliga jiidista culus iyo deadlifts",
      },
      {
        en: "Padded wrist section for comfort",
        so: "Qayb curcur oo suuf leh oo raaxo leh",
      },
      {
        en: "Durable stitched construction",
        so: "Dhismo adag oo si fiican loo tolay",
      },
    ],
  },
  {
    slug: "gym-duffel-bag",
    name: "Gym Duffel Bag",
    nameSo: "Boorsada Jimicsiga",
    brand: "Arrowmax",
    aliases: ["Gym bag", "Sports bag", "Duffel"],
    category: "sports",
    subcategory: "accessories",
    images: ["gym-duffel-bag"],
    facts: "Black",
    description: {
      en: "Arrowmax black gym duffel bag with a roomy main compartment and sturdy carry handles — for the gym or short trips.",
      so: "Boorsada jimicsiga ee madow ee Arrowmax oo leh qayb weyn oo ballaaran iyo gacan-qabsi adag — loogu talagalay jimicsiga ama safarrada gaagaaban.",
    },
    benefits: [
      {
        en: "Spacious main compartment for clothes, shoes and accessories",
        so: "Qayb weyn oo ballaaran oo loogu talagalay dharka, kabaha iyo agabka",
      },
      {
        en: "Sturdy carry handles",
        so: "Gacan-qabsi adag",
      },
      {
        en: "Classic black design for the gym or travel",
        so: "Naqshad madow oo caadi ah oo ku habboon jimicsiga ama safarka",
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
  {
    slug: "now-liquid-b12-b-complex",
    name: "Liquid B-12 B-Complex",
    brand: "NOW",
    aliases: ["Liquid B12", "B-12", "Vitamin B12"],
    category: "vitamins",
    images: ["liquid-b12-b-complex"],
    facts: "237 ml (8 fl oz) · liquid",
    description: {
      en: "NOW Liquid B-12 B-Complex — vitamin B12 with B-complex vitamins in an easy liquid form, made for nervous system health and energy production, as labelled.",
      so: "NOW Liquid B-12 B-Complex — fitamiin B12 oo lagu daray fitamiinnada B-complex, qaab dareere ah oo fudud, loogu talagalay caafimaadka habdhiska dareemayaasha iyo soo saarista tamarta, sida ku qoran calaamadda.",
    },
    benefits: [
      B12_ENERGY,
      B12_NERVOUS,
      {
        en: "Vitamin B12 contributes to the reduction of tiredness and fatigue",
        so: "Fitamiin B12 wuxuu gacan ka geystaa yaraynta daalka iyo tabar-darrida",
      },
    ],
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
