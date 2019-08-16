/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <UserNotifications/UserNotifications.h>
#import "BHNotificationManager.h"
#import "RNSplashScreen.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"biblehead"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  // BibleHead Stuff
  int authorizationOptions = UNAlertStyleNone;
  if (@available(iOS 12.0, *)) {
    authorizationOptions = UNAuthorizationOptionProvisional;
  }
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  [center requestAuthorizationWithOptions:authorizationOptions completionHandler:^(BOOL granted, NSError * _Nullable error) {
    if (granted) {
      NSLog(@"Permission Granted!");
    }
  }];
  
//  UNNotificationAction *snoozeAction = [UNNotificationAction actionWithIdentifier:@"BHSnoozeAction" title:@"Snooze" options:UNNotificationActionOptionNone];
//  UNNotificationAction *reviewAction = [UNNotificationAction actionWithIdentifier:@"BHReviewAction" title:@"Review" options:UNNotificationActionOptionNone];
//  UNNotificationCategory *category = [UNNotificationCategory categoryWithIdentifier:@"BHReviewNotificationCategory" actions:@[snoozeAction,reviewAction] intentIdentifiers:@[] options:UNNotificationCategoryOptionNone];
//  NSSet *categories = [NSSet setWithObject:category];
//  [center setNotificationCategories:categories];
  
  center.delegate = self;
  
  [RNSplashScreen show];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}


- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler
{
  NSLog(@"userNotificationCenter willPresentNotification called...:)");
  completionHandler(UNNotificationPresentationOptionAlert);
}

- (void)userNotificationCenter: (UNUserNotificationCenter *)center didReceiveNotificationResponse:(nonnull UNNotificationResponse *)response withCompletionHandler:(nonnull void (^)(void))completionHandler
{
  NSLog(@"Time to do a review...");
  [BHNotificationManager doReviewWhenReady];
  completionHandler();
}
@end
