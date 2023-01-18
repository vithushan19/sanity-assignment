import { NotificationButton } from "./NotificationButton";
import {
  Button,
  Card,
  Flex,
  Stack,
  studioTheme,
  ThemeProvider,
} from "@sanity/ui";
import { CreateNotificationTest } from "./CreateNotificationTest";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@sanity/icons";

function App() {
  const [showNavBar, setShowNavBar] = useState<boolean>(true);
  return (
    <ThemeProvider theme={studioTheme}>
      <Stack margin={4} space={6}>
        <Card padding={2} shadow={2} radius={2}>
          <Flex gap={1}>
            <Button
              icon={showNavBar ? ChevronLeftIcon : ChevronRightIcon}
              mode="bleed"
              text={showNavBar ? "Hide notifications" : "Show notifications"}
              onClick={() => setShowNavBar(!showNavBar)}
            />
            {showNavBar ? (
              <Flex flex={1} justify="flex-end">
                <NotificationButton />
              </Flex>
            ) : null}
          </Flex>
        </Card>

        <Card shadow={1} radius={2} padding={4}>
          <CreateNotificationTest />
        </Card>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
