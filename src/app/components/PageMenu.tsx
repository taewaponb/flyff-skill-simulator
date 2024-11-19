"use client";

import { wordCapitalize, getPoints } from "../helper/helper";
import { initialSkillData, initialUserData, useAppContext } from "./context";
import { JobChangeMenu } from "./JobChangeMenu";

export const PageMenu = () => {
  const { userData, setUserData, setSkillData, setJobChangeMenu } =
    useAppContext();

  const resetPoints = () => {
    if (confirm("Reset points and level to defaults?")) {
      setUserData(initialUserData);
      setSkillData(initialSkillData);
    }
  };

  const setLevel = () => {
    const usedPoints = userData.allPoints - userData.currentPoints;
    let level = prompt("Type your level (Max is 120)", "60");
    if (level === null) return;
    if (Number(level) < 15) level = "15";
    if (Number(level) > 120) level = "120";

    setUserData({
      ...userData,
      level: Number(level),
      currentPoints: getPoints(Number(level)) - usedPoints,
      allPoints: getPoints(Number(level)),
    });
  };

  const setClass = () => {
    setJobChangeMenu(true);
  };

  const menuData = [
    {
      header: "Points",
      detail: `${userData.currentPoints} / ${getPoints(userData.level)}`,
      function: () => resetPoints(),
    },
    {
      header: "Level",
      detail: `${userData.level}`,
      function: () => setLevel(),
    },
    {
      header: "Job",
      detail: `${wordCapitalize(userData.class[1])}`,
      function: () => setClass(),
    },
  ];

  const descriptionBox = (data: {
    header: string;
    detail: string;
    function?: () => void;
  }) => {
    return (
      <button
        key={data.header}
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        onClick={data.function}
      >
        <p className={`m-0 opacity-50`}>{data.header}</p>
        <h2 className={`mb-3 text-2xl font-semibold`}>{data.detail}</h2>
      </button>
    );
  };

  return (
    <div className="grid text-center lg:mb-0 lg:grid-cols-3 hover:cursor-pointer gap-x-2">
      {menuData.map((data) => descriptionBox(data))}
      <JobChangeMenu />
    </div>
  );
};
