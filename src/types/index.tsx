export const everyLanguage = ['인정하는 말', '함께하는 시간', '선물', '봉사', '스킨십'] as const;
export type Language = (typeof everyLanguage)[number];
