"use client";

import Image from "next/image";
import { useAppContext } from "./context";
import {
  wordCapitalize,
  getSkillContextFromId,
  getSkillDataFromId,
  validateSkillColor,
  getSkillLevelText,
} from "../helper/helper";
import { ISkillData } from "../data/interface";

const transitionStyle = `transition-transform motion-reduce:transform-none ease-in-out duration-250 transform active:scale-125`;

export const Skill = () => {
  const {
    userData,
    skillData,
    focusSkill,
    setSkillData,
    setUserData,
    setFocusSkill,
  } = useAppContext();

  const checkIsContainSkill = (skill: number) => skill !== 0;
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
    <div className="flex flex-col lg:flex-row lg:space-x-12">
      {userData.class.map((job, index) => (
        <div key={index} className="grid text-center">
          <p className={`p-2 opacity-50`}>{wordCapitalize(job)}</p>
          <div
            className={`grid text-center grid-cols-5 mb-6 lg:mb-0 hover:cursor-pointer`}
          >
            {skillData.map((data: ISkillData[], skillIndex: number) => (
              <div
                key={skillIndex}
                className={`grid text-center grid-rows-4 lg:mb-0 hover:cursor-pointer`}
              >
                {data.map((skill: ISkillData, dataIndex: number) => {
                  const lvlButtonVisible =
                    validateSkillColor(skill, skillData) != "grayscale"
                      ? "invisible" // force invisible (QOL experiment)
                      : "invisible";
                  const isFocus = focusSkill === skill.id;

                  return job === skill.class &&
                    checkIsContainSkill(skill.id) ? (
                    <span key={dataIndex} className="group relative">
                      <h2 className={`text-xs lg:text-3xl font-semibold`}>
                        <span
                          id="increaseLvlButton"
                          className={`${transitionStyle} ${lvlButtonVisible} ${
                            isFocus ? "-translate-x-1" : "translate-x-8"
                          } inline-block text-green-400`}
                          onClick={() => updateSkillLevel(skill.id, 1)}
                        >
                          +
                        </span>
                        <div
                          className={`relative inline-block border-2 ${
                            isFocus ? "border-yellow-500" : "border-transparent"
                          }`}
                        >
                          <Image
                            id={"skillImage"}
                            className={`${transitionStyle} ${validateSkillColor(skill, skillData)} ${
                              isFocus ? "scale-110" : "hover:scale-110"
                            } inline-block relative z-10 `}
                            src={`/skills/${getSkillDataFromId(skill.id)?.icon}`}
                            alt="skillImage"
                            width={40}
                            height={40}
                            priority
                            draggable={false}
                            onClick={() =>
                              focusSkill === skill.id
                                ? setFocusSkill(0)
                                : setFocusSkill(skill.id)
                            }
                          />
                        </div>
                        <span
                          className={`${transitionStyle} inline-block absolute z-20 -right-7 lg:-right-5 text-sm -translate-x-10 translate-y-5 group-hover:scale-110 drop-shadow-[1px_1px_3px_#FF0000]`}
                          onClick={() => setFocusSkill(skill.id)}
                        >
                          {getSkillLevelText(skill.level, skill.id, false)}
                        </span>
                        <span
                          id="decreaseLvlButton"
                          className={`${transitionStyle} ${lvlButtonVisible} ${
                            isFocus ? "translate-x-1" : "-translate-x-8"
                          } inline-block text-red-400`}
                          onClick={() => updateSkillLevel(skill.id, -1)}
                        >
                          -
                        </span>
                      </h2>
                    </span>
                  ) : (
                    <span key={dataIndex} />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
