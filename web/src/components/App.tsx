import React from "react"
import {
  Box,
  Text,
  Container,
  MantineProvider,
  Title,
  SimpleGrid,
  Divider,
  // Divider,
} from "@mantine/core"
import { theme } from "../theme"
import styled from "styled-components"
import ScaleFade from "../transitions/ScaleFade"
import { useConfig } from "../providers/ConfigProvider"
import { fetchNui } from "../utils/fetchNui"
import ReactMarkdown from "react-markdown"

const App: React.FC = () => {
  const { config, visible, elements, message, npcName, npcTag, npcColor } =
    useConfig()
  const { primaryColor, secondaryColor } = config
  const MyButton = styled.div`
    background-color: white;
    color: black;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;
    &:hover {
      color: white;
      background-color: ${primaryColor};
    }
  `
  return (
    <ScaleFade visible={visible}>
      <MantineProvider withNormalizeCSS withGlobalStyles theme={{ ...theme }}>
        <Box className="h-screen w-screen">
          <Container
            className="w-full h-full flex flex-col justify-end items-center py-20"
            size="sm"
          >
            <Box className="w-full flex flex-col gap-6">
              <Box
                className="NPC-title flex flex-row gap-4 items-center"
                style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
              >
                <Title order={1} color="white" className="drop-shadow-md">
                  {npcName}
                </Title>
                {npcTag && (
                  <Box
                    className="Npc-tag px-2 py-1.5 w-max rounded-sm"
                    style={{
                      backgroundColor: npcColor || secondaryColor,
                      boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <Title order={6} color="white">
                      {npcTag}
                    </Title>
                  </Box>
                )}
              </Box>
              <Divider size="sm" className="w-1/3 rounded-lg m-0 p-0" />
              <Box className="descriptions">
                <Text
                  fz="lg"
                  fw="bold"
                  color="white"
                  className="drop-shadow-md"
                >
                  <ReactMarkdown>{message}</ReactMarkdown>
                </Text>
              </Box>
              {elements && (
                <SimpleGrid className="Options" cols={2}>
                  {elements.map((ele, index) => (
                    <MyButton
                      className="p-4 rounded-md"
                      onClick={() => fetchNui("click", index)}
                      key={index}
                    >
                      <Title order={5} fw="bold" style={{ textShadow: "none" }}>
                        {ele.label}
                      </Title>
                    </MyButton>
                  ))}
                </SimpleGrid>
              )}
            </Box>
          </Container>
        </Box>
      </MantineProvider>
    </ScaleFade>
  )
}

export default App
