import React, { useEffect, useState } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import 'highcharts/highcharts-more'
import 'highcharts/modules/exporting'

import SalariesHelper from '../../helpers/SalariesHelper'
import StateHelper from '../../helpers/StateHelper'
import chartOptions from '../../data/chartOptions'
import Controls from './Controls/'
import Notice from './Notice'

import '../../styles/Report.css'

const Report = () => {
  const Salaries = new SalariesHelper(require('../../data/salaries.json'))
  const States = new StateHelper(require('../../data/states.json'))

  const [states, setStates] = useState(['NY', 'CA', 'AZ'])
  const [config, setConfig] = useState({})

  const buildSeries = stateList => {
    const selected = stateList.length > 0 ? stateList : states
    return selected.map(stateId => ({
      data: Salaries.getSeries(stateId),
      name: States.getName(stateId)
    }))
  }

  const getConfig = stateList => ({
    ...chartOptions,
    series: buildSeries(stateList)
  })

  const handleControlChange = v => {
    if (!states.includes(v.newState)) {
      const updatedStates = [...states, v.newState]
      setStates(updatedStates)
      setConfig(getConfig(updatedStates))

      // mixpanel?.track?.('Add State', {
      //   State: States.states[v.newState]
      // })
    }
  }

  const handleDeleteState = key => {
    const updatedStates = states.filter(state => state !== key)
    setStates(updatedStates)
    setConfig(getConfig(updatedStates))

    // mixpanel?.track?.('Remove State', {
    //   State: States.states[key]
    // })
  }

  useEffect(() => {
    setConfig(getConfig(states))
  }, []) // run once on mount

  useEffect(() => {
    const selectedStates = States.getByKeys(states)
    const stateNamesToTrack = selectedStates.map(state => state.label)

    // mixpanel?.track?.('Salary Comparison', {
    //   States: stateNamesToTrack
    // })
  }, [states])

  const selectedStates = States.getByKeys(states)

  return (
    <div className="Report">
      {states.length > 0 ? (
        <HighchartsReact
          highcharts={Highcharts}
          constructorType="chart"
          options={config}
        />
      ) : (
        <Notice />
      )}
      <Controls
        onControlChange={handleControlChange}
        onDeleteState={handleDeleteState}
        selectedStates={selectedStates}
      />
    </div>
  )
}

export default Report
