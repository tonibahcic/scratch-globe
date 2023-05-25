import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import Globe from "react-globe.gl";
import geojson from './data/countries.json';

// docs https://www.npmjs.com/package/react-globe.gl#polygons-layer
// countries https://github.com/vasturiano/react-globe.gl/blob/master/example/datasets/ne_110m_admin_0_countries.geojson

function App() {
  const [countries, setCountries] = useState<any>({features: []});
  const [hoverD, setHoverD] = useState();

  useEffect(() => {
    setCountries(geojson.features)
    console.log(geojson.features[0])
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Globe
          // polygonsData={[geojson.features[0]]} // works
          polygonsData={geojson.features}
          // globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          lineHoverPrecision={0}
          polygonAltitude={0.01}
          // polygonCapColor={d => d === hoverD ? 'steelblue' : colorScale(getVal(d))}
          polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'} // sides
          polygonStrokeColor={() => '#111'} // borders
          // polygonLabel={}
          // onPolygonHover={setHoverD}
          polygonsTransitionDuration={300}
        />
      </header>
    </div>
  );
}

export default App;
