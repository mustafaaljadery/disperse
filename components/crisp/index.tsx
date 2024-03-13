import React, { Component } from 'react';

import { Crisp } from 'crisp-sdk-web';

class CrispChat extends Component {
  componentDidMount() {
    Crisp.configure('b3d82944-2450-4faf-bb79-3e3090f29344');
  }

  render() {
    return null;
  }
}
export default CrispChat;
