import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ListView, Text, View, Image, TabBarIOS, TouchableWithoutFeedback, WebView } from 'react-native';

var FOODS_URL = "https://465b6397-77ed-4564-a140-26ad44863230-bluemix.cloudant.com/hello_csv/_all_docs?include_docs=true&conflicts=true";


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
var NotificationList = React.createClass({
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
           Loading notifications...
         </Text>
       </View>
     );
   },

   renderItem: function(item, sectionID, rowID) {
    let symbol = "!!!";
    let byWhen = "by tomorrow";
    
     console.log(item);
     if(item.doc["date"] === "5/3/17"){
         symbol = "!!"
         byWhen = "in tow days";
     }else{
         symbol = "!!!"
        byWhen = "by tomorrow";
     }
     
     return (
      //  <TouchableWithoutFeedback  onPress={() => this.onPressed(item)}>
       <View style={styles.container}>
         <View style={styles.rightContainer}>
            <View style={styles.titleBox}>
                <Text style={styles.title}>{item.doc["foods"]}</Text>
                <Text style={styles.exDate}>{byWhen}</Text>
                <Text style={styles.aleartsymbol}>{symbol}</Text>
            </View>
            
           <Text style={styles.name}> ExpiryDate: {item.doc["date"]}</Text>
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
  titleBox: {
    flex: 1,
    flexDirection: 'row',
    // fontSize: 15,
    margin: 8,
    textAlign: 'left',
  },
  title: {
    width:175,
    // fontSize: 15,
    // margin: 8,
    textAlign: 'left',
  },
  exDate: {
    width:100,
    fontSize: 15,
    textAlign: 'right', 
  },
  aleartsymbol: {
    textAlign: 'right', 
    width:50,
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
    marginTop: 50,
  },
});

module.exports = NotificationList;
