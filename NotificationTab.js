
'use strict';

// var React = require('react-native');
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, NavigatorIOS} from 'react-native';
var NotiicationList = require('./NotificationList.js');


var NotificationTab = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Notification',
          component: NotiicationList
        }} />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  }
});

module.exports = NotificationTab;
