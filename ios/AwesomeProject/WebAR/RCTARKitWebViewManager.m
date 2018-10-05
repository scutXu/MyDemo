#import "RCTARKitWebViewManager.h"
#import "RCTARKitWebView.h"

@implementation RCTARKitWebViewManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  return [RCTARKitWebView new];
}

RCT_EXPORT_VIEW_PROPERTY(source, NSString)

@end
