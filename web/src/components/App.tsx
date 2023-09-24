import React, { useState } from "react"
import {
  Box,
  Text,
  Container,
  MantineProvider,
  Title,
  SimpleGrid,
  Divider,
  Paper,
} from "@mantine/core"
import { theme } from "../theme"
import ScaleFade from "../transitions/ScaleFade"
import { useConfig } from "../providers/ConfigProvider"
import { fetchNui } from "../utils/fetchNui"
import ReactMarkdown from "react-markdown"

const App: React.FC = () => {
  const { config, visible, elements, message, npcName, npcTag, npcColor } =
    useConfig()
  const { primaryColor, secondaryColor } = config

  const [isHovered, setIsHovered] = useState<null | number>(null)

  const handleMouseEnter = (index: number) => {
    setIsHovered(index)
  }

  const handleMouseLeave = () => {
    setIsHovered(null)
  }
  return (
    <ScaleFade visible={visible}>
      <MantineProvider withNormalizeCSS withGlobalStyles theme={{ ...theme }}>
        <Box className="h-screen w-screen">
          <Container
            className="w-full h-full flex flex-col justify-end items-center pb-20"
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
                  <Paper
                    className="Npc-tag w-max rounded-sm"
                    px={"xs"}
                    py={"0.4rem"}
                    shadow="sm"
                    bg={npcColor || secondaryColor}
                  >
                    <Title order={6} color="white">
                      {npcTag}
                    </Title>
                  </Paper>
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
                    <Paper
                      p={"md"}
                      radius={"sm"}
                      bg={isHovered === index ? primaryColor : "white"}
                      c={isHovered === index ? "white" : "black"}
                      style={{
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={() => handleMouseLeave()}
                      onClick={() => fetchNui("click", index)}
                      key={ele.label}
                    >
                      <Title order={5} fw="bold" style={{ textShadow: "none" }}>
                        {ele.label}
                      </Title>
                    </Paper>
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
