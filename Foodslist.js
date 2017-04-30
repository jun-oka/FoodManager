import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ListView, Text, View, Image, TabBarIOS, TouchableWithoutFeedback, WebView } from 'react-native';

var FOODS_URL = "https://465b6397-77ed-4564-a140-26ad44863230-bluemix.cloudant.com/data_csv/_all_docs?include_docs=true&conflicts=true";


// var QIITA_URL = "https://qiita.com/api/v2/tags/reactjs/items";

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
var FoodList = React.createClass({
  getInitialState: function() {
    return {
      items: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },
  componentDidMount: function(){
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
           Loading movies...
         </Text>
       </View>
     );
   },

   renderItem: function(item, sectionID, rowID) {
     console.log(item);
     return (
      //  <TouchableWithoutFeedback  onPress={() => this.onPressed(item)}>
       <View style={styles.container}>
         <View style={styles.rightContainer}>
           <Text style={styles.title}>{item.doc["COLUMN3"]}</Text>
           <Text style={styles.name}> quantity:{item.doc["COLUMN5"]}, ExpiryDate: {item.doc["COLUMN1"]}</Text>
         </View>
       </View>
      //  </TouchableWithoutFeedback>
     );
   },

   fetchData: function() {
  fetch(FOODS_URL)
    .then((response) => response.json())
    .then((responseData) => {
      console.log("here");
      console.log(responseData);
      this.setState({
        items: this.state.items.cloneWithRows(responseData.rows),
        loaded: true,
      });
    })
    .done();
},

  // セルのタッチイベント
  // onPressed: function(item) {
  //   this.props.navigator.push({
  //     title: item.title,
  //     component: ReactQiitaItemView,
  //     passProps: { url: item.url }
  //   })
  // }
});

// 記事閲覧用のWebView
// var ReactQiitaItemView = React.createClass({
//   render: function() {
//     return (
//       <WebView
//         url="http://qiita.com/okmttdhr/items/677bed4e217e9c7c1fe2"/>
//     )
//   }
// });

// 記事閲覧用のWebView
// var ReactQiitaItemView = React.createClass({
//   render: function() {
//     return (
//       <WebView
//         source={{uri: "https://cookpad.com/recipe/4351070"}}
//         // url={"http://junshu.me/"}/>
//         />
//     )
//   }
// });

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
    borderBottomColor: '#808080',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 15,
    margin: 8,
    textAlign: 'left',
  },
  name: {
    fontSize: 12,
    margin: 6,
    textAlign: 'left',
  },
  thumbnail: {
    width: 80,
    height: 80,
    margin: 2,
  },
  listView: {
    backgroundColor: '#FFFFFF',
    marginTop: 60,
  },
});

module.exports = FoodList;
