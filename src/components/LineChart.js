import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import reactAddonsUpdate from 'react-addons-update';

import {LineChart} from 'react-native-mp-android-chart';

class LineChartScreen extends React.Component {

  constructor(props) {
    super();

    this.state = {
      data: {},
      legend: {
        enabled: true,
        textColor: 'black',
        textSize: 20,
        position: 'BELOW_CHART_LEFT',
        form: 'SQUARE',
        formSize: 24,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5,
        fontFamily: 'monospace',
        fontStyle: 2,
        custom: {
          colors: ['blue'],
          labels: [props.label]
        }
      },
      marker: {
        enabled: true,
        type: 'oval',
        backgroundTint: 'teal'
      }
    };
  }

  componentDidMount() {
    this.setState(
      reactAddonsUpdate(this.state, {
        data: {
          $set: {
            datasets: [{
              yValues: this.props.data,
              label: this.props.label,
              config: {
                lineWidth: 2,
                drawCircles: false,
                drawCubic: true,
                highlightColor: 'blue',
                color: 'blue',
                drawFilled: true,
                fillColor: 'blue',
                fillAlpha: 60,
                dashedLine: {
                  lineLength: 20,
                  spaceLength: 20
                }
              }
            }],
            xValues: Array.from(new Array(25), (val, i) => ''+ (i))
          }
        }
      })
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <LineChart
          style={styles.chart}
          data={this.state.data}
          description={{text: ''}}
          legend={this.state.legend}
          marker={this.state.marker}

          drawGridBackground={false}
          borderColor={'teal'}
          borderWidth={1}
          drawBorders={true}

          touchEnabled={true}
          dragEnabled={true}
          scaleEnabled={true}
          scaleXEnabled={true}
          scaleYEnabled={true}
          pinchZoom={true}
          doubleTapToZoomEnabled={true}

          dragDecelerationEnabled={true}
          dragDecelerationFrictionCoef={0.99}

          keepPositionOnRotation={false}

          yAxis={{
            left: {
              axisMaxValue: 10,
              axisMinValue: 0
            },
            right: {
              axisMaxValue: 10,
              axisMinValue: 0
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginVertical: 20
  },
  chart: {
    flex: 1,
    height: 500
  }
});

AppRegistry.registerComponent('LineChartScreen', () => LineChartScreen);

export default LineChartScreen;