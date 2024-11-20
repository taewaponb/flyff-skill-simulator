import Image from "next/image";
import { useAppContext, initialSkillData } from "../context";
import { getFistClass, wordCapitalize } from "../helper/helper";
import { JOB } from "../data/enums";

const transitionStyle = `transition-transform motion-reduce:transform-none ease-in-out duration-500`;

export const JobChangeMenu: React.FC = () => {
  const {
    userData,
    jobChangeMenu,
    setJobChangeMenu,
    setUserData,
    setSkillData,
    setFocusSkill,
  } = useAppContext();

  const classList = [
    JOB.KNIGHT,
    JOB.BLADE,
    JOB.RANGER,
    JOB.JESTER,
    JOB.ELEMENTOR,
    JOB.PSYCHIKEEPER,
    JOB.RINGMASTER,
    JOB.BILLPOSTER,
  ];

  const unavailableList = [
    JOB.KNIGHT,
    JOB.BLADE,
    JOB.JESTER,
    JOB.ELEMENTOR,
    JOB.PSYCHIKEEPER,
  ];

  const onJobChange = (index: number) => {
    const secondJob = classList[index];
    const fistJob = getFistClass(secondJob) || userData.class[0];

    setFocusSkill(0);
    setSkillData(initialSkillData);
    setUserData({ ...userData, class: [fistJob, secondJob] });
    setJobChangeMenu(false);
  };

  const JobDisplay = () => {
    return (
      <>
        {classList.map((job, index) => {
          return (
            <div
              key={index}
              className="flex flex-col w-1/12 items-center group"
            >
              <Image
                className={`${transitionStyle} w-full object-fit group-hover:scale-110`}
                src={`/class/target/${job}.png?v1`}
                alt="jobMenuTargetImage"
                width={100}
                height={100}
                draggable={false}
                onClick={() => onJobChange(index)}
              />
              <span className="font-bold">
                {wordCapitalize(job)}
                {unavailableList.includes(job) ? (
                  <span className="text-red-500">*</span>
                ) : null}
              </span>
            </div>
          );
        })}
      </>
    );
  };

  return jobChangeMenu ? (
    <div className="fixed z-50 inset-0 overflow-y-auto cursor-default">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-black bg-opacity-95 transition-opacity"
          onClick={() => setJobChangeMenu(false)}
        >
          <div className="flex flex-col  relative top-1/3 justify-center">
            <span className="font-bold text-xl">SELECT YOUR CLASS</span>
            <span className="text-xs text-gray-300 mb-6">
              (Class marked with <span className="text-red-500">*</span> uses
              only API data and has not been verified with in-game data)
            </span>
            <div className="flex flex-row relative top-1/3 justify-center cursor-pointer mb-12">
              <JobDisplay />
            </div>
            <span className="hover:cursor-pointer">Cancel</span>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
