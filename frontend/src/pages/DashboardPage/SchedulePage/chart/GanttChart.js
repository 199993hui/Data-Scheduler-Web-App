import React from "react";
import {
  Gantt,
  Task,
  EventOption,
  StylingOption,
  ViewMode,
  DisplayOption,
} from "gantt-task-react";
import "gantt-task-react/dist/index.css";

function GanttChart({data}) {
  return <Gantt tasks={data} />;
}

export default GanttChart;
