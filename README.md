# 🥒 Pickles

Relish UI Library

### Installing
```
yarn add https://bitbucket.org/relishinc/pickles.git
npm install https://bitbucket.org/relishinc/pickles.git --save
```
### Documentation and demos
Located at [http://pickles.reli.sh](http://pickles.reli.sh)

You can also fire up the same site on a local webserver
```
yarn install && yarn start
```

### Loading modules
ES6 imports
```
import { Modal, Lightbox } from 'pickles';
```
ES5 library
```
<script src="pickles/dist/js/Pickles.js"></script>
```

### Loading styles
SASS (default variables can be overridden)
```
@import 'pickles/src/css/ui/modal';
```
CSS
```
@import 'pickles/dist/css/ui/modal.css'
<link rel="stylesheet" href="pickles/dist/css/ui/modal.css">
```