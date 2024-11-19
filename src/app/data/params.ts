import { PARAMS } from "./enums";
import { ISkill } from "./interfaces";
import { classData } from "./classData";

export const SKILLS = classData as ISkill[];

export const DEFAULTPARAMS = [
  {
    params: PARAMS.HP,
    detail: "Heal",
  },
  {
    params: PARAMS.TIME,
    detail: "Time",
  },
  {
    params: PARAMS.DURATION,
    detail: "Time",
  },
  {
    params: PARAMS.ATTACK,
    detail: "Attack",
  },
  {
    params: PARAMS.ATTRIBUTE,
    detail: "Attack",
  },
];

export const SPECIALPARAMS = [
  {
    params: "incomingdamage",
    detail: "Incoming Damage",
    prefix: "+",
    suffix: "%",
  },
  {
    params: "maxhp",
    detail: "Increase HP",
    prefix: "+",
    suffix: "%",
  },
  {
    params: "speed",
    detail: "Speed",
    prefix: "+",
    suffix: "%",
  },
  {
    params: "int",
    detail: "INT",
    prefix: "+",
    suffix: "",
  },
  {
    params: "explostdecreaseatrevival",
    detail: "EXP Lost",
    prefix: ": ",
    suffix: "%",
  },
  {
    params: "attackspeed",
    detail: "Attack Speed",
    prefix: "+",
    suffix: "%",
  },
  {
    params: "decreasedcastingtime",
    detail: "Casting Speed",
    prefix: "+",
    suffix: "%",
  },
  {
    params: "sta",
    detail: "STA",
    prefix: "+",
    suffix: "",
  },
  {
    params: "block",
    detail: "Block",
    prefix: "+",
    suffix: "%",
  },
  {
    params: "str",
    detail: "STR",
    prefix: "+",
    suffix: "",
  },
  {
    params: "autohp",
    detail: "HP Recovery",
    prefix: " Below ",
    suffix: "% (PVE)",
  },
  {
    params: "autohppvp",
    detail: "HP Recovery",
    prefix: " Below ",
    suffix: "% (PVP)",
  },
  {
    params: "dex",
    detail: "DEX",
    prefix: "+",
    suffix: "",
  },
  {
    params: "hitrate",
    detail: "Hit Rate",
    prefix: "+",
    suffix: "%",
  },
  {
    params: "skillchance",
    detail: "Stun Probability",
    prefix: "+",
    suffix: "%",
  },
  {
    params: "criticalresist",
    detail: "Critical Resist",
    prefix: "+",
    suffix: "%",
  },
  {
    params: "damage",
    detail: "Additional Damage",
    prefix: "+",
    suffix: "",
  },
  {
    params: "attack",
    detail: "Increase Attack",
    prefix: "+",
    suffix: "%",
  },
  {
    params: "magicdefense",
    detail: "Magic Resistance",
    prefix: "+",
    suffix: "%",
  },
  {
    params: "def",
    detail: "Increase Defense",
    prefix: "+",
    suffix: "%",
  },
];
