<!DOCTYPE html>
<html>
  <head>
    <meta charest="http://map-expert10000codeurs.com/googlecb67bcb2877ea772.html">
    <meta charset="utf-8">
    <title>Custom Map Projections</title>
    <style>
      /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      #map {
        height: 100%;
      }
      /* Optional: Makes the sample page fill the window. */
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
      #coords {
        background-color: black;
        color: white;
        padding: 5px;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <div id="coords"></div>
    <script>
      // This example defines an image map type using the Gall-Peters
      // projection.
      // https://en.wikipedia.org/wiki/Gall%E2%80%93Peters_projection

      function initMap() {
        // Create a map. Use the Gall-Peters map type.
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 0,
          center: {lat: 0, lng: 0},
          mapTypeControl: false
        });

        initGallPeters();
        map.mapTypes.set('gallPeters', gallPetersMapType);
        map.setMapTypeId('gallPeters');

        // Show the lat and lng under the mouse cursor.
        var coordsDiv = document.getElementById('coords');
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(coordsDiv);
        map.addListener('mousemove', function(event) {
          coordsDiv.textContent =
              'lat: ' + Math.round(event.latLng.lat()) + ', ' +
              'lng: ' + Math.round(event.latLng.lng());
        });

        // Add some markers to the map.
        map.data.setStyle(function(feature) {
          return {
            title: feature.getProperty('name'),
            optimized: false
          };
        });
        map.data.addGeoJson(cities);
      }

      var gallPetersMapType;
      function initGallPeters() {
        var GALL_PETERS_RANGE_X = 800;
        var GALL_PETERS_RANGE_Y = 512;

        // Fetch Gall-Peters tiles stored locally on our server.
        gallPetersMapType = new google.maps.ImageMapType({
          getTileUrl: function(coord, zoom) {
            var scale = 1 << zoom;

            // Wrap tiles horizontally.
            var x = ((coord.x % scale) + scale) % scale;

            // Don't wrap tiles vertically.
            var y = coord.y;
            if (y < 0 || y >= scale) return null;

            return 'https://developers.google.com/maps/documentation/' +
                   'javascript/examples/full/images/gall-peters_' + zoom +
                   '_' + x + '_' + y + '.png';
          },
          tileSize: new google.maps.Size(GALL_PETERS_RANGE_X, GALL_PETERS_RANGE_Y),
          minZoom: 0,
          maxZoom: 1,
          name: 'Gall-Peters'
        });

        // Describe the Gall-Peters projection used by these tiles.
        gallPetersMapType.projection = {
          fromLatLngToPoint: function(latLng) {
            var latRadians = latLng.lat() * Math.PI / 180;
            return new google.maps.Point(
                GALL_PETERS_RANGE_X * (0.5 + latLng.lng() / 360),
                GALL_PETERS_RANGE_Y * (0.5 - 0.5 * Math.sin(latRadians)));
          },
          fromPointToLatLng: function(point, noWrap) {
            var x = point.x / GALL_PETERS_RANGE_X;
            var y = Math.max(0, Math.min(1, point.y / GALL_PETERS_RANGE_Y));

            return new google.maps.LatLng(
                Math.asin(1 - 2 * y) * 180 / Math.PI,
                -180 + 360 * x,
                noWrap);
          }
        };
      }

      // GeoJSON, describing the locations and names of some cities.
      var cities = {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          geometry: {type: 'Point', coordinates: [3305950627, -7.6187768 ]},
          properties: {name: 'Casablanca'}
        }, {
          type: 'Feature',
          geometry: {type: 'Point', coordinates: [45.4792159, -73.6103642 ]},
          properties: {name: 'Montréal'}
        }, {
          type: 'Feature',
          geometry: {type: 'Point', coordinates: [ 45.7578137, 4.8320114]},
          properties: {name: 'Lyon'}
        }, {
          type: 'Feature',
          geometry: {type: 'Point', coordinates: [44.841225, -05800364]},
          properties: {name: 'Bordeaux'}
        }, {
          type: 'Feature',
          geometry: {type: 'Point', coordinates: [ 3.8689867, 11.5213344]},
          properties: {name: 'Yaoundé'}
        }, {
          type: 'Feature',
          geometry: {type: 'Point', coordinates: [36.820984, 10.249812 ]},
          properties: {name: 'Tunis'}
        }, {
          type: 'Feature',
          geometry: {type: 'Point', coordinates: [ 46.3036683, 4.8322266 ]},
          properties: {name: 'Mâcon'}
        }, {
          type: 'Feature',
          geometry: {type: 'Point', coordinates: [48.8566969, 2.3514616 ]},
          properties: {name: 'Paris'}

        }, {
          type: 'Feature',
          geometry: {type: 'Point', coordinates: [50.6365654, 3.0635282 ]},
          properties: {name: 'Lille'}
        }, {
          type: 'Feature',
          geometry: {type: 'Point', coordinates: [43.7009358, 7.2683912]},
          properties: {name: 'Nice'}
        
        }]
      };
    </script>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD781Tib-er487oUkjUH3qdfUp60H7mRs4&callback=initMap"></script>
  </body>
</html>
