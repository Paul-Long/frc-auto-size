<p align="center">
  <a href="https://github.com/Paul-Long/frc-auto-size">
    <img width="200" src="http://houym-1254119810.picsh.myqcloud.com/logo-200_150.png">
  </a>
</p>

<h1 align="center">Auto-Size</h1>

<div align="center">

react component auto size 

[![npm package](https://img.shields.io/npm/v/frc-auto-size.svg?style=flat)](https://www.npmjs.com/package/frc-auto-size)
[![NPM downloads](http://img.shields.io/npm/dm/frc-auto-size.svg?style=flat-square)](http://npmjs.com/frc-auto-size)
[![Dependencies](https://img.shields.io/david/paul-long/frc-auto-size.svg?style=flat-square)](https://david-dm.org/paul-long/frc-auto-size)
[![DevDependencies](https://img.shields.io/david/dev/paul-long/frc-auto-size.svg?style=flat-square)](https://david-dm.org/paul-long/frc-auto-size?type=dev)
[![Gitter](https://img.shields.io/gitter/room/paul-long/frc-auto-size.svg?style=flat-square)](https://gitter.im/paul-long/paul-long?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Codecov](https://img.shields.io/coveralls/github/paul-long/frc-auto-size.svg?style=flat-square)](https://codecov.io/gh/paul-long/frc-auto-size/branch/master)
[![Issues need help](https://flat.badgen.net/github/label-issues/paul-long/frc-auto-size/help%20wanted/open)](https://github.com/paul-long/frc-auto-size/issues?q=label%3A%22help+wanted%22)

</div>

# 安装

[![rc-select](https://nodei.co/npm/frc-auto-size.png)](https://npmjs.org/package/frc-auto-size)

```bash
npm install frc-auto-size --save-dev
```

# Props

| props             | describe              | type                                    | default value |
| ----------------- | --------------------- | --------------------------------------- | ------------- |
| className         | className             | String                                  |               |
| defaultWidth      | default width         | Number                                  |               |
| defaultHeight     | default height        | Number                                  |               |
| disableWidth      | disable width         | Boolean                                 | false         |
| disableHeight     | disable height        | Boolean                                 | false         |
| style             | style                 | Style                                   |               |
| onResize          | listen resize         | Function                                | -             |
| children          | render children       | Function                                |               |

# 示例

```jsx harmony
import React from 'react';
import AutoSize from 'frc-auto-size';

class Demo extends React.Component {
  render() {
    return (
      <AutoSize checked={true}>{function({width, height}) {
        return (<div style={{width, height}}></div>)
      }}</AutoSize>
    );
  }
}
```
