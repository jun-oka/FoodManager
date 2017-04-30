
'use strict';

// var React = require('react-native');
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, NavigatorIOS} from 'react-native';
var FoodList = require('./Foodslist.js');


var FoodslistTab = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Foods List',
          component: FoodList
        }} />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

module.exports = FoodslistTab;
