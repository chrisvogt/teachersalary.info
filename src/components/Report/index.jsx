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
          // Initially just show state name
          return params.seriesName;
        },
        distance: 10,
        backgroundColor: 'rgba(33, 33, 33, 0.8)',
        padding: [4, 8],
        borderRadius: 4
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
      const updatedStates = [...states, v.newState];
      setStates(updatedStates);
      
      // Get initial config
      const initialConfig = getConfig(updatedStates);
      
      // Set initial label for new state to just show state name
      const newStateIndex = updatedStates.length - 1;
      initialConfig.series[newStateIndex].endLabel.formatter = function(params) {
        return params.seriesName;
      };
      
      setConfig(initialConfig);

      // Update just the new state's label after animation
      const timer = setTimeout(() => {
        setConfig(prevConfig => ({
          ...prevConfig,
          series: prevConfig.series.map((series, index) => {
            if (index === newStateIndex) {
              return {
                ...series,
                endLabel: {
                  ...series.endLabel,
                  formatter: function(params) {
                    return params.seriesName + ': $' + params.data.Salary.toLocaleString();
                  }
                }
              };
            }
            return series;
          })
        }));
      }, 2800);

      return () => clearTimeout(timer);
    }
  }, [states, getConfig])

  const handleDeleteState = useCallback((key) => {
    const updatedStates = states.filter(state => state !== key)
    setStates(updatedStates)
    setConfig(getConfig(updatedStates))
  }, [states, getConfig])

  // Update config when states change
  useEffect(() => {
    const initialConfig = getConfig(states);
    setConfig(initialConfig);

    // Update labels just before the main animation completes
    const timer = setTimeout(() => {
      setConfig(prevConfig => ({
        ...prevConfig,
        series: prevConfig.series.map(series => ({
          ...series,
          endLabel: {
            ...series.endLabel,
            formatter: function(params) {
              return params.seriesName + ': $' + params.data.Salary.toLocaleString();
            }
          }
        }))
      }));
    }, 2800); // Update just before the main animation completes (3000ms)

    return () => clearTimeout(timer);
  }, [states, getConfig]);

  const selectedStates = States.getByKeys(states)

  return (
    <div className="Report">
      {states.length > 0 ? (
        <ReactECharts
          option={config}
          style={{ height: '400px' }}
          opts={{ renderer: 'svg' }}
          onChartReady={(chart) => {
            // Initially hide all end labels
            states.forEach((stateId, index) => {
              const seriesIndex = index;
              chart.dispatchAction({
                type: 'hideTip',
                seriesIndex: seriesIndex
              });
            });

            // After main animation, show end labels with delay
            setTimeout(() => {
              states.forEach((stateId, index) => {
                const seriesIndex = index;
                setTimeout(() => {
                  chart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: seriesIndex
                  });
                }, index * 100); // Stagger the animations
              });
            }, 2000); // Wait for main chart animation
          }}
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
