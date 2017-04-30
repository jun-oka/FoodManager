import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ListView, Text, View, Image, TabBarIOS, NavigatorIOS, TouchableWithoutFeedback, WebView } from 'react-native';


// var React = require('react-native');
// var {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
//   ListView,
//   Image,
//   NavigatorIOS,
//   TouchableWithoutFeedback,
//   WebView
// } = React;

var QIITA_URL = "http://food2fork.com/api/search?key=aa29cb51d1299c0e951f967d59ca06a5&q=shredded%20chicken";

// ベースのUINavigationControllerに該当するもの
// var EntryList = React.createClass({
//   render: function() {
//     return (
//       <NavigatorIOS
//         style={styles.navigator}
//         initialRoute={{
//           component: ReactQiitaList,
//           title: "Today's Recipe",
//       }}/>
//     );
//   }
// })

// 記事一覧リスト
var EntryList = React.createClass({
  getInitialState: function() {
    return {
      items: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.items}
        renderRow={this.renderItem}
        style={styles.listView}/>
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading recipes...
        </Text>
      </View>
    );
  },

  renderItem: function(item, sectionID, rowID) {
    return (
      <TouchableWithoutFeedback  onPress={() => this.onPressed(item)}>
      <View style={styles.container}>
        <Image
          source={{uri: item.image_url}}
          style={styles.thumbnail}/>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.name}>{item.publisher_url}</Text>
        </View>
      </View>
      </TouchableWithoutFeedback>
    );
  },

  // API呼び出し
  fetchData: function() {
    fetch(QIITA_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          items: this.state.items.cloneWithRows(responseData.recipes),
          loaded: true,
        });
      })
      .done();
  },

  //セルのタッチイベント
  onPressed: function(item) {
    this.props.navigator.push({
      title: item.title,
      component: ReactQiitaItemView,
      passProps: { url: item.source_url }
    })
  },
});

// 記事閲覧用のWebView
var ReactQiitaItemView = React.createClass({
  render: function(item) {
    return (
      <WebView
        // url={{item.source_url}}
        source={{uri:  this.props.url}}
        // source={{uri: item.source_url}}
        // url={"http://junshu.me/"}/>
        />
    )
  }
});

// 各種デザイン要素
var styles = StyleSheet.create({
  navigator: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    margin: 8,
    textAlign: 'left',
  },
  name: {
    fontSize: 12,
    margin: 8,
    textAlign: 'left',
  },
  thumbnail: {
    width: 80,
    height: 80,
    margin: 2,
  },
  listView: {
    backgroundColor: '#FFFFFF',
    marginTop: 70,
  },
});

module.exports = EntryList;
// AppRegistry.registerComponent('dontwastefood', () => ReactQiitaNavigator);
