import { JOB } from "../data/enum";
import { ISkillData } from "../data/interface";
import { DEFAULTPARAMS, SKILLS, SPECIALPARAMS } from "../data/skills";

export const wordCapitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getSkillDataFromId = (id: number) =>
  SKILLS.find((skill) => skill.id === id);

export const getSkillContextFromId = (skillData: ISkillData[][], id: number) =>
  skillData
    .filter((data) => data.find((skill) => skill.id === id))
    .map((data) => data.find((skill) => skill.id === id)!)[0];

export const getTimeFormat = (duration: number) => {
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;
  let time = "";
  time += "0" + mins + ":" + (secs < 10 ? "0" : "");
  time += "" + secs;
  return time;
};

export const getDefaultParams = (params: any) =>
  DEFAULTPARAMS.find((item) => item.params === params);

export const getSpecialParams = (params: any) =>
  SPECIALPARAMS.find((item) => item.params === params);

export const getPoints = (level: number) => {
  const minPoints = 88;
  const classBonus = 100;
  let points = minPoints;

  if (level == 15) return minPoints;

  if (level < 21) {
    points += 2 * (level - 15);
  } else if (level < 41) {
    points += 2 * 5 + 3 * (level - 20);
  } else if (level == 60) {
    points += 2 * 5 + 3 * 20 + 4 * (level - 40) + classBonus;
  } else if (level < 61) {
    points += 2 * 5 + 3 * 20 + 4 * (level - 40);
  } else if (level < 81) {
    points += 2 * 5 + 3 * 20 + 4 * 20 + 5 * (level - 60) + classBonus;
  } else if (level < 101) {
    points += 2 * 5 + 3 * 20 + 4 * 20 + 5 * 20 + 6 * (level - 80) + classBonus;
  } else if (level < 120) {
    points +=
      2 * 5 +
      3 * 20 +
      4 * 20 +
      5 * 20 +
      6 * 20 +
      7 * (level - 100) +
      classBonus;
  } else {
    points = 698;
  }

  return points;
};

export const getFistClass = (secondClass: JOB) => {
  const firstClassMap = {
    [JOB.KNIGHT]: JOB.MERCENARY,
    [JOB.BLADE]: JOB.MERCENARY,
    [JOB.ELEMENTOR]: JOB.MAGICIAN,
    [JOB.PSYCHIKEEPER]: JOB.MAGICIAN,
    [JOB.RINGMASTER]: JOB.ASSIST,
    [JOB.BILLPOSTER]: JOB.ASSIST,
    [JOB.RANGER]: JOB.ACROBAT,
    [JOB.JESTER]: JOB.ACROBAT,
    [JOB.MERCENARY]: JOB.MERCENARY,
    [JOB.ASSIST]: JOB.ASSIST,
    [JOB.ACROBAT]: JOB.ACROBAT,
    [JOB.MAGICIAN]: JOB.MAGICIAN,
  };

  return firstClassMap[secondClass];
};
