import { useEffect, useState } from "react";
import { mockHttpClient as notificationsClient } from "./datastore/mockHttpClient";
import { Notification } from "./datastore/types";
import { Box, Button, Card, Flex, Popover, Stack, Text } from "@sanity/ui";
import { BellIcon, CloseIcon } from "@sanity/icons";

export function NotificationButton() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [popoverOpen, setPopoverOpen] = useState(false);
  useEffect(() => {
    notificationsClient.fetchNotifications().then((notifications) => {
      setNotifications(notifications);
    });
    notificationsClient.listenNotifications(() => {
      notificationsClient.fetchNotifications().then((notifications) => {
        setNotifications(notifications);
      });
    });
  }, []);

  function onShowPopover() {
    setPopoverOpen(!popoverOpen);
  }
  const notificationsCount = notifications?.length ?? 0;
  return (
    <Popover
      content={
        <Stack space={2}>
          {notifications.map((notification) => (
            <Card key={notification.id} padding={2}>
              <Flex align="center" gap={2}>
                <Box flex={1} paddingX={2}>
                  <Text>{notification.message} </Text>
                </Box>
                <Button
                  fontSize={1}
                  mode="bleed"
                  icon={CloseIcon}
                  onClick={() => notificationsClient.delete(notification.id)}
                />
              </Flex>
            </Card>
          ))}
        </Stack>
      }
      padding={1}
      placement="top"
      open={popoverOpen}
    >
      <Button
        mode="ghost"
        padding={3}
        onClick={onShowPopover}
        text={notificationsCount > 0 ? notificationsCount : ""}
        tone={notificationsCount > 0 ? "critical" : "default"}
        icon={BellIcon}
      />
    </Popover>
  );
}
