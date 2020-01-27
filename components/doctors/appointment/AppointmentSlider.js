import React, { Component } from 'react';
import {
  Col, Row, Icon, Button
} from 'antd';
import Moment from 'react-moment';
class AppointmentSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderPage: 1,
      sliderTotalCount: 5,
      sliderDate: []
    };
    this.getSingleDateView = this.getSingleDateView.bind(this);
    this.getSliderDate = this.getSliderDate.bind(this);
    this.currentDateAfterDay = this.currentDateAfterDay.bind(this);
  }
  componentDidMount() {
    this.getSliderDate(1);
  }

  getSingleDateView(yesterday) {
    return <div className="date-slider-cart">
      <p className="date-slider-cart__day">
        <Moment format="ddd">
          {yesterday}
        </Moment>
      </p>
      <p className="date-slider-cart__time">
        <Moment format="MMM">
          {yesterday}
        </Moment>
        {' '}
        <Moment format="DD">
          {yesterday}
        </Moment>
      </p>
    </div>;
  }
  getSliderDate(page, direction = 0) {

    var date = [];
    var i = page * 5 - 5;
    var limit = 5 * page;
    const {
      onDateChange
    } = this.props
    for (var i; i < limit; i++) {
      const day = this.currentDateAfterDay(i);
      date.push(day);
    }

    if (direction >= 1) {
      if (direction == 2) {
        const sliderPage = this.state.sliderPage + 1;
        this.setState({
          sliderPage,
          sliderDate: date
        }, ()=> {
          if(typeof onDateChange === "function"){
            onDateChange(this.state.sliderDate)
          }
        })
      } else {
        const sliderPage = this.state.sliderPage - 1;
        this.setState({
          sliderPage,
          sliderDate: date
        }, ()=> {
          if(typeof onDateChange === "function"){
            onDateChange(this.state.sliderDate)
          }
        })
      }
    } else {
      this.setState({
        sliderDate: date
      }, ()=> {
        if(typeof onDateChange === "function"){
          onDateChange(this.state.sliderDate)
        }
      })
    }


  }
  currentDateAfterDay(afterDay) {
    var d = new Date();
    var yesterday = new Date(d.getTime());
    yesterday.setDate(d.getDate() + parseInt(afterDay));
    return yesterday;//"20" + year + "/" + month + "/" + date;
  }
  render() {

    const {
      sliderDate,
      sliderPage

    } = this.state
    return (
      <Row>

        <Col span={2}>
          {
            sliderPage > 1 ?
              <Button type="primary" shape="circle" onClick={() => this.getSliderDate(sliderPage - 1, 1)} icon="left" />
              :
              <Button shape="circle" icon="left" />
          }

        </Col>
        {
          sliderDate.map((key, index) =>
            <Col span={4} key={index}>
              {this.getSingleDateView(key)}
              {/* { key} */}
            </Col>
          )
        }

        <Col span={2}>
          <Button type="primary" shape="circle" onClick={() => this.getSliderDate(sliderPage + 1, 2)} icon="right" />
        </Col>
      </Row>
    );
  }
}

export default AppointmentSlider;