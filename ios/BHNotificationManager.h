//
//  BHNotificationManager.h
//  biblehead
//
//  Created by Rick Conrad on 8/23/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface BHNotificationManager : RCTEventEmitter <RCTBridgeModule>

+ (id)allocWithZone:(NSZone *)zone;
+ (void) doReviewWhenReady;

@end
