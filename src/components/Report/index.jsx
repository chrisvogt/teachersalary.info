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

  // Memoize buildDataset to prevent recreation on every render
  const buildDataset = useCallback((stateList) => {
    const datasets = [{
      id: 'dataset_raw',
      source: stateList.map(stateId => {
        const series = Salaries.getSeries(stateId)
        return series.map((value, index) => ({
          State: States.getName(stateId),
          Year: chartOptions.xAxis.data[index],
          Salary: Number(value) // Ensure value is a number
        }))
      }).flat()
    }]

    // Add filtered datasets for each state
    stateList.forEach(stateId => {
      datasets.push({
        id: `dataset_${stateId}`,
        fromDatasetId: 'dataset_raw',
        transform: {
          type: 'filter',
          config: {
            and: [
              { dimension: 'State', '=': States.getName(stateId) }
            ]
          }
        }
      })
    })

    return datasets
  }, [Salaries, States])

  // Memoize buildSeries to prevent recreation on every render
  const buildSeries = useCallback((stateList) => {
    return stateList.map(stateId => ({
      type: 'line',
      datasetId: `dataset_${stateId}`,
      name: States.getName(stateId),
      showSymbol: false,
      endLabel: {
        show: true,
        formatter: function(params) {
          return params.name + ': $' + params.data.Salary.toLocaleString()
        }
      },
      labelLayout: {
        moveOverlap: 'shiftY'
      },
      emphasis: {
        focus: 'series'
      },
      encode: {
        x: 'Year',
        y: 'Salary',
        label: ['State', 'Salary'],
        itemName: 'Year',
        tooltip: ['Salary']
      }
    }))
  }, [States])

  // Memoize getConfig to prevent recreation on every render
  const getConfig = useCallback((stateList) => ({
    ...chartOptions,
    dataset: buildDataset(stateList),
    series: buildSeries(stateList),
    tooltip: {
      ...chartOptions.tooltip,
      formatter: function(params) {
        let result = params[0].axisValue + '<br/>';
        params.forEach(param => {
          result += param.marker + ' ' + param.seriesName + ': $' + param.data.Salary.toLocaleString() + ' dollars<br/>';
        });
        return result;
      }
    }
  }), [buildDataset, buildSeries])

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
