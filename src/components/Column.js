import { Box, Flex, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { Droppable } from "react-beautiful-dnd"
import { Button } from "@chakra-ui/react"
import { Task } from "./Task"
import ModalAddTask from "./ModalAddTask"

export function Column({ column, id, tasks }) {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)

  return (
    <Flex // Флекс-контейнер каждой колонки
      spacing={2}
      width="250px"
      minHeight="600px"
      p={2}
      bg="#e5e5e5"
      borderRadius="md"
      flexDirection="column"
      alignItems="start"
      m={5}
    >
      <Text
        w={"100%"}
        borderRadius={"md"}
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        minHeight={"50px"}
        textAlign={"center"}
        color="white"
        bg={column.color}
        mb={2}
        fontWeight="bold" // Название каждой колонки
      >
        {column.title}, {column.taskIds.length}
      </Text>
      <Button
        onClick={() => {
          setIsAddTaskModalOpen(true)
        }}
        mb={2}
        bg={"#2A9D8F"}
        color={"#fff"}
      >
        Добавить задачу
      </Button>
      <Droppable droppableId={id}>
        {(provided, snapshot) => {
          return (
            <div // Посадочное место для draggable
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ height: "100%", width: "100%" }}
            >
              <VStack // вертикальная колонка для элементов
                width="100%"
                height="100%"
                transition="background-color 0.2s ease"
                spacing={0}
              >
                {column.taskIds.map((taskId, index) => {
                  const task = tasks.find((task) => {
                    return task?.id === taskId
                  })
                  return (
                    <Box
                      width={"100%"}
                      key={index}
                      // блок для каждой задачи
                    >
                      <Task column={column} task={task} index={index} />
                    </Box>
                  )
                })}
              </VStack>
              {isAddTaskModalOpen && (
                <ModalAddTask
                  setIsAddTaskModalOpen={setIsAddTaskModalOpen}
                  column={column}
                />
              )}

              {provided.placeholder}
            </div>
          )
        }}
      </Droppable>
    </Flex>
  )
}
