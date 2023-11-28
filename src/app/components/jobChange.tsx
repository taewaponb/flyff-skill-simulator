import Image from "next/image";
import { useAppContext } from "../components/context";
import { getFistClass, wordCapitalize } from "../helper/helper";
import { JOB } from "../data/enum";

export const JobChangeMenu = () => {
  const { userData, jobChangeMenu, setJobChangeMenu, setUserData } =
    useAppContext();
  const transitionStyle = `transition-transform motion-reduce:transform-none ease-in-out duration-500`;

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
    JOB.RANGER,
    JOB.JESTER,
    JOB.ELEMENTOR,
    JOB.PSYCHIKEEPER,
    JOB.BILLPOSTER,
  ];

  const onJobChange = (index: number) => {
    const secondJob = classList[index];
    const fistJob = getFistClass(secondJob) || userData.class[0];

    setUserData({ ...userData, class: [fistJob, secondJob] });
    setJobChangeMenu(false);
  };

  const jobDisplay = () =>
    classList.map((job, index) => {
      if (unavailableList.includes(job))
        return (
          <div key={index} className="flex flex-col w-1/12 items-center group">
            <Image
              className={`${transitionStyle} w-full object-fit group-hover:scale-110 grayscale`}
              src={`/class/target/${job}.png?v1`}
              alt="jobMenuTargetImage"
              width={100}
              height={100}
              draggable={false}
            />
            <span className="font-bold">{wordCapitalize(job)}</span>
          </div>
        );
      else
        return (
          <div key={index} className="flex flex-col w-1/12 items-center group">
            <Image
              className={`${transitionStyle} w-full object-fit group-hover:scale-110`}
              src={`/class/target/${job}.png?v1`}
              alt="jobMenuTargetImage"
              width={100}
              height={100}
              draggable={false}
              onClick={() => onJobChange(index)}
            />
            <span className="font-bold">{wordCapitalize(job)}</span>
          </div>
        );
    });

  return jobChangeMenu ? (
    <div className="fixed z-50 inset-0 overflow-y-auto cursor-default">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
          onClick={() => setJobChangeMenu(false)}
        >
          <div className="flex flex-col  relative top-1/3 justify-center">
            <span className="font-bold mb-6">Select your class</span>
            <div className="flex flex-row  relative top-1/3 justify-center cursor-pointer">
              {jobDisplay()}
            </div>
          </div>
        </div>
        di
      </div>
    </div>
  ) : null;
};
