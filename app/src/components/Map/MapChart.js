import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    ComposableMap,
    Geographies,
    Geography,
    Sphere,
    Graticule
  } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import ReactTooltip from "react-tooltip";
import missingGeoMamesList from './missingGeoNamesList';
import { useEffect } from 'react';

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-50m.json';

const colorScale = value => {
  const color = scaleLinear()
  .domain([0, 100, 1000, 3000, 90000])
  .range([
    "#FFC0A8",
    "#FFAB8C",
    "#F26149",
    "#C73B29",
    "#9D0B0B"
  ]);
  return color(value);
}

const MapChart = () => {
  const data = useSelector(state => state.data.Countries);
  const [toolTipContent, setToolTipContent] = useState('');

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [toolTipContent]);

  return (
    <>
      <ComposableMap height={400}
          projectionConfig={{
              rotate: [-10, 0, 0],
              scale: 147
          }}
      >
        <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
        {data && (
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                let d = data.find(countryData => countryData.Country === geo.properties.NAME);
                if(!d) {
                  d = data.find(countryData => countryData.Country === missingGeoMamesList[geo.properties.ISO_A3]);
                }
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={d ? colorScale(d.TotalConfirmed) : "lightgray"}
                    strokeWidth={0.3}
                    data-tip={d ? `${d.Country}: ${d.TotalConfirmed} cases` : ''}
                    onMouseEnter={() => {
                      d ? setToolTipContent(`${d.Country}: ${d.TotalConfirmed} cases`) : setToolTipContent("");
                    }}
                    onMouseLeave={() => {
                      setToolTipContent("");
                    }}
                    style={{
                      default: {
                        outline: "none"
                      },
                      hover: {
                        fill: d ? "#F53" : 'lightgray',
                        outline: "none",
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none"
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
        )}
      </ComposableMap>
      <ReactTooltip />
    </>
  )
};

export default MapChart