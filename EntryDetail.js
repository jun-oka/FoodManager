'use strict';


import React, { Component } from 'react';
import { WebView } from 'react-native';


var EntryDetail = React.createClass({
  render: function(){
    return(
      <WebView
        url={this.props.url}
      />
    );
  }
});

module.exports = EntryDetail;
