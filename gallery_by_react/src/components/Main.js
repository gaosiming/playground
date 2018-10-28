require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let yeomanImage = require('../images/yeoman.png');
let imageDatas = require('../data/ImageData.json');

// imageDatas = (function(imageDatasArr){
//     for(let i=0; i<imageDatasArr.length(); i++){
//       let singleItem = imageDatasArr[i];
//       singleItem.imageUrl = require('../images/'+singleItem.fileName);
//       imageDatasArr[i] = singleItem;
//     }
//     return imageDatasArr;
// })(imageDatas);
console.log('sssssss', typeof(imageDatas));
class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
        <section className="img-sec"></section>
        <nav className="controller-nav"></nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
  imageDatas
};

export default AppComponent;
