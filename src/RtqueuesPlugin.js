import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';

import reducers, { namespace } from './states';

const PLUGIN_NAME = 'RtqueuesPlugin';

export default class RtqueuesPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
    this.registerReducers(manager);

    const TotalTasks30Min = (workerQueue) =>
  // QueuesDataTableCell component helps us render additional expandable rows with channel specific data
  <flex.QueuesStats.QueuesDataTableCell
    // Pass the queue data down 
    queue={workerQueue}
    // Render the queue level value
    renderQueueData={(queue) => queue.sla_30_min?.total_tasks_count}
    // Render a value for each active channel in the queue
    renderChannelData={(channel, queue) => channel.sla_30_min?.total_tasks_count} 
  />

const TotalTasksToday = (workerQueue) =>
  <flex.QueuesStats.QueuesDataTableCell 
    queue={workerQueue}
    renderQueueData={(queue) => queue.sla_today?.total_tasks_count}
    renderChannelData={(channel, queue) => channel.sla_today?.total_tasks_count}
  />


flex.QueuesStats.QueuesDataTable.Content.add(
  <flex.ColumnDefinition
    key="total-tasks-30min"
    header="Total Tasks"
    // Since our columns have the same header, we can set
    // the same headerColSpanKey on both to merge their headers.
    headerColSpanKey="total-tasks"
    subHeader="30 min"
    content={TotalTasks30Min}
  />
  ,
    { sortOrder: 5 } 
);

flex.QueuesStats.QueuesDataTable.Content.add(
  <flex.ColumnDefinition
    key="total-tasks-today"
    header="Total Tasks"
    headerColSpanKey="total-tasks"
    subHeader="Today"
    content={TotalTasksToday}
  />
  ,
    { sortOrder: 5 } 
);


  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint-disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
