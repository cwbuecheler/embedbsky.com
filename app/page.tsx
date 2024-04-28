import { Button, MantineProvider } from "@mantine/core";
import theme from "@/theme";

export default function Home() {
  return (
    <MantineProvider theme={theme}>
    <Button color="skyfeedBlue">Hello Mantine!</Button>
  </MantineProvider>
  );
}
