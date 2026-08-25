import React from 'react';
import { Check, Clock, FileCheck, Award, ArrowRight } from 'lucide-react';

export const TimelineTracker = ({ timeline = [], currentStatus = '' }) => {
  // Standard stages list
  const defaultStages = [
    { stage: "Submitted", title: "Application Submitted", icon: FileCheck },
    { stage: "Under Verification", title: "Under Verification", icon: Clock },
    { stage: "Department Processing", title: "Department Review", icon: Clock },
    { stage: "Approved", title: "Approved & Issued", icon: Award }
  ];

  const getStageState = (stageName, index) => {
    const matched = timeline.find(t => t.stage.toLowerCase() === stageName.toLowerCase());
    if (matched) {
      return matched.status || (currentStatus.toLowerCase() === stageName.toLowerCase() ? 'current' : 'completed');
    }

    const curIndex = defaultStages.findIndex(s => s.stage.toLowerCase() === currentStatus.toLowerCase());
    if (curIndex === -1) {
      return index === 0 ? 'completed' : 'upcoming';
    }

    if (index < curIndex) return 'completed';
    if (index === curIndex) return 'current';
    return 'upcoming';
  };

  const getPercentage = () => {
    const curIndex = defaultStages.findIndex(s => s.stage.toLowerCase() === currentStatus.toLowerCase());
    if (curIndex === -1) return 25;
    return ((curIndex + 1) / defaultStages.length) * 100;
  };

  return (
    <div style={{ padding: '1rem 0' }}>
      <div className="timeline-container">
        <div className="timeline-progress-bar">
          <div
            className="timeline-progress-fill"
            style={{ width: `${getPercentage()}%` }}
          />
        </div>

        {defaultStages.map((step, idx) => {
          const state = getStageState(step.stage, idx);
          const matchedItem = timeline.find(t => t.stage.toLowerCase() === step.stage.toLowerCase());
          const IconComp = step.icon;

          return (
            <div key={idx} className={`timeline-step ${state}`}>
              <div className="timeline-icon-box">
                {state === 'completed' ? <Check size={20} /> : <IconComp size={20} />}
              </div>
              <div className="timeline-step-title">{step.title}</div>
              <div className="timeline-step-time">
                {matchedItem?.timestamp && matchedItem.timestamp !== 'Pending' ? matchedItem.timestamp : (state === 'upcoming' ? 'Pending' : 'In Progress')}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
