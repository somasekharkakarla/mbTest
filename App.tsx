/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import Mapbox from '@rnmapbox/maps';
Mapbox.setAccessToken('<MAPBOX TOKEN>');
Mapbox.setWellKnownTileServer('mapbox')

const featureLayerStyles = {
  fillStatusStyles: {
    fillColor: ['match', ['get', 'scanStatus', ['get', 'extraProperties']],
      'pending', 'rgb(204, 37, 53)',
      'inprogress', 'rgb(255, 231, 12)',
      'completed', 'rgb(99, 204, 35)',
      '#ccc'],
    fillOpacity: 1.0,
  },
  fillEmptyStyles: {
    fillOpacity: 1.0,
    fillColor: 'rgb(204, 37, 53)',
  },

  fillPolygonStyles: {
    fillColor: ['match', ['get', 'scanStatus', ['get', 'extraProperties']],
      'pending', 'rgb(204, 37, 53)',
      'inprogress', 'rgb(255, 231, 12)',
      'completed', 'rgb(99, 204, 35)',
      '#ccc'],
    fillOpacity: 1.0,
  },
  fillPolygonEmptyStyles: {
    fillOpacity: 1.0,
    fillColor: 'rgb(204, 37, 53)',
  },

  clickedFeatureStyle: {
    fillOpacity: 1.0,
    fillColor:"#0000FF",
  }
};

const getBoundingBox = (screenCoords:any) => {
  const maxX = Math.max(screenCoords[0][0], screenCoords[1][0]);
  const minX = Math.min(screenCoords[0][0], screenCoords[1][0]);
  const maxY = Math.max(screenCoords[0][1], screenCoords[1][1]);
  const minY = Math.min(screenCoords[0][1], screenCoords[1][1]);
  return [maxY, maxX, minY, minX];
};

