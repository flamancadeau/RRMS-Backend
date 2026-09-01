const provinceCodes: Record<string, string> = {
  KIGALI: "KIG",
  "EASTERN PROVINCE": "EAS",
  "NORTHERN PROVINCE": "NOR",
  "SOUTHERN PROVINCE": "SOU",
  "WESTERN PROVINCE": "WES"
};

export const generateProvinceCode = (name: string): string => {
  const normalizedName = name.trim().toUpperCase();

  const code = provinceCodes[normalizedName];

  if (!code) {
    throw new Error(`Invalid province name: ${name}`);
  }

  return code;
};
