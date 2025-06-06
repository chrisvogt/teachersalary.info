import React, { useEffect, useState, useMemo, useCallback } from 'react'

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
  // Initialize helpers once
  const Salaries = useMemo(() => new SalariesHelper(require('../../data/salaries.json')), [])
  const States = useMemo(() => new StateHelper(require('../../data/states.json')), [])

  const [states, setStates] = useState(['NY', 'CA', 'AZ'])
  const [config, setConfig] = useState({})

  // Memoize buildSeries to prevent recreation on every render
  const buildSeries = useCallback((stateList) => {
    return stateList.map(stateId => ({
      data: Salaries.getSeries(stateId),
      name: States.getName(stateId)
    }))
  }, [Salaries, States])

  // Memoize getConfig to prevent recreation on every render
  const getConfig = useCallback((stateList) => ({
    ...chartOptions,
    series: buildSeries(stateList)
  }), [buildSeries])

  const handleControlChange = useCallback((v) => {
    if (!states.includes(v.newState)) {
      const updatedStates = [...states, v.newState]
      setStates(updatedStates)
      setConfig(getConfig(updatedStates))

      // mixpanel?.track?.('Add State', {
      //   State: States.states[v.newState]
      // })
    }
  }, [states, getConfig])

  const handleDeleteState = useCallback((key) => {
    const updatedStates = states.filter(state => state !== key)
    setStates(updatedStates)
    setConfig(getConfig(updatedStates))

    // mixpanel?.track?.('Remove State', {
    //   State: States.states[key]
    // })
  }, [states, getConfig])

  // Update config when states change
  useEffect(() => {
    setConfig(getConfig(states))
  }, [states, getConfig])

  // Track state changes
  // useEffect(() => {
  //   const selectedStates = States.getByKeys(states)
  //   const stateNamesToTrack = selectedStates.map(state => state.label)

  //   mixpanel?.track?.('Salary Comparison', {
  //     States: stateNamesToTrack
  //   })
  // }, [states, States])

  const selectedStates = States.getByKeys(states)

  return (
    <div className="Report">
      {states.length > 0 ? (
        <HighchartsReact
          highcharts={Highcharts}
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
