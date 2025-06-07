import React, { useEffect, useState, useMemo, useCallback } from 'react'
import ReactECharts from 'echarts-for-react'

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
      type: 'line',
      name: States.getName(stateId),
      data: Salaries.getSeries(stateId),
      showSymbol: false,
      emphasis: {
        focus: 'series'
      }
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
    }
  }, [states, getConfig])

  const handleDeleteState = useCallback((key) => {
    const updatedStates = states.filter(state => state !== key)
    setStates(updatedStates)
    setConfig(getConfig(updatedStates))
  }, [states, getConfig])

  // Update config when states change
  useEffect(() => {
    setConfig(getConfig(states))
  }, [states, getConfig])

  const selectedStates = States.getByKeys(states)

  return (
    <div className="Report">
      {states.length > 0 ? (
        <ReactECharts
          option={config}
          style={{ height: '400px' }}
          opts={{ renderer: 'svg' }}
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
