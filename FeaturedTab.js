
'use strict';

// var React = require('react-native');
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, NavigatorIOS} from 'react-native';
var EntryList = require('./EntryList.js');


var FeaturedTab = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: "Today's recipe",
          component: EntryList
        }} />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

module.exports = FeaturedTab;
