//
//  BHNotificationManager.m
//  biblehead
//
//  Created by Rick Conrad on 8/23/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "BHNotificationManager.h"
#import <UserNotifications/UserNotifications.h>
//#import <Foundation/Foundation.h>

@implementation BHNotificationManager

RCT_EXPORT_MODULE(AlarmModule)

static BHNotificationManager *sharedInstance = nil;

+ (id)allocWithZone:(NSZone *)zone {
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    sharedInstance = [super allocWithZone:zone];
  });
  return sharedInstance;
}

RCT_EXPORT_METHOD(setAlarmTime: (NSString *)time withTitle: (NSString *)title withText: (NSString *)text)
{
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  
  UNMutableNotificationContent *content = [UNMutableNotificationContent new];
  content.title = title;
  content.body = text;
  // content.categoryIdentifier = @"BHReviewNotificationCategory";
  
//  UNTimeIntervalNotificationTrigger *trigger = [UNTimeIntervalNotificationTrigger triggerWithTimeInterval:wait repeats:false];
  
  NSDateComponents *triggerDate = [self triggerDateFromTime:time];
  UNCalendarNotificationTrigger *trigger = [UNCalendarNotificationTrigger triggerWithDateMatchingComponents:triggerDate
                                                                                                    repeats:YES];
  
  NSString *identifier = @"BHMyNotification";
  UNNotificationRequest *request = [UNNotificationRequest requestWithIdentifier:identifier content:content trigger:trigger];
  
  [center addNotificationRequest:request withCompletionHandler:^(NSError * _Nullable error) {
    if (error) {
      NSLog(@"Vat is happening???");
    }
  }];
}

RCT_EXPORT_METHOD(cancelAlarm)
{
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  [center removeAllPendingNotificationRequests];
}

- (NSDateComponents *)triggerDateFromTime: (NSString *)time
{
  NSArray *hourMinute = [time componentsSeparatedByString:@":"];
  NSDateComponents *triggerDate = [[NSDateComponents alloc] init];
  triggerDate.calendar = [NSCalendar currentCalendar];
  triggerDate.timeZone = [NSTimeZone localTimeZone];
  triggerDate.hour = [hourMinute[0] intValue];
  triggerDate.minute = [hourMinute[1] intValue];
  return triggerDate;
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"DoReview"];
}

+ (void)doReviewWhenReady
{
  if (sharedInstance) {
    [sharedInstance doReview];
  }
  else {
    [NSTimer scheduledTimerWithTimeInterval:0.2
                                     target:self
                                   selector:@selector(doReviewWhenReady)
                                   userInfo:nil
                                    repeats:NO];
  }
}

- (void)doReview
{
  [self sendEventWithName:@"DoReview" body:@{}];
}

@end
