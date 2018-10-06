# Simple Demo

A naive demo aims to prove the ablity of a C++ graphic programer mastering front end development.

Please be patient until the gif is loaded.

![](https://github.com/xu-xionglong/MyDemo/blob/master/ezgif-4-2731c3a75f68.gif)


## Dependency

[rn-fetch-blob](https://github.com/joltup/rn-fetch-blob)

[react-native-svg](https://github.com/react-native-community/react-native-svg)

[three.ar.js)](https://github.com/google-ar/three.ar.js)

[json-server](https://github.com/typicode/json-server)

[three.js](https://github.com/mrdoob/three.js)

[react-native](https://github.com/facebook/react-native)

[react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)

[react-navigation](https://github.com/react-navigation/react-navigation)

[WebARonARKit](https://github.com/google-ar/WebARonARKit)


## Device Limitation

- ios 11 + 

- metal and arkit supported for running some of web demos

## Build Error Fix

### error

```
checking for arm-apple-darwin-gcc... Xcode-beta 2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/cc -arch undefined_arch -isysroot Xcode-beta 2.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS12.0.sdk
checking whether the C compiler works... no
configure: error: in `MyDemo/node_modules/react-native/third-party/glog-0.3.4':
configure: error: C compiler cannot create executables
See `config.log' for more details
```

### solution

```
cd ./node_modules/react-native/third-party/glog-0.3.4 && ../../scripts/ios-configure-glog.sh
```

see [github issue](https://github.com/facebook/react-native/issues/19774)

---


### error
```
Build input file cannot be found: 'MyDemo/node_modules/react-native/Libraries/WebSocket/libfishhook.a'
```

### solution

[see solution from jianshu](https://www.jianshu.com/p/3e29e9d897c8)

-----

### error

```
Undefined symbols for architecture arm64:
  "_OBJC_CLASS_$_RCTReconnectingWebSocket", referenced from:
      objc-class-ref in libReact.a(RCTPackagerConnection.o)
  "_OBJC_CLASS_$_RCTSRWebSocket", referenced from:
      objc-class-ref in libReact.a(RCTInspectorPackagerConnection.o)
ld: symbol(s) not found for architecture arm64
clang: error: linker command failed with exit code 1 (use -v to see invocation)
```

### solution

这个问题没有在网上找到解决方法，我用第二个问题的解决办法解决的。在项目的依赖项里面先移除一次libRCTWebSocket.a，再添加回去。