function App(): JSX.Element {

 let mapComponentView:any=null


 const featureTypeIDFilter = [
      'to-boolean',
      [
        'match',
        ['get', 'featureType'],
        ...[null, 1, 0],   // replace null with asdfadsf to work
      ],
    ];

 const onMapPress = (layers:any) => {
  // noinspection JSUnresolvedVariable
  const boundingScreenBox = getBoundingBox([[layers.properties.screenPointX - 10,
    layers.properties.screenPointY - 10], [layers.properties.screenPointX + 10,
    layers.properties.screenPointY + 10]]);

  const featurePointOfVectorsWithinRect = mapComponentView.queryRenderedFeaturesInRect(
    boundingScreenBox, null, [
      'fillLineString', 'fillNoStatusLineString',
      'fillPolygon', 'fillNoStatusPolygon',
      'fillThermalNoStatusPolygon', 'fillThermalPolygon',
      'fillLineStringQueuedFeatures', 'fillNoStatusLineStringQueuedFeatures',
      'fillPolygonQueuedFeatures', 'fillNoStatusPolygonQueuedFeatures',
      'fillThermalNoStatusPolygonQueuedFeatures', 'fillThermalPolygonQueuedFeatures',
    ],
  );

  featurePointOfVectorsWithinRect.then((selectedVector:any) => {
    if (selectedVector.features.length > 0) {
      console.log("selectedVector.features", selectedVector.features)
      // center: layers.geometry.coordinates,
    }
    console.warn('selectedVector', selectedVector.features[0]);
  })
    .catch((err:any) => {
      console.warn(err);
    });
}


  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Mapbox.MapView style={{flex:1}} ref={(component) => {
          mapComponentView = component;
        }} onPress={layers => onMapPress(layers)}>

    <Mapbox.ShapeSource
        id="featurePointShapeSource"
        shape={{"type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        [
                            [
                                [
                                    -76.57977345687516,
                                    36.69512793531269
                                ],
                                [
                                    -76.57979889504533,
                                    36.69512836586616
                                ],
                                [
                                    -76.57979560082207,
                                    36.69525875203225
                                ],
                                [
                                    -76.57977016225729,
                                    36.69525833536608
                                ],
                                [
                                    -76.57977345687516,
                                    36.69512793531269
                                ]
                            ]
                        ]
                    ]
                },
                "properties": {
                    "group": "T0jwSxz0jH",
                    "featureTypeId": 456,
                    "project": "jtBi3Wh64k",
                    "extraProperties": {
                        "Block": "B01",
                        "project": "",
                        "col_start": "1",
                        "row_start": "1",
                        "orientation": "NS",
                        "tracker_type": "Short",
                        "tracker_section": "1",
                        "total_num_modules": "13",
                        "num_modules_vertical": "13",
                        "num_modules_horizontal": "1"
                    },
                    "name": "B01 S01 R029 N",
                    "featureType": null,
                    "dataProperties": null,
                    "description": null,
                    "workflow": null,
                    "hierarchyProperties": null,
                    "uid": "gvWcDiVrMYOE",
                    "workflowProgress": {}
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        [
                            [
                                [
                                    -76.57977345687516,
                                    36.69512793531269
                                ],
                                [
                                    -76.57979889504533,
                                    36.69512836586616
                                ],
                                [
                                    -76.57979560082207,
                                    36.69525875203225
                                ],
                                [
                                    -76.57977016225729,
                                    36.69525833536608
                                ],
                                [
                                    -76.57977345687516,
                                    36.69512793531269
                                ]
                            ]
                        ]
                    ]
                },
                "properties": {
                    "group": "T0jwSxz0jH",
                    "featureTypeId": 456,
                    "project": "jtBi3Wh64k",
                    "extraProperties": {
                        "Block": "B01",
                        "project": "",
                        "col_start": "1",
                        "row_start": "1",
                        "orientation": "NS",
                        "tracker_type": "Short",
                        "tracker_section": "1",
                        "total_num_modules": "13",
                        "num_modules_vertical": "13",
                        "num_modules_horizontal": "1"
                    },
                    "name": "B01 S01 R030 N",
                    "featureType": "asdfadsf",
                    "dataProperties": null,
                    "description": null,
                    "workflow": null,
                    "hierarchyProperties": null,
                    "uid": "gvWcDiVrMYOE",
                    "workflowProgress": {}
                }
            }]}}>
        <Mapbox.FillLayer
          id="fillLineString"
          filter={['all', featureTypeIDFilter,
          ]}
          style={featureLayerStyles.fillStatusStyles}
        />
        <Mapbox.FillLayer
          id="fillNoStatusLineString"
          filter={['all',
            featureTypeIDFilter,
            // ['has', 'featureTypeId'],
          ]
          }
          style={featureLayerStyles.fillEmptyStyles}
        />
        <Mapbox.FillLayer
          id="fillPolygon"
          filter={['all', featureTypeIDFilter
          ]}
          style={featureLayerStyles.fillStatusStyles}
        />
        <Mapbox.FillLayer
          id="fillNoStatusPolygon"
          filter={['all',
           featureTypeIDFilter
          ]
          }
          style={featureLayerStyles.fillEmptyStyles}
        />
  
        {/* THERM SPECIFIC */}
        <Mapbox.FillLayer
          id="fillThermalPolygon"
          filter={['all',featureTypeIDFilter]
          }
          style={featureLayerStyles.fillPolygonStyles}
        />
        <Mapbox.FillLayer
          id="fillThermalNoStatusPolygon"
          filter={['all',featureTypeIDFilter]
          }
          style={featureLayerStyles.fillPolygonEmptyStyles}
        />
      </Mapbox.ShapeSource>
      <Mapbox.Camera
            // minZoomLevel={mapMetaData.minzoom}
            zoomLevel={18}
            centerCoordinate={[ -76.57977345687516,  36.69512793531269,18]}
            animationMode="flyTo"
          />

        </Mapbox.MapView>
      </View>
    </View>
    </SafeAreaView>
  );
}


export default App;
