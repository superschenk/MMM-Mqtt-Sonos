'use strict';
/* global Module */

/* Magic Mirror
 * Module: MMM-Mqtt-Sonos
 *
 * By Tim Schenk
 */

Module.register('MMM-Mqtt-Sonos', {

  defaults: {
    mqttServer: 'mqtt://',
    topic: '',
  },

  start: function() {
    Log.info('Starting module: ' + this.name);
    this.mqttVal = null;
    this.jsonMQTT = null;
    this.currentset = null;

    var self = this;
    self.sendSocketNotification('MQTT_SERVER', { mqttServer: self.config.mqttServer, topic: self.config.topic });
    this.updateDom();
  },

  getTemplate: function () {
    return "mmm-mqtt-sonos.njk";
  },

  getTemplateData: function () {
    return {
      config:               this.config,
      playbackState:        this.currentset == null ? null : this.currentset[0]['playbackState'],
      absoluteAlbumArtUri:  this.currentset == null ? null : this.currentset[0]['absoluteAlbumArtUri'],
      title:                this.currentset == null ? null : this.currentset[0]['title'],
      artist:               this.currentset == null ? null : this.currentset[0]['artist'],
      type:                 this.currentset == null ? null : this.currentset[0]['type'],
    };
  },

  MQTTnotificationReceived: function(payload) {
    this.mqttVal = payload.data.toString();
    this.jsonMQTT = JSON.parse(this.mqttVal.toString())
    var newset =      [{
                          "playbackState":        this.jsonMQTT.playbackState
                        , "absoluteAlbumArtUri":  this.jsonMQTT.currentTrack.absoluteAlbumArtUri
                        , "title":                this.jsonMQTT.currentTrack.title
                        , "artist":               this.jsonMQTT.currentTrack.artist
                        , "type":                 this.jsonMQTT.currentTrack.type
                      }]

    if (JSON.stringify(newset) !== JSON.stringify(this.currentset)) { // change detected
      this.currentset = newset // update current set
      this.updateDom(10000);
    }
  },

  notificationReceived: function (notification, payload, sender) {
    if (notification === 'MQTT_DATA' && payload.topic === this.config.topic && this.mqttVal != payload.data.toString()) {
      this.MQTTnotificationReceived(payload);
    }
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === 'MQTT_DATA' && payload.topic === this.config.topic && this.mqttVal != payload.data.toString()) {
      this.MQTTnotificationReceived(payload);
    }

    if (notification === 'ERROR') {
      this.sendNotification('SHOW_ALERT', payload);
    }
  }

});
