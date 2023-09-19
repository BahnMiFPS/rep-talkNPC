import { MantineThemeOverride } from "@mantine/core"

export const theme: MantineThemeOverride = {
  fontFamily: "Montserrat",
  shadows: { sm: "1px 1px 3px rgba(0, 0, 0, 0.5)" },
  components: {
    Title: {
      // assuming 'Title' is a valid component in your setup
      styles: {
        root: {
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)", // Adjust as necessary
        },
      },
    },
    Text: {
      // assuming 'Text' is a valid component in your setup
      styles: {
        root: {
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)", // Adjust as necessary
        },
      },
    },
  },
}
