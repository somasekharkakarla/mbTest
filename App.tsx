/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {View} from 'react-native';
import Mapbox from '@rnmapbox/maps';
import {geoData} from './geoData';
Mapbox.setAccessToken('<MAPBOX-TOKEN>');

const getBoundingBox = (screenCoords: any) => {
  const maxX = Math.max(screenCoords[0][0], screenCoords[1][0]);
  const minX = Math.min(screenCoords[0][0], screenCoords[1][0]);
  const maxY = Math.max(screenCoords[0][1], screenCoords[1][1]);
  const minY = Math.min(screenCoords[0][1], screenCoords[1][1]);
  return [maxY, maxX, minY, minX];
};
const layerStyles = {
  fillStyles: {
    lineColor: '#000000',
    // fillOpacity: 0,
  },
  lineStyles: {
    lineColor: '#000000',
    lineOpacity: 1.0,
    lineWidth: 1.0,
  },

  fillLineStyles: {
    fillOpacity: 0.5,
    fillColor: '#000000',
    fillOutlineColor: '#000000',
  },
  pointStyles: {
    circleRadius: 2.0,
    circleColor: '#000000',
    circleOpacity: 1.0,
  },
  selectedLineStyle: {
    lineColor: '#000000',
    lineWidth: 2.5,
    lineDasharray: [2, 1],
  },
  selectedPointStyles: {
    circleRadius: 5.0,
    circleColor: '#000000',
    circleOpacity: 1.0,
  },
};

function App(): JSX.Element {
  let mapComponentView: any = null;

  const featureTypeIDFilter = [
    'to-boolean',
    [
      'match',
      ['get', 'featureType'],
      ...[null, 1, 0], // replace null with asdfadsf to work
    ],
  ];

  const onMapPress = (layers: any) => {
    // noinspection JSUnresolvedVariable
    const boundingScreenBox = getBoundingBox([
      [
        layers.properties.screenPointX - 10,
        layers.properties.screenPointY - 10,
      ],
      [
        layers.properties.screenPointX + 10,
        layers.properties.screenPointY + 10,
      ],
    ]);

    const featurePointOfVectorsWithinRect =
      mapComponentView.queryRenderedFeaturesInRect(boundingScreenBox, null, [
        'fillLineString',
        'fillNoStatusLineString',
        'fillPolygon',
        'fillNoStatusPolygon',
        'fillThermalNoStatusPolygon',
        'fillThermalPolygon',
        'fillLineStringQueuedFeatures',
        'fillNoStatusLineStringQueuedFeatures',
        'fillPolygonQueuedFeatures',
        'fillNoStatusPolygonQueuedFeatures',
        'fillThermalNoStatusPolygonQueuedFeatures',
        'fillThermalPolygonQueuedFeatures',
      ]);

    featurePointOfVectorsWithinRect
      .then((selectedVector: any) => {
        if (selectedVector.features.length > 0) {
          console.log('selectedVector.features', selectedVector.features);
          // center: layers.geometry.coordinates,
        }
        console.warn('selectedVector', selectedVector.features[0]);
      })
      .catch((err: any) => {
        console.warn(err);
      });
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Mapbox.MapView
            style={{flex: 1}}
            ref={component => {
              mapComponentView = component;
            }}
            onPress={layers => onMapPress(layers)}>
            <Mapbox.ShapeSource
              id="featurePointShapeSource"
              shape={geoData}>
              <Mapbox.LineLayer id="fillLines" style={layerStyles.lineStyles} />
              <Mapbox.FillLayer
                id="fillLineStringPolygon"
                style={layerStyles.fillLineStyles}
              />

              <Mapbox.LineLayer
                id="linePolygon"
                style={layerStyles.fillStyles}
              />
              <Mapbox.FillLayer
                id="fillPolygon"
                style={layerStyles.fillLineStyles}
              />

              <Mapbox.CircleLayer
                id="fillCircles"
                filter={['all', ['==', ['geometry-type'], 'Point']]}
                style={layerStyles.pointStyles}
              />
            </Mapbox.ShapeSource>
            <Mapbox.Camera
              // minZoomLevel={mapMetaData.minzoom}
              zoomLevel={18}
              centerCoordinate={[-4.529621194, 37.131495923, 18]}
              animationMode="flyTo"
            />
          </Mapbox.MapView>
        </View>
      </View>
    </View>
  );
}

export default App;
