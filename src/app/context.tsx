"use client";

import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { JOB } from "./data/enums";
import { IUserData, ISkillData } from "./data/interfaces";
import { assistSkillTree } from "./data/skillTree/assist";
import { ringmasterSkillTree } from "./data/skillTree/ringmaster";
import { billposterSkillTree } from "./data/skillTree/billposter";
import { acrobatSkillTree } from "./data/skillTree/acrobat";
import { rangerSkillTree } from "./data/skillTree/ranger";

export const initialUserData = {
  id: 1,
  class: [JOB.ACROBAT, JOB.RANGER],
  level: 60,
  currentPoints: 338,
  allPoints: 338,
};

export const initialSkillData = [
  ...assistSkillTree,
  ...ringmasterSkillTree,
  ...billposterSkillTree,
  ...acrobatSkillTree,
  ...rangerSkillTree,
] as ISkillData[][];

const AppContext = createContext<{
  userData: IUserData;
  skillData: ISkillData[][];
  focusSkill: number;
  jobChangeMenu: boolean;
  setUserData: React.Dispatch<React.SetStateAction<IUserData>>;
  setSkillData: React.Dispatch<React.SetStateAction<ISkillData[][]>>;
  setFocusSkill: React.Dispatch<React.SetStateAction<number>>;
  setJobChangeMenu: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  userData: initialUserData,
  skillData: initialSkillData,
  focusSkill: 0,
  jobChangeMenu: false,
  setUserData: () => {},
  setSkillData: () => {},
  setFocusSkill: () => {},
  setJobChangeMenu: () => {},
});

export const AppWrapper = ({ children }: { children: JSX.Element }) => {
  const [userData, setUserData] = useState<IUserData>(initialUserData);
  const [skillData, setSkillData] = useState<ISkillData[][]>(initialSkillData);
  const [focusSkill, setFocusSkill] = useState<number>(0);
  const [jobChangeMenu, setJobChangeMenu] = useState<boolean>(false);
  1;
  const sharedState = {
    userData,
    skillData,
    focusSkill,
    jobChangeMenu,
    setUserData,
    setSkillData,
    setFocusSkill,
    setJobChangeMenu,
  };

  useEffect(() => {
    const localUserData = JSON.parse(
      localStorage.getItem("userData") as string
    ) as IUserData;
    const localSkillData = JSON.parse(
      localStorage.getItem("skillData") as string
    ) as ISkillData[][];

    if (localUserData) setUserData(localUserData);
    if (localSkillData) setSkillData(localSkillData);
  }, []);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("skillData", JSON.stringify(skillData));
  }, [userData, skillData]);

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
