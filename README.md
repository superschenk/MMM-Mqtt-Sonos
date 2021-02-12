# MMM-Mqtt-Sonos
[MagicMirror²](https://github.com/MichMich/MagicMirror) Module that displays Sonos Mqtt information

## Installation
1. Go to MagicMirror's `modules` folder and execute `git clone https://github.com/superschenk/MMM-Mqtt-Sonos.git`.
2. Execute `npm install` to install the node dependencies.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: 'MMM-Mqtt-Sonos',
		position: 'bottom_right',
		config: {
			// See 'Configuration options' for more information.
		}
	}
]
````

## Configuration options

| Option  | Description  |
|---|---|
| `mqttServer`  | Connection string for the server to connect to (`mqtt://localhost`)  |
| `loadingText`  | Text to display while waiting for data to load  |
| `topic`  | MQTT Topic to subscribe to on the server (`Smederij/sonos`)  |


## Dependencies
- [mqtt](https://www.npmjs.com/package/mqtt) (installed via `npm install`)

## Credits
Big thanks to:

[MichMich](https://magicmirror.builders) for creating MagicMirror.

[plangdon](https://github.com/plangdon/MMM-mqtt_display) for information on using MQTT in Node and MagicMirror.

[Jeff Clarke](https://github.com/jclarke0000/MMM-DarkSkyForecast) for information on getting templates to work with MagicMirror.
