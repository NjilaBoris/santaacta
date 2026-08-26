

export type MP = {
  id: string;
  name: string;
  party?: string;
};

export type Constituency = {
  id: string;
  name: string;
  seats: number;
  mps: MP[];
};

export type Division = {
  id: string;
  name: string;
  seats: number;
  constituencies: Constituency[];
};

export type Region = {
  id: string;
  name: string;
  divisions: Division[];
};

/** Builds a single-constituency division (the common case: department == constituency). */
function single(id: string, name: string, seats: number): Division {
  return {
    id,
    name,
    seats,
    constituencies: [{ id, name, seats, mps: [] }],
  };
}

/** Builds a division that the special decree splits into multiple named constituencies. */
function split(
  id: string,
  name: string,
  parts: { id: string; name: string; seats: number }[]
): Division {
  return {
    id,
    name,
    seats: parts.reduce((sum, p) => sum + p.seats, 0),
    constituencies: parts.map((p) => ({ ...p, mps: [] })),
  };
}

export const REGIONS: Region[] = [
  {
    id: "adamaoua",
    name: "Adamaoua",
    divisions: [
      single("djerem", "Djerem", 1),
      single("faro-et-deo", "Faro-et-Déo", 1),
      single("mayo-banyo", "Mayo-Banyo", 2),
      single("mbere", "Mbéré", 3),
      single("vina", "Vina", 3),
    ],
  },
  {
    id: "centre",
    name: "Centre",
    divisions: [
      single("haute-sanaga", "Haute-Sanaga", 2),
      split("lekie", "Lékié", [
        { id: "lekie-est", name: "Lékié-Est", seats: 3 },
        { id: "lekie-ouest", name: "Lékié-Ouest", seats: 2 },
      ]),
      single("mbam-et-kim", "Mbam-et-Kim", 1),
      single("mbam-et-inoubou", "Mbam-et-Inoubou", 3),
      single("mefou-et-afamba", "Mefou-et-Afamba", 2),
      single("mefou-et-akono", "Mefou-et-Akono", 1),
      single("mfoundi", "Mfoundi", 7),
      single("nyong-et-kelle", "Nyong-et-Kellé", 3),
      single("nyong-et-mfoumou", "Nyong-et-Mfoumou", 2),
      single("nyong-et-soo", "Nyong-et-So'o", 2),
    ],
  },
  {
    id: "est",
    name: "Est",
    divisions: [
      single("boumba-et-ngoko", "Boumba-et-Ngoko", 2),
      single("haut-nyong", "Haut-Nyong", 3),
      single("kadey", "Kadey", 3),
      single("lom-et-djerem", "Lom-et-Djerem", 3),
    ],
  },
  {
    id: "extreme-nord",
    name: "Extrême-Nord",
    divisions: [
      split("diamare", "Diamaré", [
        { id: "diamare-centre", name: "Diamaré-Centre", seats: 2 },
        { id: "diamare-sud", name: "Diamaré-Sud", seats: 1 },
        { id: "diamare-nord", name: "Diamaré-Nord", seats: 1 },
        { id: "diamare-ouest", name: "Diamaré-Ouest", seats: 1 },
      ]),
      split("mayo-kani", "Mayo-Kani", [
        { id: "mayo-kani-nord", name: "Mayo-Kani-Nord", seats: 3 },
        { id: "mayo-kani-sud", name: "Mayo-Kani-Sud", seats: 2 },
      ]),
      single("logone-et-chari", "Logone-et-Chari", 4),
      split("mayo-danai", "Mayo-Danaï", [
        { id: "mayo-danai-est", name: "Mayo-Danaï-Est", seats: 3 },
        { id: "mayo-danai-sud", name: "Mayo-Danaï-Sud", seats: 1 },
        { id: "mayo-danai-nord", name: "Mayo-Danaï-Nord", seats: 1 },
      ]),
      single("mayo-sava", "Mayo-Sava", 4),
      split("mayo-tsanaga", "Mayo-Tsanaga", [
        { id: "mayo-tsanaga-nord", name: "Mayo-Tsanaga-Nord", seats: 4 },
        { id: "mayo-tsanaga-sud", name: "Mayo-Tsanaga-Sud", seats: 1 },
        { id: "mayo-tsanaga-est", name: "Mayo-Tsanaga-Est", seats: 1 },
      ]),
    ],
  },
  {
    id: "littoral",
    name: "Littoral",
    divisions: [
      split("moungo", "Moungo", [
        { id: "moungo-nord", name: "Moungo-Nord", seats: 3 },
        { id: "moungo-sud", name: "Moungo-Sud", seats: 3 },
      ]),
      single("nkam", "Nkam", 1),
      single("sanaga-maritime", "Sanaga-Maritime", 3),
      split("wouri", "Wouri", [
        { id: "wouri-centre", name: "Wouri-Centre", seats: 3 },
        { id: "wouri-sud", name: "Wouri-Sud", seats: 1 },
        { id: "wouri-est", name: "Wouri-Est", seats: 4 },
        { id: "wouri-ouest", name: "Wouri-Ouest", seats: 1 },
      ]),
    ],
  },
  {
    id: "nord",
    name: "Nord",
    divisions: [
      split("benoue", "Bénoué", [
        { id: "benoue-est", name: "Bénoué-Est", seats: 2 },
        { id: "benoue-ouest", name: "Bénoué-Ouest", seats: 2 },
      ]),
      single("faro", "Faro", 1),
      single("mayo-louti", "Mayo-Louti", 4),
      single("mayo-rey", "Mayo-Rey", 3),
    ],
  },
  {
    id: "nord-ouest",
    name: "Nord-Ouest",
    divisions: [
      single("boyo", "Boyo", 2),
      split("bui", "Bui", [
        { id: "bui-centre", name: "Bui-Centre", seats: 2 },
        { id: "bui-ouest", name: "Bui-Ouest", seats: 1 },
        { id: "bui-sud", name: "Bui-Sud", seats: 1 },
      ]),
      split("donga-mantung", "Donga-Mantung", [
        { id: "donga-mantung-centre", name: "Donga-Mantung-Centre", seats: 2 },
        { id: "donga-mantung-est", name: "Donga-Mantung-Est", seats: 1 },
        { id: "donga-mantung-ouest", name: "Donga-Mantung-Ouest", seats: 1 },
      ]),
      split("menchum", "Menchum", [
        { id: "menchum-nord", name: "Menchum-Nord", seats: 1 },
        { id: "menchum-sud", name: "Menchum-Sud", seats: 1 },
      ]),
      split("mezam", "Mezam", [
        { id: "mezam-centre", name: "Mezam-Centre", seats: 1 },
        { id: "mezam-nord", name: "Mezam-Nord", seats: 1 },
        { id: "mezam-sud", name: "Mezam-Sud", seats: 1 },
      ]),
      split("ngo-ketunjia", "Ngo-Ketunjia", [
        { id: "ngo-ketunjia-nord", name: "Ngo-Ketunjia-Nord", seats: 1 },
        { id: "ngo-ketunjia-sud", name: "Ngo-Ketunjia-Sud", seats: 1 },
      ]),
      split("momo", "Momo", [
        { id: "momo-est", name: "Momo-Est", seats: 2 },
        { id: "momo-ouest", name: "Momo-Ouest", seats: 1 },
      ]),
    ],
  },
  {
    id: "ouest",
    name: "Ouest",
    divisions: [
      single("hauts-plateaux", "Hauts-Plateaux", 2),
      single("bamboutos", "Bamboutos", 4),
      single("haut-nkam", "Haut-Nkam", 3),
      single("menoua", "Menoua", 5),
      single("mifi", "Mifi", 2),
      single("nde", "Ndé", 2),
      split("noun", "Noun", [
        { id: "noun-centre", name: "Noun-Centre", seats: 4 },
        { id: "noun-nord", name: "Noun-Nord", seats: 1 },
      ]),
      single("koung-khi", "Koung-Khi", 2),
    ],
  },
  {
    id: "sud",
    name: "Sud",
    divisions: [
      single("mvila", "Mvila", 3),
      single("dja-et-lobo", "Dja-et-Lobo", 5),
      single("ocean", "Océan", 2),
      single("vallee-du-ntem", "Vallée-du-Ntem", 1),
    ],
  },
  {
    id: "sud-ouest",
    name: "Sud-Ouest",
    divisions: [
      single("lebialem", "Lebialem", 1),
      split("fako", "Fako", [
        { id: "fako-est", name: "Fako-Est", seats: 2 },
        { id: "buea-centre-urbain", name: "Buea (Centre Urbain)", seats: 1 },
        { id: "fako-ouest", name: "Fako-Ouest", seats: 1 },
      ]),
      single("manyu", "Manyu", 3),
      split("meme", "Meme", [
        { id: "meme-ouest", name: "Meme-Ouest", seats: 1 },
        { id: "kumba-centre-urbain", name: "Kumba (Centre Urbain)", seats: 1 },
      ]),
      single("ndian", "Ndian", 3),
      single("koupe-manengouba", "Koupé-Manengouba", 2),
    ],
  },
];