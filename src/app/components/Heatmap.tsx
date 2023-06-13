'use client'

import React, { useState, useEffect } from 'react';
import * as Plot from '@observablehq/plot';

type WeatherData = {
    date: string;
    precipitation: number;
    temp_max: number;
    temp_min: number;
    wind: number;
    weather: string;
};

export default function Heatmap() {
    const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
    
    useEffect(() => {
        fetch('http://127.0.0.1:8000/data')
        .then(response => response.json())
        .then(data => {
            const processedData = data.data.map((d: WeatherData) => ({
                ...d,
                date: new Date(d.date),
            }));
            setWeatherData(processedData);
        })
        .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (weatherData.length > 0) {
            const chart = Plot.plot({
                padding: 0,
                y: {tickFormat: Plot.formatMonth("en", "short")},
                marks: [
                    Plot.cell(weatherData, Plot.group({fill: "max"}, {
                        x: (d: any) => d.date.getUTCDate(),
                        y: (d: any) => d.date.getUTCMonth(),
                        fill: (d: any) => d.temp_max,
                        inset: 0.7,
                        tip: true
                    }))
                ]
            });
            document.getElementById('chart')?.appendChild(chart);
        }
    }, [weatherData]);

    return <div id="chart"></div>
}