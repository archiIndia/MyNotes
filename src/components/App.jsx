
import {
  MantineProvider,
  AppShell,
  Group,
  Burger,
  Title,
  NavLink,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Sidebar from "./Sidebar.jsx";
import AllNotes from "./AllNotes.jsx";
import { Outlet } from "react-router-dom";

function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineProvider defaultColorScheme={"dark"}>
      <div>
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: 270,
            breakpoint: "sm",
            collapsed: { mobile: !opened },
          }}
          padding="md"
        >
          <AppShell.Header>
            <Group h="100%" px="md">
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
              <Title order={3} ml="xs">
                MyNotes<sup className={"text-sm"}> alpha-1.0</sup>
              </Title>
            </Group>
          </AppShell.Header>
          <AppShell.Navbar p="md">
            <Sidebar />
          </AppShell.Navbar>
          <AppShell.Main>
         <Outlet />
          </AppShell.Main>
        </AppShell>
      </div>
    </MantineProvider>
  );
}

export default App;
