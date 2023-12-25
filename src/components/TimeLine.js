import { AddIcon, ChatIcon, CheckIcon, DownloadIcon } from "@chakra-ui/icons";
import { Box, Card, CardBody, CardHeader, Divider, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";

const timelineData = [
  {
    logo: AddIcon,
    title: "$2400, Design changes",
    date: "22 DEC 7:20 PM",
    color: "brand.300",
  },
  {
    logo: ChatIcon,
    title: "New order #4219423",
    date: "21 DEC 11:21 PM",
    color: "blue.300",
  },
  {
    logo: DownloadIcon,
    title: "Server Payments for April",
    date: "21 DEC 9:28 PM",
    color: "orange.300",
  },
  {
    logo: CheckIcon,
    title: "New card added for order #3210145",
    date: "20 DEC 3:52 PM",
    color: "red.300",
  },
]
export default function OppositeContentTimeline() {
  const textColor = useColorModeValue("gray.700", "white.300")
  const bgIconColor = useColorModeValue("white.300", "gray.700")
  const bg = useColorModeValue("gray.50", "gray.700")
  return (
    <Card p="1rem" maxHeight="100%">
      <CardHeader pt="0px" p="28px 0px 35px 21px">
        <Flex direction="column">
          <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
            Orders overview
          </Text>
          <Text fontSize="sm" color="gray.400" fontWeight="normal">
            <Text fontWeight="bold" as="span" color="brand.300">
              +30%
            </Text>{" "}
            this month.
          </Text>
        </Flex>
      </CardHeader>
      <CardBody ps="26px" pe="0px" mb="31px" position="relative">
        <Flex direction="column">
          {timelineData.map((row, index, arr) => {
            return (
              <Box key={index}>
                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  mb="1rem"
                >
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    // w="2rem"
                    // h="2rem"
                    borderRadius="50%"
                    bg={bg}
                    color={bgIconColor}
                  >
                    <Icon as={row.logo} />
                  </Flex>
                  <Flex direction="column" flex="1">
                    <Text
                      fontSize="sm"
                      color={textColor}
                      fontWeight="bold"
                      // pb=".5rem"
                    >
                      {row.title}
                    </Text>
                    <Text fontSize="xs" color="gray.400" fontWeight="normal">
                      {row.date}
                    </Text>
                  </Flex>
                </Flex>
                {index !== arr.length - 1 && (
                  <Divider
                    borderColor="gray.200"
                    borderStyle="dashed"
                    borderWidth="1px"
                  />
                )}
                {/* </Box> */}

              </Box>
            )

          })}
        </Flex>
      </CardBody>
    </Card>
  );
}