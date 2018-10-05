import React, { Component } from 'react';
import Svg,{
    Polygon,
    Line,
    Text,
} from 'react-native-svg';

export default class RadarChart extends Component
{
    equal(a, b) {
        return Math.abs(a - b) < Number.EPSILON;
    }

    renderChart() {
        let ringCount = 4;
        let normalizedInnerRadius = 0.1;
        let normalizedOuterRadius = 0.7;
        let scores = {
            "C++": 0.85,
            "JS": 0.65,
            "Lua": 0.6,
            "Go": 0.5,
            "Java": 0.75,
        };

        let chart = [];
        let halfWidth = this.props.width * 0.5;
        let halfHeight = this.props.height * 0.5;
        let fontSize = Math.min(halfWidth, halfHeight) * 0.07;

        let keys = Object.keys(scores);
        let values = Object.values(scores);
        let numProperties = keys.length;


        for(let i = 0; i < ringCount; ++ i) {
            let t = i / (ringCount - 1);
            let normalizedRadius = normalizedInnerRadius * t + normalizedOuterRadius * (1 - t);
            let points = [];
            for(let j = 0; j < numProperties; ++ j) {
                let degree = (Math.PI * 2 * j / numProperties) + (Math.PI / 2);
                points.push(Math.cos(degree) * halfWidth * normalizedRadius + halfWidth);
                points.push(halfHeight - Math.sin(degree) * halfHeight * normalizedRadius);
            }
            chart.push(
                <Polygon points = {points} fill="none" stroke="gray"/>
            );
        }

        let points = [];
        for(let j = 0; j < numProperties; ++ j) {
            let degree = (Math.PI * 2 * j / numProperties) + (Math.PI / 2);
            let width = Math.cos(degree) * halfWidth;
            let height = Math.sin(degree) * halfHeight;

            chart.push(
                <Line x1={halfWidth}
                      y1={halfHeight}
                      x2={normalizedOuterRadius * width + halfWidth}
                      y2={halfHeight - normalizedOuterRadius * height}
                      stroke="gray"
                />
            );

            let textAnchor;
            if(this.equal(degree, Math.PI * 0.5) || this.equal(degree, Math.PI * 1.5)) {
                textAnchor = "middle";
            }
            else if(degree > Math.PI * 0.5 && degree < Math.PI * 1.5) {
                textAnchor = "end";
            }
            else {
                textAnchor = "start";
            }
            chart.push(
                <Text x={normalizedOuterRadius * width * 1.08 + halfWidth}
                      y={halfHeight - normalizedOuterRadius * height * 1.08}
                      fontSize={fontSize}
                      textAnchor={textAnchor}
                >
                    {keys[j]}
                </Text>
            );

            let normalizedRadius = normalizedOuterRadius * values[j];
            points.push(Math.cos(degree) * halfWidth * normalizedRadius + halfWidth);
            points.push(halfHeight - Math.sin(degree) * halfHeight * normalizedRadius);
        }
        chart.push(
            <Polygon points = {points} fill="black" fillOpacity="0.4" stroke="black" strokeWidth="2.5" strokeOpacity="0.5"/>
        );


        return chart;
    }
    render() {
        const {
            width,
            height,
        } = this.props;



        return (
            <Svg width={width} height={height}>
                {this.renderChart()}
            </Svg>
        );
    }
}
