"use client";

import { useAppContext } from "../context";
import { wordCapitalize } from "../helper/helper";
import { SkillRow } from "./SkillRow";

export const SkillTree: React.FC = () => {
  const { userData, skillData } = useAppContext();

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-12">
      {userData.class.map((job) => (
        <div id={`${job}-tree`} key={job} className="grid text-center">
          <p className={`p-2 opacity-50`}>{wordCapitalize(job)}</p>
          <div className={`grid text-center mb-6 lg:mb-0`}>
            {skillData
              .filter((data) => data.some((skill) => skill.class === job))
              .map((skills, skillIndex) => (
                <SkillRow key={skillIndex} skills={skills} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};
