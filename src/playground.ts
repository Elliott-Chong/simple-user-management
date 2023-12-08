import { db } from "./server/db";

const fakedata = [
  { name: "Shea", email: "sding0@msn.com" },
  { name: "Gwendolen", email: "ggiller1@elpais.com" },
  { name: "Dawna", email: "dgibbieson2@ted.com" },
  { name: "Harcourt", email: "hsales3@ca.gov" },
  { name: "Violette", email: "vcaghan4@odnoklassniki.ru" },
  { name: "Kali", email: "kcongreve5@google.fr" },
  { name: "Iona", email: "icornforth6@bluehost.com" },
  { name: "Bing", email: "bmacdonnell7@typepad.com" },
  { name: "Gery", email: "gciotto8@usgs.gov" },
  { name: "Eugenio", email: "erandales9@wisc.edu" },
  { name: "Neda", email: "npotera@list-manage.com" },
  { name: "Wes", email: "wbirchillb@addthis.com" },
  { name: "Johnette", email: "jperigeauxc@narod.ru" },
  { name: "Cairistiona", email: "ctarpleed@sakura.ne.jp" },
  { name: "Muire", email: "mgatfielde@bizjournals.com" },
  { name: "Roch", email: "rmeakinf@parallels.com" },
  { name: "Magnum", email: "mklejing@cyberchimps.com" },
  { name: "Cord", email: "csambrokh@bigcartel.com" },
  { name: "Andy", email: "aguiveri@uiuc.edu" },
  { name: "Alvina", email: "aswirej@about.com" },
];

await db.user.createMany({
  data: fakedata.map((user) => ({
    name: user.name,
    email: user.email,
    emailVerified: new Date(),
  })),
});
