import * as moment from "moment-timezone";

const timezoneAbbreviations = [
  "ACDT", // Australian Central Daylight Savings Time
  "ACST", // Australian Central Standard Time
  "ACT", // Acre Time
  "ACWST", // Australian Central Western Standard Time (unofficial)
  "ADT", // Atlantic Daylight Time
  "AEDT", // Australian Eastern Daylight Savings Time
  "AEST", // Australian Eastern Standard Time
  "AFT", // Afghanistan Time
  "AKDT", // Alaska Daylight Time
  "AKST", // Alaska Standard Time
  "ALMT", // Alma-Ata Time
  "AMST", // Amazon Summer Time (Brazil)
  "AMT", // Amazon Time (Brazil)
  "ANAT", // Anadyr Time
  "APER",
  "ARST",
  "AST",
  "AWDT",
  "AWST",
  "AZOST",
  "AZOT",
  "AZT",
  "BDT",
  "BIOT",
  "BIT",
  "BOT",
  "BRST",
  "BRT",
  "BST",
  "BTT",
  "CCT",
  "CDT",
  "CET",
  "CHADT",
  "CHAST",
  "CLT",
  "CLST",
  "COST",
  "COT",
  "CST",
  "CT",
  "CVT",
  "CXT",
  "DAVT",
  "DDUT",
  "DFT",
  "EASST",
  "EAST",
  "EAT",
  "EDT",
  "EEST",
  "EET",
  "EGST",
  "EGT",
  "EIT",
  "EST",
  "FET",
  "FJT",
  "FKST",
  "FKT",
  "FNT",
  "GALT",
  "GAMT",
  "GET",
  "GFT",
  "GILT",
  "GIT",
  "GMT",
  "GST",
  "GYT",
  "HDT",
  "HKT",
  "HMT",
  "HOVST",
  "HOVT",
  "ICT",
  "IDT",
  "IOT",
  "IRKT",
  "IRST",
  "IST",
  "JST",
  "KGT",
  "KOST",
  "KRAT",
  "KST",
  "LHST",
  "LINT",
  "MAGT",
  "MART",
  "MAWT",
  "MDT",
  "MET",
  "MEST",
  "MHT",
  "MIST",
  "MIT",
  "MMT",
  "MSK",
  "MST",
  "MUT",
  "MVT",
  "MYT",
  "NCT",
  "NDT",
  "NFT",
  "NOVT",
  "NPT",
  "NST",
  "NT",
  "NUT",
  "NZDT",
  "NZST",
  "OMST",
  "ORAT",
  "PDT",
  "PET",
  "PETT",
  "PGT",
  "PHOT",
  "PHT",
  "PKT",
  "PMDT",
  "PMST",
  "PONT",
  "PST",
  "PWT",
  "PYST",
  "PYT",
  "RET",
  "ROTT",
  "SAKT",
  "SAMT",
  "SAST",
  "SBT",
  "SCT",
  "SDT",
  "SGT",
  "SLST",
  "SRET",
  "SRT",
  "SST",
  "SYOT",
  "TAHT",
  "THA",
  "TFT",
  "TJT",
  "TKT",
  "TLT",
  "TMT",
  "TRT",
  "TOT",
  "TVT",
  "ULAT",
  "USZ1",
  "UTC",
  "UYST",
  "UYT",
  "UZT",
  "VET",
  "VLAT",
  "VOLT",
  "VOST",
  "VUT",
  "WAKT",
  "WAST",
  "WAT",
  "WEST",
  "WET",
  "WIT",
  "WST",
  "YAKT",
  "YEKT",
];
export function extractTimezone(input: string): boolean | string {
  let foundTimezones = moment.tz
    .names()
    .filter(
      (timezone) =>
        input.includes(timezone) ||
        input.includes(timezone.replaceAll("_", " ")),
    );
  //if none found, return false
  if (foundTimezones.length === 0) {
    foundTimezones = timezoneAbbreviations.filter((timezone) => {
      const regex = new RegExp("\\b" + timezone + "\\b", "g");
      return regex.test(input.toUpperCase());
    });
    if (foundTimezones.length > 0) {
      let matchedTimezone = "";
      foundTimezones.forEach((abbreviation) => {
        const matches = moment.tz.names().filter((name) => {
          // Get the current abbreviation for this timezone
          const currentAbbreviation = moment.tz(name).zoneAbbr();
          return abbreviation === currentAbbreviation;
        });

        // If we found matches, just use the first one
        if (matches.length > 0) {
          matchedTimezone = matches[0];
        }
      });

      if (matchedTimezone !== "") {
        foundTimezones = [matchedTimezone];
      }
    }
  }

  if (foundTimezones.length === 0) return false;
  //return longest string in foundTimezones
  return foundTimezones.reduce((a, b) => (a.length > b.length ? a : b));
}
