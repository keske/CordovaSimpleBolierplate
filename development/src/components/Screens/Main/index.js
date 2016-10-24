import React, { Component } from 'react';

// Styles
require('./app.css');
import s from './index.css';

export default class Screen extends Component {
  render() {
    return (
      <section className={s.root}>
        App init
      </section>
    );
  }
}
