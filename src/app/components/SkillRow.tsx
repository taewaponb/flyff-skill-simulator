"use client";

import Image from "next/image";
import { ISkillData } from "../data/interfaces";
import {
  getSkillDataFromId,
  getSkillLevelText,
  validateSkillColor,
} from "../helper/helper";
import { useAppContext } from "../context";

interface SkillRowProps {
  skills: ISkillData[];
}

const transitionStyle = `transition-transform motion-reduce:transform-none ease-in-out duration-250 transform active:scale-125`;

export const SkillRow: React.FC<SkillRowProps> = ({ skills }) => {
  const { skillData, focusSkill, setFocusSkill } = useAppContext();
  const columnLength = skills.length ?? "5";

  const renderSkillButtons = (skill: ISkillData, isFocus: boolean) => {
    return (
      <h2 className="text-xs lg:text-3xl font-semibold">
        <div
          className={`relative inline-block border-2 ${
            isFocus ? "border-yellow-500" : "border-transparent"
          }`}
        >
          <Image
            id="skillImage"
            className={`${transitionStyle} ${validateSkillColor(skill, skillData)} ${
              isFocus ? "scale-110" : "hover:scale-110"
            } inline-block relative z-10 hover:cursor-pointer`}
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
          className={`${transitionStyle} inline-block absolute z-20 -right-7 lg:-right-0 text-sm -translate-x-10 translate-y-6 group-hover:scale-110 drop-shadow-[1px_1px_3px_#FF0000]`}
          onClick={() => setFocusSkill(skill.id)}
        >
          {getSkillLevelText(skill.level, skill.id, false)}
        </span>
        <span
          className={`${skill.arrow ? "visible" : "invisible"} scale-75 inline-block text-yellow-400`}
        >
          →
        </span>
      </h2>
    );
  };

  return (
    <div className={`grid text-center grid-cols-${columnLength} lg:mb-0`}>
      {skills.map((skill, index) => (
        <span key={index} className="group relative">
          {skill.id !== 0 && renderSkillButtons(skill, focusSkill === skill.id)}
        </span>
      ))}
    </div>
  );
};
