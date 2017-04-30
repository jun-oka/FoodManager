'use strict';

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ListView, Text, View, Image, TabBarIOS, NavigatorIOS, TouchableWithoutFeedback, WebView } from 'react-native';
var FeaturedTab = require('./FeaturedTab.js');
var FoodslistTab = require('./FoodListTab.js');
var NotificationTab = require('./NotificationTab.js');


var FoodManager = React.createClass({
  getInitialState: function(){
    return(
      {
        selectedTab: 'FeaturedTab'
      }
    );
  },
  render: function() {
    return (
      <TabBarIOS selectedTab={this.state.selectedTab}>
        <TabBarIOS.Item
          icon={require('./list.png')}
          selectedIcon={require('./list2.png')}
          renderAsOriginal
          title="Foods"
          selected={this.state.selectedTab === 'FoodslistTab'}
          onPress={() => {
            this.setState(
              {selectedTab: 'FoodslistTab'}
            );
          }}
        >
          <FoodslistTab />
        </TabBarIOS.Item>
                <TabBarIOS.Item
          icon={require('./restaurant.png')}
          selectedIcon={require('./restaurant2.png')}
          renderAsOriginal
          title="Recipe"
          selected={this.state.selectedTab === 'FeaturedTab'}
          onPress={() => {
            this.setState(
              {selectedTab: 'FeaturedTab'}
            );
          }}
          >
          <FeaturedTab />
        </TabBarIOS.Item>

                <TabBarIOS.Item
          icon={require('./notification.png')}
          selectedIcon={require('./notification2.png')}
          renderAsOriginal
          title="Expirea Aeart"
          selected={this.state.selectedTab === 'NotificationTab'}
          onPress={() => {
            this.setState(
              {selectedTab: 'NotificationTab'}
            );
          }}
        >
          <NotificationTab />
        </TabBarIOS.Item>
        
      </TabBarIOS>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('FoodManager', () => FoodManager);
