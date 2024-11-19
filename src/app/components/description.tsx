"use client";

import Image from "next/image";
import { useAppContext } from "./context";
import {
  getSkillContextFromId,
  getSkillDataFromId,
  getTimeFormat,
  getSpecialParams,
  getDefaultParams,
  wordCapitalize,
  validateSkillColor,
  getSkillLevelText,
} from "../helper/helper";
import { PARAMS } from "../data/enum";
import { IAbilities, ISkillData } from "@/app/data/interface";
import { classDescription } from "../data/class/description";

const transitionStyle = `transition-transform motion-reduce:transform-none ease-in-out duration-250 transform active:scale-125`;

export const Description = () => {
  const {
    userData,
    skillData,
    focusSkill,
    setSkillData,
    setUserData,
    setFocusSkill,
  } = useAppContext();

  const userFirstJob = userData.class[0];
  const userSecondJob = userData.class[1];

  const currentJob = classDescription.find(
    (item) => item.JOB === userSecondJob
  );

  const currentSkill = getSkillDataFromId(focusSkill);
  const currentSkillSet = skillData.filter((data) =>
    data.find((skill) => skill.id === focusSkill)
  )[0];
  const currentFocusSkill = currentSkillSet.find(
    (skill) => skill.id === focusSkill
  );
  const isLvlButtonVisible =
    validateSkillColor({ id: focusSkill, level: 0 }, skillData) !=
      "grayscale" && focusSkill != 0
      ? "visible"
      : "invisible";

  const SkillDescription = () => {
    const indexLevel =
      currentFocusSkill!.level > 1 ? currentFocusSkill!.level - 1 : 0;
    const skillLevel = currentSkill?.levels[indexLevel];
    const levelAbility = skillLevel?.abilities;
    const levelScaling = skillLevel?.scalingParameters;

    const getRangeText = (text: string | undefined) => {
      switch (text) {
        case "area":
          return "Around";
        case "party":
          return "Party";
        default:
          return text;
      }
    };

    const isBaseValid = (param: string) =>
      param === PARAMS.HP || param === PARAMS.ATTACK;

    const isScaleValid = (param: string) =>
      param === PARAMS.TIME || param === PARAMS.DURATION;

    const Tab = (data: { value: string; style?: string }) => (
      <p className={`m-0 lg:w-[40ch] text-sm ${data.style}`}>{data.value}</p>
    );

    const attackBaseDescription = () => {
      return levelAbility?.map((ability, index) => {
        if (isBaseValid(ability.parameter)) {
          return (
            <Tab
              value={`Base ${getDefaultParams(ability.parameter)?.detail}: ${
                ability.add
              }`}
              style="font-bold"
              key={index}
            />
          );
        }
        return null;
      });
    };

    const attackScalingDescription = () => {
      if (levelScaling?.length === 2) {
        if (
          isBaseValid(levelScaling![0].parameter) &&
          isBaseValid(levelScaling![1].parameter)
        ) {
          return (
            <Tab
              value={`${
                getDefaultParams(levelScaling[0].parameter)?.detail
              } Scaling: ${levelScaling[0].stat.toUpperCase()} x ${levelScaling[0].scale?.toFixed(
                1
              )} + ${levelScaling[1].stat.toUpperCase()} x ${levelScaling[1].scale?.toFixed(
                1
              )}`}
              style="font-bold"
            />
          );
        }
      }
      return levelScaling?.map((scaling, index) => {
        if (isBaseValid(scaling.parameter)) {
          return (
            <Tab
              value={`${
                getDefaultParams(scaling.parameter)?.detail
              } Scaling: ${scaling.stat.toUpperCase()} x ${scaling.scale?.toFixed(
                1
              )}`}
              style="font-bold"
              key={index}
            />
          );
        }
      });
    };

    return (
      <>
        <Tab
          value={`${skillLevel?.consumedMP ? "MP" : "FP"}: ${
            skillLevel?.consumedMP
              ? skillLevel?.consumedMP
              : skillLevel?.consumedFP
          }`}
        />

        {currentSkill?.requirements?.map((req, index) => {
          const skillName = getSkillDataFromId(req.skill)?.name.en;
          const requiredSkill = getSkillContextFromId(skillData, req.skill);

          return (
            <Tab
              value={`${skillName} skill level ${req.level} is needed.`}
              style={requiredSkill.level >= req.level ? "" : "text-red-600"}
              key={index}
            />
          );
        })}

        <Tab
          value={`Character Level: ${currentSkill!.level}`}
          style={userData.level >= currentSkill!.level ? "" : "text-red-600"}
        />

        {skillLevel?.minAttack && (
          <Tab
            value={`Base Damage: ${skillLevel?.minAttack} ~ ${skillLevel?.maxAttack}`}
            style="font-bold"
          />
        )}

        {currentFocusSkill!.attackDesc && attackBaseDescription()}
        {currentFocusSkill!.attackDesc && attackScalingDescription()}

        {skillLevel?.duration && (
          <Tab
            value={`Base Time: ${getTimeFormat(skillLevel?.duration)}`}
            style="font-bold"
          />
        )}

        {levelScaling?.map((scaling, index) => {
          if (isScaleValid(scaling.parameter)) {
            return (
              <Tab
                value={`${
                  getDefaultParams(scaling.parameter)?.detail
                } Scaling: ${scaling.stat.toUpperCase()} x ${scaling.scale}`}
                style="font-bold"
                key={index}
              />
            );
          }
          return null;
        })}

        {skillLevel?.casting && Number(skillLevel?.casting) >= 1 && (
          <Tab
            value={`Casting Time: ${getTimeFormat(skillLevel?.casting)}`}
            style="font-bold"
          />
        )}

        {skillLevel?.cooldown && (
          <Tab
            value={`Cooldown: ${getTimeFormat(skillLevel?.cooldown)}`}
            style="font-bold"
          />
        )}

        {skillLevel?.spellRange && (
          <Tab
            value={`Spell Range: ${skillLevel?.spellRange} (${getRangeText(
              currentSkill?.target
            )})`}
            style="font-bold"
          />
        )}

        {skillLevel?.dotTick && (
          <Tab
            value={`DoT Tick: ${skillLevel?.dotTick} Seconds`}
            style="font-bold"
          />
        )}

        {!currentSkill?.flying && (
          <Tab value={`Flying: No`} style="font-bold" />
        )}

        {levelAbility?.map((ability: IAbilities, index) => {
          if (getSpecialParams(ability.parameter)) {
            const detail = getSpecialParams(ability.parameter)?.detail;
            const prefix = getSpecialParams(ability.parameter)?.prefix;
            const suffix = getSpecialParams(ability.parameter)?.suffix;

            // Bad solution but it works... for now ?
            const detailValue = () => {
              const divider = ability.parameter == "autohp" ? 4 : 8;
              const detailLevel = (currentFocusSkill!.level * 20) / divider;
              return ability.parameter.includes("autohp")
                ? detailLevel.toFixed() + "%"
                : "";
            };

            const skillType = () => {
              if (ability.pve) return "(PVE)";
              if (ability.pvp) return "(PVP)";
              return "";
            };

            return (
              <Tab
                value={`${detail} ${detailValue()}${skillType()}${prefix}${
                  ability.add
                }${suffix}`}
                style="text-indigo-500"
                key={index}
              />
            );
          }
          return null;
        })}

        {levelScaling?.map((scaling, index) => {
          if (
            getSpecialParams(scaling.parameter) &&
            currentFocusSkill!.scaling
          ) {
            const perStats = 25;
            const detail = getSpecialParams(scaling.parameter)?.detail;
            const prefix = getSpecialParams(scaling.parameter)?.prefix;
            const suffix = getSpecialParams(scaling.parameter)?.suffix;

            return (
              <Tab
                value={`${detail} Scaling: ${prefix}${
                  Number(scaling.scale) * perStats
                }${suffix} per ${perStats} INT (max ${
                  scaling.maximum
                }${suffix})`}
                style="text-amber-500"
                key={index}
              />
            );
          }
          return null;
        })}

        <Tab value={`${currentSkill?.description.en}`} />
      </>
    );
  };

  const updateSkillLevel = (skillId: number, value: number) => {
    setFocusSkill(skillId);
    const pointCost = value * getSkillDataFromId(skillId)!.skillPoints;
    const maxSkillLevel = getSkillDataFromId(skillId)!.levels.length;
    if (userData.currentPoints < pointCost) return;
    const getUpdatedLevel = (level: number) => {
      let newLevel = level + value;
      let newPoints = userData.currentPoints;

      if (newLevel > maxSkillLevel) newLevel = maxSkillLevel;
      else if (newLevel <= -1) newLevel = 0;
      else newPoints -= pointCost;

      setUserData({ ...userData, currentPoints: newPoints });

      return newLevel;
    };

    const newSkillData = skillData.map((skills) =>
      skills.map((skill) =>
        skill.id === skillId
          ? { ...skill, level: getUpdatedLevel(skill.level) }
          : skill
      )
    );

    setSkillData(newSkillData);
  };

  return (
    <div className="mb-6 relative flex justify-between place-items-center min-h-[400px] before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[200px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
      <div className="group rounded-lg border border-transparent py-4 max-w-[75%]">
        <h2 className={`mb-3 text-2xl font-semibold`}>
          {focusSkill == 0
            ? wordCapitalize(userSecondJob)
            : `${getSkillDataFromId(focusSkill)?.name.en} ${
                currentFocusSkill!.level != 0
                  ? `Lv. ${getSkillLevelText(currentFocusSkill!.level, focusSkill, true)}`
                  : ``
              }`}
        </h2>
        {focusSkill == 0 ? (
          <p className={`m-0 lg:w-[40ch] text-sm opacity-50`}>
            {currentJob?.DESCRIPTION}
          </p>
        ) : (
          <SkillDescription />
        )}
      </div>
      <div className="max-w-[25%]">
        {/* {focusSkill !== undefined ? (
          <span
            className={`inline-block absolute z-20 -right-7 lg:-right-5 text-2xl font-bold -translate-x-10 translate-y-20 group-hover:scale-110 drop-shadow-[1px_1px_3px_#FF0000]`}
          >
            {textSkillLevel(currentFocusSkill!.level, focusSkill, false)}
          </span>
        ) : (
          <></>
        )} */}
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
          src={
            focusSkill
              ? `/skills/${currentSkill?.icon}`
              : `/class/character/${userSecondJob}.png?v1`
          }
          alt="descriptionImage"
          width={focusSkill ? 120 : 180}
          height={focusSkill ? 120 : 180}
          priority
          draggable={false}
        />

        <span className={`${isLvlButtonVisible} flex justify-between`}>
          <div
            className={`${transitionStyle} text-5xl inline-block text-green-400 hover:cursor-pointer`}
            onClick={() => updateSkillLevel(focusSkill, 1)}
          >
            +
          </div>
          <div
            className={`${transitionStyle} text-5xl inline-block text-red-400 hover:cursor-pointer`}
            onClick={() => updateSkillLevel(focusSkill, -1)}
          >
            -
          </div>
        </span>
      </div>
    </div>
  );
};
