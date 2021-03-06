require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';

// let yeomanImage = require('../images/yeoman.png');
let imageDatas = require('json!../data/ImageData.json');

imageDatas = (function (imageDatasArr) {
  imageDatas.forEach(element => {
    element.imageURL = require('../images/' + element.fileName);
    element = element;
  });
  return imageDatasArr;
})(imageDatas);

function getRangeRandom(low, high) {
  return Math.ceil(Math.random()*(high - low) + low);
}

class ImgFigure extends React.Component {
  render() {

    let styleObj =  {

    }
    
    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }

    return (
      <figure className="img-figure" style={styleObj}>
        <img src={this.props.data.imageURL} alt={this.props.data.title} />
        <figcaption className="figure-caption">
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    );
  }
}

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      imgsArrangeArr:[]
    };
  }

  Constant = {
    centerPos: {
      left: 0,
      right: 0
    },
    hPosRange: {
      leftSecX: [0, 0],
      rightSecX: [0, 0],
      y: [0, 0]
    },
    vPosRange: {
      x: [0, 0],
      topY: [0, 0]
    }
  };

  rearrange(centerIndex){
    let imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hposrangeLeftSecX = hPosRange.leftSecX,
        hposrangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,
        
        imgsArrangeTopArr = [],
        topImgNum = Math.ceil(Math.random()*2),
        topImgSpliceIndex = 0,
        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);

        imgsArrangeCenterArr[0].pos = centerPos;
        topImgSpliceIndex = Math.ceil(Math.random()*(imgsArrangeArr.length - topImgNum));

        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

        imgsArrangeTopArr.forEach((element,index) => {
          imgsArrangeTopArr[index].pos = {
            top: getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
            left: getRangeRandom(vPosRangeX[0],vPosRangeX[1])
          }
        });

        for(let i =0, j = imgsArrangeArr.length, k=j/2; i<j; i++){
          let hPosRangeLORX = null;
          
          if(i<k){
            hPosRangeLORX = hposrangeLeftSecX;
          }
          else {
            hPosRangeLORX = hposrangeRightSecX;
          }

          imgsArrangeArr[i].pos = {
            top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
            left: getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
          }
        }
        if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
          imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
        }

        imgsArrangeArr.splice(centerIndex,0, imgsArrangeCenterArr[0]);
        this.setState({
          imgsArrangeArr: imgsArrangeArr
        });
  }

  componentDidMount() {

    let stageDom = ReactDOM.findDOMNode(this.refs.stage);
    let stageW = stageDom.scrollWidth,
      stageH = stageDom.scrollHeight,
      halfStageW = Math.ceil(stageW / 2),
      halfStageH = Math.ceil(stageH / 2);

    let imgFigureDom = ReactDOM.findDOMNode(this.refs.imgFigure0),
      imgW = imgFigureDom.scrollWidth,
      imgH = imgFigureDom.scrollHeight,

      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2);

    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    }

    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;


    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;


    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;


    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;


    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;


    this.rearrange(0);
  }

  render() {

    let controllerUnits = [],
      imgFigures = [];

    imageDatas.forEach((element, index) => {
      if (!this.state.imgsArrangeArr[index]) {
        this.state.imgsArrangeArr[index] = {
          pos:{
            left: 0,
            top: 0
          }
        }
      }
      const imgArrangeArrWithIDX = this.state.imgsArrangeArr[index];
      imgFigures.push(<ImgFigure key={'imgFigure' + index} data={element} ref={'imgFigure' + index} arrange={imgArrangeArrWithIDX}></ImgFigure>);
    });


    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
  imageDatas
};

export default AppComponent;
